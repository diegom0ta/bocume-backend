var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var purchaseSchema = new Schema({
	marmitaria: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Marmitaria'
	}
});

var User = new Schema({
	firstname: {
		type: String,
		default: ''
	},
	lastname: {
		type: String,
		default: ''
	},
	purchase: [purchaseSchema]
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);
