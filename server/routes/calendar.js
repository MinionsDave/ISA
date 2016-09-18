const router = require('express').Router();

const Calendar = require('../models/calendar');

router.route('/:datetime')
    .get(({ params: { datetime }}, res, next) => {
        res.json(datetime);
    });

module.exports = router;