const express = require('express');
const router = express.Router();
const Leave = require('../models/leave');

router.route('')
	.get((req, res, next) => {
		Leave.find((err, leaves) => {
			if (err) {
				return next(err);
			}
			res.json(leaves);
		});
	})

	.post(({ body }, res, next) => {
		let leave = new Leave(body);
		leave.save((err, leave) => {
			if (err) {
				return next(err);
			}
			res.json(leave);
		});
	});

module.exports = router;