import * as mongoose from "mongoose";
import {NameMap} from "../..";

function NameMapNumber(key, options) {
	mongoose.SchemaType.call(this, key, options, 'NameMapNumber');
}

NameMapNumber.prototype = Object.create(mongoose.SchemaType.prototype);
NameMapNumber.prototype.cast = function(value: NameMap<number>) {
	return value.toParallelArrayObject();
};

export {NameMapNumber};
