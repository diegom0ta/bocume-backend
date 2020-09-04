const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const menuSchema = new Schema(
	{
		option1: {
			type: String,
			required: true
		},
		option2: {
			type: String,
			required: true
		},
		option3: {
			type: String,
			required: true
		}
	},
	{
		timestamps: true
	}
);

var Menu = mongoose.model('Menu', menuSchema);

module.exports = Menu;
