const { param, validationResult } = require('express-validator')
const [falsy, nul1, undef] = [{values: 'falsy'}, {values: 'null'}, {values: 'undefined'}]
const handleValidationErrors = (req, _res, next) => {
	const validationErrors = validationResult(req)
	console.log(req.query)

	if (!validationErrors.isEmpty()) { 
		const errors = {};
		validationErrors
			.array()
			.forEach(error => errors[error.path] = error.msg)

		const err = Error("Invalid parameters");
		err.errors = errors;
		err.status = 400;
		err.title = "Bad request";
		next(err)
	}
	next()
}

module.exports = {
  checkGhost: [
		param('ghost')
			.exists(falsy).withMessage('ghost is required')
			.matches(/^[0123567]{1,}$/).withMessage('ghost must only contain these numbers: 0, 1, 2, 3, 5, 6, 7'),
		handleValidationErrors
	]
}