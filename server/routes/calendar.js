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
        .limit(35)
        .sort({
            date: 1
        })
        .then(dates => {
            dates.map(x => {
                x._doc.date = moment(x._doc.date).format('YYYY-MM-DD HH:mm:ss');
            });
            res.json(dates);
        });
    });

module.exports = router;