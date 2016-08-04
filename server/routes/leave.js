var express = require('express');
var router = express.Router();

var User = require('../models/user');
var Leave = require('../models/leave');

router.route('')
	.get(function (req, res, next) {
		Leave.find(function (err, leaves) {
			if (err) {
				return next(err);
			}
			res.json(leaves);
		});
	});

router.route('/:userId')
	.post(function (req, res, next) {
		User.findOne({
			_id: req.params.userId
		}, function (err, user) {
			if (err) {
				return next(err);
			}
			var leave = new Leave(req.body);
			user.leaves.push(leave);
			user.save();
			res.end();
		});
	});

module.exports = router;