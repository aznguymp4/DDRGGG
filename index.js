const express = require('express')
const { createCanvas, registerFont } = require('canvas')
const bqv = require('./utils/bodyQueryValidators')
const gc = require('./utils/ghostCompress')
const vars = require('./utils/vars')
const app = express()

registerFont('./fonts/ATTFShinGoProHeavy.ttf', { family: 'ShinGo', weight: 600 })

app.use(express.json());

// app.use((req, res, next) => {
// 	console.log(`\x1b[33m${req.rawHeaders[1]} - \x1b[36m${req.method} \x1b[90m${req.path}\x1b[0m`)
// 	next()
// })

app.post('/compress',
(req, res) => {
	const { ghost } = req.body
	res.json(gc.compress(ghost))
})
app.post('/decompress',
(req, res) => {
	const { text } = req.body
	res.json(gc.decompress(text))
})

app.get('/:gauge/x/:compressedGhost', (req, res, next) => {
	req.params.ghost = gc.decompress(req.params.compressedGhost)
	next()
}, renderGauge)
app.get('/:gauge/g/:ghost', renderGauge)

function renderGauge(req, res) {
	// Indicates if the URL is being accessed by a human in the browser or by Discord's proxy media embed bot
	// const botAccessing = Boolean(req.headers['user-agent']?.match(/discordbot/gi))
	// if(!botAccessing) return res.status(307).redirect(`https://replay.aznguy.com/${req.url.split('/')[3]}`)
	const ghost = req.params.ghost.split('').map(x=>+x)
	const canvases = []

	for (const gaugeKey of new Set(req.params.gauge.toLowerCase().split(',').filter(Boolean))) {
		if(canvases.length >= 5) continue;
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
				gaugeVal = Math.max(Math.min(10000, gaugeVal + delta),0)
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
			ctx.textAlign = "left"
			for(let i=1;i<gauge.xLines;i++) {
				const lineYpos = graphH*(i/gauge.xLines)
				ctx.fillStyle = "#00000030"
				ctx.fillRect(0,lineYpos-2,w,4)
				ctx.font = `${graphH*.035}px ShinGo`
				ctx.fillStyle = "#00000080"
				ctx.fillText(Math.round((1-(i/gauge.xLines))*100)+"%", graphH*.01, lineYpos-(graphH*.01))
			}
		
			// Gauge Name Text
			ctx.fillStyle = "#ffffffdd"
			ctx.strokeStyle = "#00000090"
			ctx.lineWidth = graphH*.031
			ctx.font = `${graphH*.17}px ShinGo`
			{
				const textDrawParams = [gauge.name, vars.imageConfig.minWidth*.035, graphH*(gauge.showRemainPercent? .85 : .90)]
				ctx.strokeText(...textDrawParams)
				ctx.fillText(...textDrawParams)
			}
			// Remaining % text
			if(gauge.showRemainPercent) {
				ctx.fillStyle = "#b8b8b8dd"
				ctx.strokeStyle = "#00000080"
				ctx.lineWidth = graphH*.017
				ctx.font = `${graphH*.07}px ShinGo`
				const textDrawParams = [`Remaining Gauge: ${(Math.max(0,gaugeVal)*.01).toFixed(2)}%`, vars.imageConfig.minWidth*.035, graphH*.96]
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

		canvases.push(cvs)
	}
	
	res.setHeader('Content-Type', 'image/png')
	if(canvases.length===1) return res.end(canvases[0].toBuffer('image/png'))

	const maxWidth = canvases.reduce((a,b) => Math.max(a, b.width), 0)
	const totalHeight = canvases.reduce((a,b) => a + b.height + (a && vars.imageConfig.combineGap), 0)
	// const totalWidth = canvases.reduce((a,b) => a + b.width, 0)
	// const maxHeight = canvases.reduce((a,b) => Math.max(a, b.height), 0)

	const cvs = createCanvas(maxWidth, totalHeight)
	const ctx = cvs.getContext('2d')
	let combineYOffset = 0
	canvases.map((canvas, idx) => {
		ctx.drawImage(canvas, 0, combineYOffset)
		combineYOffset += canvas.height + vars.imageConfig.combineGap
	})

	return res.end(cvs.toBuffer('image/png'))
}

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