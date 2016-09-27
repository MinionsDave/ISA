const router = require('express').Router();
const Promise = require('bluebird');

const Event = require('../models/event');
const Calendar = require('../models/calendar');

router.route('')
    .post(({ body }, res, next) => {
        const event = new Event(body);
        event.save()
            .then(savedEvent => {
                let promises = [];
                for (date of body.dates) {
                    promises.push(Calendar.update({date}, {
                        $push: savedEvent._doc
                    }));
                }
                return Promise.all(promises);
            })
            .then(() => res.end())
            .catch(next);
    })

    .get((req, res, next) => {
        Event.find()
        .then(events => res.json(events))
        .catch(next);
    });

module.exports = router;