import {Status} from "./Status";
import {NameMap} from "./NameMap";
import {ISerializableModel} from "cm-domain-utilities/lib/Serializable.model";
import {SerializableModel} from "cm-domain-utilities";

export interface IStatusLibrary extends ISerializableModel {
	collection: NameMap<Status>
}

export class StatusLibrary extends SerializableModel {

	protected state: IStatusLibrary;
    private static _instance : StatusLibrary;

    private constructor() {
    	super();
    	this.state = {
			collection: undefined
		};
	}

    /**
     * Get the StatusLibrary instance.
     *
     * @returns {StatusLibrary}
     */
    public static getInstance() : StatusLibrary {

        if ( StatusLibrary._instance === undefined ) {
            StatusLibrary._instance = new StatusLibrary();
        }

        return this._instance;
    }

    /**
     * Get the named status from the library.  Always returns a clone.
     *
     * @param {string} key
     * @returns {Status}
     */
    public get( key: string ) : Status {
        return this.state.collection.get( key ).clone();
    }

    /**
     * Set the named status in the library.  Existing items will be overwritten.  Always stores as a clone.
     * @param {string} key
     * @param {Status} status
     */
    public set( key: string, status : Status ) : void {
        this.state.collection.set( key, status.clone() );
    }

    /**
     * Is there a status associated with the given key?
     *
     * @param {string} key
     * @returns {boolean}
     */
    public has( key: string ) : boolean {
        return this.state.collection.has( key );
    }
}