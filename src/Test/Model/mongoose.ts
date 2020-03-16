import 'mocha';
import {expect} from 'chai';
var mongoose = require('mongoose');

describe ('List', () => {

	let db = null;

	before(async () => {
		mongoose.connect('mongodb://127.0.0.1:27017/mazetest', {
			useNewUrlParser: true,
			useUnifiedTopology: true
		});
		db.on('error', (err) => {
			console.error.bind(console, 'connection error:');
			console.log(err);
			return null;
		});
		db.once('open', () => {
			console.log('DB Connection Successful!');
		});
	});

	it('facilitates the storage of Entity collections', () => {
		mongoose.db.dropCollection('entitytest', () => {

		})
	});
});
