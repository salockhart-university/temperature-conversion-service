'use strict';

const express = require('express');				// https://expressjs.com/en/starter/hello-world.html
const bodyParser = require('body-parser');
const app = express();							// https://expressjs.com/en/starter/hello-world.html

const celsius = 'celsius';
const fahrenheit = 'fahrenheit';

function getCelsius(fahrenheit) {
	return (fahrenheit - 32) / 1.8;
}

function getFahrenheit(celsius) {
	return celsius * 1.8 + 32
}

app.use(bodyParser.json());

app.use(express.static('public'));				// https://expressjs.com/en/starter/static-files.html

app.post('/convert', function (req, res) {
	if (!req.body.type || (req.body.type !== celsius && req.body.type !== fahrenheit)) {
		return res.status(400).send(`Bad Request type is required as ${celsius} or ${fahrenheit}`);
	}

	if (isNaN(req.body.degrees)) {
		return res.status(400).send('Bad Request degrees is required as number');
	}

	switch (req.body.type) {
		case celsius:
			return res.status(200).send({
				type: fahrenheit,
				degrees: getFahrenheit(req.body.degrees)
			});
		case fahrenheit:
			return res.status(200).send({
				type: celsius,
				degrees: getCelsius(req.body.degrees)
			})
	}
});

app.listen(3000, function () {					// https://expressjs.com/en/starter/hello-world.html
	console.log('Listening on port 3000!')
});