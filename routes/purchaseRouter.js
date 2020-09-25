const express = require('express');
const bodyParser = require('body-parser');
const Purchase = require('../models/purchase');
const cors = require('./cors');

const purchaseRouter = express.Router();

purchaseRouter.use(bodyParser.json());

purchaseRouter
	.route('/')
	.options(cors.corsWithOptions, (req, res) => {
		res.sendStatus(200);
	})
	.get(cors.cors, (req, res, next) => {
		Purchase.find({})
			.then((purchases) => {
				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');
				res.json(purchases);
			})
			.catch((err) => next(err));
	})
	.post(cors.corsWithOptions, (req, res, next) => {
		Purchase.create(req.body)
			.then((purchase) => {
				console.log('New Purchase added ', purchase);
				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');
				res.json(purchase);
			})
			.catch((err) => next(err));
	})
	.put(cors.corsWithOptions, (req, res, next) => {
		res.statusCode = 403;
		res.end('Cannot PUT on /purchase');
	})
	.delete(cors.corsWithOptions, (req, res, next) => {
		res.statusCode = 403;
		res.end('Cannot DELETE on /purchase');
	});

purchaseRouter
	.route('/:id')
	.options(cors.corsWithOptions, (req, res) => {
		res.sendStatus(200);
	})
	.get(cors.cors, (req, res, next) => {
		Purchase.findById(req.params.id)
			.then((purchase) => {
				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');
				res.json(purchase);
			})
			.catch((err) => next(err));
	})
	.post(cors.corsWithOptions, (req, res, next) => {
		res.statusCode = 403;
		res.end('Cannot POST on /purchase/:id');
	})
	.put(cors.corsWithOptions, (req, res, next) => {
		Menu.findByIdAndUpdate(
			req.params.id,
			{
				$set: req.body
			},
			{ new: true }
		)
			.then((purchase) => {
				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');
				res.json(purchase);
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

module.exports = purchaseRouter;
