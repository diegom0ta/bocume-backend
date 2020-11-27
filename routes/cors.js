const express = require('express');
const cors = require('cors');
const app = express();

const whitelist = ['http://3.139.78.219:80', 'https://3.139.78.219:443'];

const corsOptionsDelegate = (req, callback) => {
	var corsOptions;

	if (whitelist.indexOf(req.header('Origin')) !== -1)
		corsOptions = { origin: true };
	else corsOptions = { origin: false };
	callback(null, corsOptions);
};

exports.cors = cors();
exports.corsWithOptions = cors(corsOptionsDelegate);
