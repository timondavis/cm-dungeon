import * as mongoose from 'mongoose';
import {NameMapBoolean} from "../SchemaType/NameMapBoolean.schematype";
import {NameMapString} from "../SchemaType/NameMapString.schematype";
import {NameMapNumber} from "../SchemaType/NameMapNumber.schemaType";

let Types = mongoose.Schema.Types;

// Assign custom data types for schemas
if (!Types.hasOwnProperty('NameMapBoolean')) { (<any>mongoose.Schema.Types).NameMapBoolean = NameMapBoolean; }
if (!Types.hasOwnProperty('NameMapString')) { (<any>mongoose.Schema.Types).NameMapString = NameMapString; }
if (!Types.hasOwnProperty('NameMapNumber')) { (<any>mongoose.Schema.Types).NameMapNumber = NameMapNumber; }

export const EntitySchema = new mongoose.Schema({
	_id : String,
	entityType: String,
	attributes: {
		type: NameMapNumber,
		of: Number
	},
	labels: {
		type: NameMapString,
		of: String
	},
	flags: {
		type: NameMapBoolean,
		of: Boolean
	}
});