var express = require('express');
var router = express.Router();
var formidable = require('formidable');

router.post('/upload', function (req, res, next) {
	var form = new formidable.IncomingForm();
	form.uploadDir = 'public/uploads';
	form.encoding = 'utf-8';
	form.maxFieldsSize = 20 * 1024 * 1024;

	// 保留后缀
	form.keepExtensions = true;
	form.parse(req, function (err, fields, files) {
		if (err) {
			return next(err);
		}

		// 返回文件路径
		res.end(files.file.path);
	});
});

module.exports = router;
