const express = require('express')
const { createCanvas, registerFont } = require('canvas')
const bqv = require('./utils/bodyQueryValidators')
const gc = require('./utils/ghostCompress')
const vars = require('./utils/vars')
const app = express()

registerFont('./fonts/ATTFShinGoProHeavy.ttf', { family: 'ShinGo', weight: 600 })

app.use(express.json());

app.use((req, res, next) => {
	console.log(`\x1b[33m${req.rawHeaders[1]} - \x1b[36m${req.method} \x1b[90m${req.path}\x1b[0m`)
	next()
})

app.get('/compress/:ghost',
// bqv.checkGhost,
(req, res) => {
	const { ghost } = req.params
	res.json(gc.compress(ghost))
})
app.get('/decompress/:ghost',
// bqv.checkGhost,
(req, res) => {
	const { ghost } = req.params
	res.json(gc.decompress(ghost))
})

app.get('/:gauge',
bqv.checkGhost,
(req, res) => {
	const ghost = (req.query.g || gc.decompress(req.query.x)).split('').map(x=>+x)
	const gaugeKey = req.params.gauge.toLowerCase()
	const gauge = vars.gauges[gaugeKey]
	const colors = Object.values(vars.judgeColors)
	
	const [w,h] = [Math.max(vars.imageConfig.minWidth, ghost.length),vars.imageConfig.height]
	const barH = vars.imageConfig.judgementBarHeight
	const graphH = h-barH
	const mult = w/ghost.length;
	const cvs = createCanvas(w,gauge?h:barH)
	const ctx = cvs.getContext('2d')

	if(gauge) {
		// GAUGE GRAPH
		ctx.fillStyle = vars.judgeColors.background
		ctx.fillRect(0,0,w,h)
	
		for(let i=1;i<gauge.xLines;i++) {
			const lineYpos = graphH*(i/gauge.xLines)
			ctx.fillStyle = "#0b0c0d90"
			ctx.fillRect(0,lineYpos-2,w,4)
		}
	
		// Graph Line
		let gaugeVal = gauge.initVal
		ctx.moveTo(-10,graphH-(graphH*(gaugeVal/10000)))
		ghost.forEach((j,idx) => {
			const delta = gauge.gain[j]
			const [x,y] = [~~(idx*mult), graphH-(graphH*(gaugeVal/10000))]
			ctx.lineTo(x,y)
			if(idx+1==ghost.length) ctx.lineTo(x+(mult*1.25),y)
			if(!delta) return;
			gaugeVal = Math.min(10000, gaugeVal + delta)
		})
		ctx.lineTo(w+w,h+h)
		ctx.lineTo(-w,h+h)
		ctx.lineTo(-w,0)
		ctx.strokeStyle = "#ffffff80"
		ctx.lineWidth = 8
		const grad = ctx.createLinearGradient(0,0,gauge.gradientAngled?w:0,graphH)
		gauge.bgGradient.forEach(stop => {
			grad.addColorStop(stop[0], '#'+stop[1])
		})
		ctx.fillStyle = grad
		ctx.fill()
		ctx.stroke()
	
		// Graph X lines (again, but with percentages this time)
		for(let i=1;i<gauge.xLines;i++) {
			const lineYpos = graphH*(i/gauge.xLines)
			ctx.fillStyle = "#00000030"
			ctx.fillRect(0,lineYpos-2,w,4)
			ctx.font = `${graphH*.035}px ShinGo`
			ctx.fillStyle = "#00000080"
			if(lineYpos < graphH*.85) ctx.fillText(Math.round((1-(i/gauge.xLines))*100)+"%", graphH*.008, lineYpos-(graphH*.01))
		}
	
		// Gauge Name Text
		ctx.strokeStyle = "#00000080"
		ctx.fillStyle = "#ffffffaa"
		ctx.lineWidth = h*.018
		ctx.textAlign = "left"
		ctx.font = `${graphH*.1}px ShinGo`
		{
			const textDrawParams = [gauge.name, vars.imageConfig.minWidth*.02, graphH*.9422]
			ctx.strokeText(...textDrawParams)
			ctx.fillText(...textDrawParams)
		}
	}

	// JUDGEMENT BAR
	ghost.forEach((j,idx) => {
		ctx.fillStyle = colors[j]
		ctx.fillRect(
			~~(idx*mult),
			gauge?graphH:0,
			Math.ceil(mult),
			barH
		)
	})

	res.setHeader('Content-Type', 'image/png')
	res.end(cvs.toBuffer('image/png'))
})

// Error formatter
app.use((err, _req, res, _next) => {
	res.status(err.status || 500);
	console.error(err);
	res.json({
		title: err.title || (err.status >= 400 && err.status <= 499? 'Bad Request' : 'Server Error'),
		message: err.message,
		errors: err.errors,
		// stack: isProduction ? null : err.stack
	});
});

const port = 5001
app.listen(port, () => console.log('Server is listening on port', port))