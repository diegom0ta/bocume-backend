const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

const commentSchema = new Schema(
	{
		rating: {
			type: Number,
			min: 1,
			max: 5,
			required: true
		},
		comment: {
			type: String,
			required: true
		},
		author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		}
	},
	{
		timestamps: true
	}
);
const marmitariaSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true
		},
		address: {
			type: String,
			required: true
		},
		price: {
			type: Currency,
			required: true,
			min: 0
		},
		favorite: {
			type: Boolean,
			default: false
		},
		menu: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Menu'
		},
		comments: [commentSchema]
	},
	{
		timestamps: true
	}
);

var Marmitaria = mongoose.model('Marmitaria', marmitariaSchema);

module.exports = Marmitaria;
