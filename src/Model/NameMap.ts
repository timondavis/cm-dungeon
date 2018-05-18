export class NameMap<T> {

    protected collection : { [key:string] : T };

    constructor() {
        this.collection = {};
    }

    /**
     * Add an item to the collection with the given key.
     *
     * @param {string} key
     * @param {T} value
     * @returns {NameMap<T>}
     */
    public add( key : string, value : T ) : NameMap<T> {

        if ( this.has( key ) ) {
            throw "Item with name " + key + " already exists."
        }

        this.collection[key] = value;
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

        this.collection[key] = value;
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

        if ( ! this.has( key )) {
            throw "Cannot replace " + key + " item.  It does not exist on the NameMap";
        }

        this.collection[key] = value;
        return this;
    }

    /**
     * Get a single item in the collection, referenced with the given key.
     *
     * @param {string} key?
     * @returns {T}
     */
    public get( key : string ) : T {

        if ( this.has( key )) {

            return this.collection[key];
        }

        throw "Cannot find item with key " + key;
    }

    /**
     * Get all items in the collection
     *
     * @returns {{[p: string]: T}}
     */
    public getAll() : { [key:string] : T } {
        return this.collection;
    }

    /**
     * Request information on whether or not an item with a given key exists
     *
     * @param {string} key
     * @returns {boolean}
     */
    public has( key : string ) : boolean {

        if ( this.collection.hasOwnProperty(key) ) {
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

        if ( this.has( key )) {
            delete(this.collection[key]);
        }

        return this;
    }

    public getKeys() : string[] {
        return Object.keys( this.collection );
    }

    public forEachKey( callback : ( key : string, index? : number, array? : string[] ) => void ) : void {
        this.getKeys().forEach( callback );
    }

    public get length() : number {
        return Object.keys( this.collection ).length;
    }
}