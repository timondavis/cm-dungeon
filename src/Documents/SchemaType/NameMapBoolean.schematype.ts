import * as mongoose from "mongoose";
import {NameMap} from "../..";

function NameMapBoolean(key, options) {
	mongoose.SchemaType.call(this, key, options, 'NameMapBoolean');
}

NameMapBoolean.prototype = Object.create(mongoose.SchemaType.prototype);
NameMapBoolean.prototype.cast = function(value: NameMap<boolean>) {
	return value.toParallelArrayObject();
};


export { NameMapBoolean };

