const express = require('express');
const router = express.Router();
const passport = require('passport');
const crypto = require('crypto');

const User = require('../models/user.js');
const mailer = require('../utils/mailer');
const config = require('../config');
const authRequired = require('../utils/auth-required');
const join = require('bluebird').join;

router.post('/login', passport.authenticate('local'),  ({ body }, res, next) => {
    User.findOne({
        username: body.username 
    })
    .then(function (user) {
        res.json(user);
    });
});

router.route('/account')
    .post(({ body }, res, next) => {
        let username = body.username || '',
            password = body.password || '';

        if (username.length === 0 || password.length === 0) {
            return res.status(400).end('用户名或密码不合法');
        }

        delete body.password;

        User.registerAsync(new User(body), password)
        .then(user => join(user, crypto.randomBytesAsync(20)))
        .then(([user, buf]) => {
            user.activeToken = user._id + buf.toString("hex");
            user.activeExpires = Date.now() + 24 * 3600 * 1000;
            let link = config.URL + "/#/account/login/" + user.activeToken;
            mailer({
                to: body.username,
                subject: "欢迎注册依萨卡后勤端",
                html: "请点击 <a href=\"" + link + "\" target=\"_blank\">此处</a>激活"
            });
            return user.save();
        })
        .then(user => res.json({ message: `已发送邮件至${user.username}请在24小时内按照邮件提示激活` }))
        .catch(err => next(err));
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

// 激活用户
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

        // 删除已经没用的token和过期时间字段
        user.activeToken = null;
        user.activeExpires = null;

        user.save(function (err, user) {
            if (err) {
                return next(err);
            }
            res.end('激活成功');
        });
    });
});

// 查看用户是否存在
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

// 再次发送邮件
router.get('/account/sendAgain/:username', function (req, res, next) {
    var username = req.params.username;
    User.findOne({
        username: req.params.username
    }, function (err, user) {
        if (err) {
            return next(err);
        }
        var link = config.URL + '/#/account/login/' + user.activeToken;
        mailer({
            to: username,
            subject: '欢迎注册依萨卡后勤端',
            html: '请点击 <a href="' + link + '" target="_blank">此处</a>激活'
        });
        res.end();
    });
});

// 忘记密码
router.get('/account/forget/:username', function (req, res, next) {
    var username = req.params.username;
    User.findOne({
        username: username
    }, function (err, user) {
        if (err) {
            return next(err);
        }
        crypto.randomBytes(20, function (err, buf) {
            user.activeToken =  user._id + buf.toString('hex');
            user.activeExpires = Date.now() + 3600 * 1000;
            var link = config.URL + '/#/account/resetPswd/' + user.activeToken + '/' + username;
            mailer({
                to: user.username,
                subject: '依萨卡后勤端用户重置密码',
                html: '请点击 <a href="' + link + '" target="_blank">此处</a>重置密码'
            });

            user.save(function (err, user) {
                if (err) {
                    return next(err);
                }

                res.end();
            });
        });
    });
});

// 重置密码
router.post('/account/resetPswd', function (req, res, next) {
    User.findOne({
        username: req.body.username,
        activeExpires: {$gt: Date.now()}
    }, function (err, user) {
        if (err) {
            return next(err);
        }
        if (!user || req.body.activeToken !== user.activeToken) {
            return res.status(400).end('激活信息有误');
        }
        user.setPassword(req.body.password, function (err, user) {
            if (err) {
                return next(err);
            }
            user.activeToken = null;
            user.activeExpires = null;
            user.save(function (err, user) {
                if (err) {
                    return next(err);
                }
                res.end();
            });
        });
    });
});

// 更新用户信息
router.post('/account/update', authRequired, function (req, res, next) {
    User.findByIdAndUpdate(req.user._id, req.body, function (err, user) {
        if (err) {
            return next(err);
        }
        res.json(user);
    });
});

module.exports = router;