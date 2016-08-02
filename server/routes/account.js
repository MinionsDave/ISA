var express = require('express');
var router = express.Router();
var passport = require('passport');

var User = require('../models/user.js');

router.post('/login', passport.authenticate('local'), function (req, res, next) {
    User.findOne({
        username: req.body.username
    })
    .then(function (user) {
        res.json(user);
    });
});

router.route('/account')
    .post(function (req, res, next) {
        var username = req.body.username || '',
            password = req.body.password || '';

        if (username.length === 0 || password.length === 0) {
            return res.status(400).end('用户名或密码不合法');
        }

        User.count({
            username: username
        })
        .then(function (count) {
            if (count > 0) {
                return res.status(400).end('用户已存在');
            } else {
                User.register(new User({
                    username: username
                }), password, function (err) {
                    if (err) {
                        return next(err);
                    }
                    res.json({
                        message: '注册成功'
                    });
                });
            }
        }, function (err) {
            next(err);
        });
    })

    .get(function (req, res, next) {
        console.info(req.user);
        User.find()
        .then(function (users) {
            res.json(users);
        }, function (err) {
            if (err) {
                next(err);
            }
        });
    });

router.route('/account/:id')
    .get(function (req, res, next) {
        User.findOne({
            _id: req.params.id
        })
        .then(function (user) {
            res.json(user);
        }, function (err) {
            next(err);
        });
    })

    .put(function (req, res, next) {
        User.update({
            _id: req.params.id
        }, req.body)
        .then(function (resp) {
            res.json({
                message: '更新成功'
            });
        });
    })

    .delete(function (req, res, next) {
        User.remove({
            _id: req.params.id
        })
        .then(function () {
            res.json({
                message: '删除成功'
            });
        }, function (err) {
            next(err);
        });
    });


module.exports = router;