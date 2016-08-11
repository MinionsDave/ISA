var express = require('express');
var router = express.Router();
var passport = require('passport');
var crypto = require('crypto');

var User = require('../models/user.js');
var mailer = require('../utils/mailer');
var config = require('../config');
var authRequired = require('../utils/auth-required');

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

        User.register(new User(req.body), password, function (err, user) {
            if (err) {
                return next(err);
            }
            crypto.randomBytes(20, function (err, buf) {
                user.activeToken = user._id + buf.toString('hex');
                user.activeExpires = Date.now() + 24 * 3600 * 1000;
                var link = config.URL + '/account/active/' + user.activeToken;
                mailer({
                    to: req.body.email,
                    subject: '欢迎注册依萨卡后勤端',
                    html: '请点击 <a link="' + link + '" target="_blank">此处</a>激活'
                });

                user.save(function (err, user) {
                    if (err) {
                        next(err);
                    }

                    res.json({
                        message: '已发送邮件至' + user.email + '请在24小时内按照邮件提示激活'
                    });
                })
            });
        });
    })

    // .get(authRequired, function (req, res, next) {
    .get(function (req, res, next) {
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

router.get('/account/active/:activeToken', function (req, res, next) {
    User.findOne({
        activeToken: req.params.activeToken,
        activeExpires: {$gt: Date.now()}
    }, function (err, user) {
        if (err) {
            return next(err);
        }

        if (!user) {
            return res.status(400).end('您的激活链接无效，请重新注册!');
        }

        user.active = true;
        user.save(function (err, user) {
            if (err) {
                return next(err);
            }
            res.end('激活成功');
        });
    });
});

router.get('/account/checkUser/:username', function (req, res, next) {
    User.count({
        username: req.params.username
    }, function (err, count) {
        if (err) {
            return next(err);
        }
        if (count > 0) {
            return res.status(400).end('用户已存在');
        }
        res.end();
    });
});

module.exports = router;