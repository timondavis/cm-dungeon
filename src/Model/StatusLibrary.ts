import {Status} from "./Status";
import {NameMap} from "./NameMap";

export class StatusLibrary {

    private _collection : NameMap<Status>;
    private static _instance : StatusLibrary;

    private constructor() {}

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
    public get( key : string ) : Status {
        return this._collection.get( key ).clone();
    }

    /**
     * Set the named status in the library.  Existing items will be overwritten.  Always stores as a clone.
     * @param {string} key
     * @param {Status} status
     */
    public set( key : string, status : Status ) : void {
        this._collection.set( key, status.clone() );
    }

    /**
     * Is there a status associated with the given key?
     *
     * @param {string} key
     * @returns {boolean}
     */
    public has( key : string ) : boolean {
        return this._collection.has( key );
    }
}