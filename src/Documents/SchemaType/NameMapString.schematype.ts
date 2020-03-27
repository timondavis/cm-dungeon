import * as mongoose from "mongoose";
import {NameMap} from "../..";

function NameMapString(key, options) {
	mongoose.SchemaType.call(this, key, options, 'NameMapString');
}

NameMapString.prototype = Object.create(mongoose.SchemaType.prototype);
NameMapString.prototype.cast = function(value: NameMap<string>) {
	return value.toParallelArrayObject();
};

export {NameMapString};
