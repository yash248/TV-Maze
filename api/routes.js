var superagent = require('superagent');

module.exports = function (app) {
	app.get('/api/:q', function (req, res) {

		console.log(req.params.q);
		superagent
			.get('http://api.tvmaze.com/search/shows?q=' + req.params.q)
			.query({ json: true})
			.end(function (err, response) {
				if (err) {
					return res.send(err);
				}

				res.json(response);
			});

	});
	
}