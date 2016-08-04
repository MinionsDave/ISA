module.exports = function (req, res, next) {
	if (req.user && req.user.active) {
		next();
	} else {
		res.status(401).end('用户未登录');
	}
}