const router = require('express').Router();

const Event = require('../models/event');

router.route('')
    .post(({ body }, res, next) => {
        Event.create(body)
        .then(() => res.end())
        .catch(next);
    })

    .get((req, res, next) => {
        Event.find()
        .then(events => res.json(events))
        .catch(next);
    });

module.exports = router;