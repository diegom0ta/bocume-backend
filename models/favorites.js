const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favoriteMarmitariaSchema = new Schema({
	marmitaria: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Marmitaria'
	}
});

const favoriteSchema = new Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		},
		favoriteMaritarias: [favoriteMarmitariaSchema]
	},
	{
		timestamps: true
	}
);

var Favorites = mongoose.model('Favorites', favoriteSchema);

module.exports = Favorites;
