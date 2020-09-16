const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Marmitaria = require('../models/marmitaria');
const authenticate = require('../authenticate');
const cors = require('./cors');

const marmitariaRouter = express.Router();

marmitariaRouter.use(bodyParser.json());

marmitariaRouter
	.route('/')
	.options(cors.corsWithOptions, (req, res) => {
		res.sendStatus(200);
	})
	.get(cors.cors, (req, res, next) => {
		Marmitaria.find({})
			.then((marmitarias) => {
				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');
				res.json(marmitarias);
			})
			.catch((err) => next(err));
	})
	.post(cors.corsWithOptions, (req, res, next) => {
		Marmitaria.create(req.body)
			.then((marmitaria) => {
				console.log('New Marmitaria added ', marmitaria);
				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');
				res.json(marmitaria);
			})
			.catch((err) => next(err));
	})
	.put(cors.corsWithOptions, (req, res, next) => {
		res.statusCode = 403;
		res.end('Cannot PUT on /marmitaria');
	})
	.delete(cors.corsWithOptions, (req, res, next) => {
		res.statusCode = 403;
		res.end('Cannot DELETE on /marmitaria');
	});

marmitariaRouter
	.route('/:id')
	.options(cors.corsWithOptions, (req, res) => {
		res.sendStatus(200);
	})
	.get(cors.cors, (req, res, next) => {
		Marmitaria.findById(req.params.id)
			.then((marmitaria) => {
				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');
				res.json(marmitaria);
			})
			.catch((err) => next(err));
	})
	.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
		res.statusCode = 403;
		res.end('Cannot POST on /marmitaria/:id');
	})
	.put(cors.corsWithOptions, (req, res, next) => {
		Marmitaria.findByIdAndUpdate(
			req.params.id,
			{
				$set: req.body
			},
			{ new: true }
		)
			.then((marmitaria) => {
				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');
				res.json(marmitaria);
			})
			.catch((err) => next(err));
	})
	.delete(cors.corsWithOptions, (req, res, next) => {
		Marmitaria.findByIdAndRemove(req.params.id)
			.then((resp) => {
				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');
				res.json(resp);
			})
			.catch((err) => next(err));
	});

module.exports = marmitariaRouter;
