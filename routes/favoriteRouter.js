const express = require('express');
const bodyParser = require('body-parser');
const Favorite = require('../models/favorites');
const cors = require('./cors');

const favoriteRouter = express.Router();

favoriteRouter.use(bodyParser.json());

favoriteRouter
	.route('/')
	.options(cors.corsWithOptions, (req, res) => {
		res.sendStatus(200);
	})
	.get(cors.cors, (req, res, next) => {
		res.statusCode = 403;
		res.end('Cannot GET on /favorites');
	})
	.post(cors.corsWithOptions, (req, res, next) => {
		Favorite.create(req.body)
			.then((favorite) => {
				console.log('New Menu added ', menu);
				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');
				res.json(favorite);
			})
			.catch((err) => next(err));
	})
	.put(cors.corsWithOptions, (req, res, next) => {
		res.statusCode = 403;
		res.end('Cannot PUT on /favorites');
	})
	.delete(cors.corsWithOptions, (req, res, next) => {
		res.statusCode = 403;
		res.end('Cannot DELETE on /favorites');
	});

favoriteRouter
	.route('/:id')
	.options(cors.corsWithOptions, (req, res) => {
		res.sendStatus(200);
	})
	.get(cors.cors, (req, res, next) => {
		Favorite.findById(req.params.id)
			.then((favorite) => {
				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');
				res.json(favorite);
			})
			.catch((err) => next(err));
	})
	.post(cors.corsWithOptions, (req, res, next) => {
		res.statusCode = 403;
		res.end('Cannot POST on /favorites/:id');
	})
	.put(cors.corsWithOptions, (req, res, next) => {
		res.statusCode = 403;
		res.end('Cannot PUT on /favorites/:id');
	})
	.delete(cors.corsWithOptions, (req, res, next) => {
		Favorite.findByIdAndRemove(req.params.id)
			.then((resp) => {
				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');
				res.json(resp);
			})
			.catch((err) => next(err));
	});

module.exports = favoriteRouter;
