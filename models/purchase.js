const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

const purchaseSchema = new Schema(
	{
		marmitaria: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Marmitaria'
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		},
		menu: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Menu'
		},
		price: {
			type: Currency,
			required: true,
			min: 0
		}
	},
	{
		timestamps: true
	}
);

var Purchase = mongoose.model('Purchase', purchaseSchema);

module.exports = Purchase;
