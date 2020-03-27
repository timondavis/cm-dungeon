import 'mocha';
import {expect} from 'chai';
import {Entity} from "../../Model/Entity/Entity";
import {EntitySchema} from "../../Documents/Schema/Entity.schema";
var mongoose = require('mongoose');

describe ('List', () => {

	let db = null;
	let testRange = 1000;

	before((done) => {
		mongoose.connect('mongodb://127.0.0.1:27017/mazetest', {
			useNewUrlParser: true,
			useUnifiedTopology: true
		});

		db = mongoose.connection;

		db.on('error', (err) => {
			done(err);
		});
		db.once('open', () => {
			let EntityModelDB = db.model('Entity', EntitySchema);
			EntityModelDB.deleteMany({}, () => done());
		});
	});

	beforeEach(async () => {
	});

	it('facilitates the storage and loading of Entity collection items', async () => {
		let item = new Entity();
		let attr1 = Math.ceil(Math.random() * testRange);
		let flag1 = (Math.random() > 0.5);
		let label1 = Math.ceil( Math.random() * testRange).toString();
		item.attributes.add('attr1', attr1);
		item.flags.add('flag1', flag1);
		item.labels.add('label1', label1);

		let EntityModelDB = db.model('Entity', EntitySchema);
		let entityModel = new EntityModelDB(item.toState());

		expect(entityModel).to.exist;
		await entityModel.save({});


	});
});
