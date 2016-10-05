const router = require('express').Router();
const moment = require('moment');

const Calendar = require('../models/calendar');

router.route('/:datetime')
    .get(({ params: { datetime }}, res, next) => {
        let firstDayOfMonth = moment(parseInt(datetime)).startOf('month').startOf('week').valueOf();
        Calendar.find({
            date: {
                $gte: firstDayOfMonth
            }
        })
        .limit(42)
        .sort({
            date: 1
        })
        .populate('events')
        .exec()
        .then(dates => res.json(dates))
        .error(next);
    });

module.exports = router;