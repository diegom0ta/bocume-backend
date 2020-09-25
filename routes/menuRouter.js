const express = require('express');
const bodyParser = require('body-parser');
const Menu = require('../models/menu');
const cors = require('./cors');

const menuRouter = express.Router();

menuRouter.use(bodyParser.json());

menuRouter
	.route('/')
	.options(cors.corsWithOptions, (req, res) => {
		res.sendStatus(200);
	})
	.get(cors.cors, (req, res, next) => {
		Menu.find({})
			.then((menus) => {
				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');
				res.json(menus);
			})
			.catch((err) => next(err));
	})
	.post(cors.corsWithOptions, (req, res, next) => {
		Menu.create(req.body)
			.then((menu) => {
				console.log('New Menu added ', menu);
				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');
				res.json(menu);
			})
			.catch((err) => next(err));
	})
	.put(cors.corsWithOptions, (req, res, next) => {
		res.statusCode = 403;
		res.end('Cannot PUT on /menu');
	})
	.delete(cors.corsWithOptions, (req, res, next) => {
		res.statusCode = 403;
		res.end('Cannot DELETE on /menu');
	});

menuRouter
	.route('/:id')
	.options(cors.corsWithOptions, (req, res) => {
		res.sendStatus(200);
	})
	.get(cors.cors, (req, res, next) => {
		Menu.findById(req.params.id)
			.then((menu) => {
				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');
				res.json(menu);
			})
			.catch((err) => next(err));
	})
	.post(cors.corsWithOptions, (req, res, next) => {
		res.statusCode = 403;
		res.end('Cannot POST on /menu/:id');
	})
	.put(cors.corsWithOptions, (req, res, next) => {
		Menu.findByIdAndUpdate(
			req.params.id,
			{
				$set: req.body
			},
			{ new: true }
		)
			.then((menu) => {
				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');
				res.json(menu);
			})
			.catch((err) => next(err));
	})
	.delete(cors.corsWithOptions, (req, res, next) => {
		Menu.findByIdAndRemove(req.params.id)
			.then((resp) => {
				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');
				res.json(resp);
			})
			.catch((err) => next(err));
	});

module.exports = menuRouter;
