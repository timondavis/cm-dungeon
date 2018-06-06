export class NameMap<T> {

    protected _collection : { [key:string] : T };

    constructor() {
        this._collection = {};
    }

    /**
     * Add an item to the collection with the given key.
     *
     * @param {string} key
     * @param {T} value
     * @returns {NameMap<T>}
     */
    public add( key : string, value : T ) : NameMap<T> {

        key = key.trim();

        if ( this.has( key ) ) {
            throw Error( "Item with name " + key + " already exists." );
        }

        this._collection[key] = value;
        return this;
    }

    /**
     * Add or replace an item in the collection with a given key.
     *
     * @param {string} key
     * @param {T} value
     * @returns {NameMap<T>}
     */
    public set( key : string, value : T ) : NameMap<T> {

        key = key.trim();

        this._collection[key] = value;
        return this;
    }

    /**
     * Replace an existing item in the collection with a given key.
     *
     * @param {string} key
     * @param {T} value
     * @returns {NameMap<T>}
     */
    public replace( key : string, value : T ) : NameMap<T> {

        key = key.trim();

        if ( ! this.has( key )) {
            throw Error( "Cannot replace " + key + " item.  It does not exist on the NameMap" );
        }

        this._collection[key] = value;
        return this;
    }

    /**
     * Get a single item in the collection, referenced with the given key.
     *
     * @param {string} key?
     * @returns {T}
     */
    public get( key : string ) : T {

        key = key.trim();

        if ( this.has( key )) {

            return this._collection[key];
        }

        throw new Error( 'Cannot find item with key ' + key );
    }

    /**
     * Get all items in the collection
     *
     * @returns {{[p: string]: T}}
     */
    public getAll() : { [key:string] : T } {
        return this._collection;
    }

    /**
     * Request information on whether or not an item with a given key exists
     *
     * @param {string} key
     * @returns {boolean}
     */
    public has( key : string ) : boolean {

        key = key.trim();

        if ( this._collection.hasOwnProperty(key) ) {
            return true;
        }

        return false;
    }

    /**
     * Remove the item with the given key from the collection.
     *
     * @param {string} key
     * @returns {NameMap<T>}
     */
    public remove( key: string ) : NameMap<T> {

        key = key.trim();

        if ( this.has( key )) {
            delete(this._collection[key]);
        }

        return this;
    }

    /**
     * Get the keys belonging to the map as an array.
     * @returns {string[]}
     */
    public getKeys() : string[] {
        return Object.keys( this._collection );
    }

    /**
     * Provide a callback function - this function will be invoked for every item in the map.
     * @param {(key: string, index?: number, array?: string[]) => void} callback
     */
    public forEachKey( callback : ( key : string, index? : number, array? : string[] ) => void ) : void {
        this.getKeys().forEach( callback );
    }

    /**
     * Get the number of items in the map.
     * @returns {number}
     */
    public get length() : number {
        return Object.keys( this._collection ).length;
    }
}