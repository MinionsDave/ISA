var express = require('express');
var router = express.Router();

var Leave = require('../models/leave');

router.route('')
	.get(function (req, res, next) {
		Leave.find(function (err, leaves) {
			if (err) {
				return next(err);
			}
			res.json(leaves);
		});
	})

	.post(function (req, res, next) {
		var leave = new Leave(req.body);
		leave.save(function (err, leave) {
			if (err) {
				return next(err);
			}
			res.json(leave);
		});
	});

module.exports = router;