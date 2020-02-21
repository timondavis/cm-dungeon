import {ISerializableModel, SerializableModel} from "cm-domain-utilities";

export interface INumberMap<T> extends ISerializableModel {
	collection: {[key:number] : T};
}

export class NumberMap<T> extends SerializableModel {

	protected state: INumberMap<T>;

    constructor() {
    	super();
    	this.state = {
			collection: {}
    	};
    }

    /**
     * Add an item to the collection with the given key.
     *
     * @param {number} key
     * @param {T} value
     * @returns {NumberMap<T>}
     */
    public add( key : number, value : T ) : NumberMap<T> {

        if ( this.has( key ) ) {
            throw Error( "Item with name " + key + " already exists." );
        }

        this.state.collection[key] = value;
        return this;
    }

    /**
     * Add or replace an item in the collection with a given key.
     *
     * @param {number} key
     * @param {T} value
     * @returns {NumberMap<T>}
     */
    public set( key : number, value : T ) : NumberMap<T> {

        this.state.collection[key] = value;
        return this;
    }

    /**
     * Replace an existing item in the collection with a given key.
     *
     * @param {number} key
     * @param {T} value
     * @returns {NumberMap<T>}
     */
    public replace( key : number, value : T ) : NumberMap<T> {

        if ( ! this.has( key )) {
            throw Error( "Cannot replace " + key + " item.  It does not exist on the NumberMap" );
        }

        this.state.collection[key] = value;
        return this;
    }

    /**
     * Get a single item in the collection, referenced with the given key.
     *
     * @param {number} key?
     * @returns {T}
     */
    public get( key : number ) : T {

        if ( this.has( key )) {

            return this.state.collection[key];
        }

        throw new Error( 'Cannot find item with key ' + key );
    }

    /**
     * Get all items in the collection
     *
     * @returns {{[p: number]: T}}
     */
    public getAll() : { [key:number] : T } {
        return this.state.collection;
    }

    /**
     * Request information on whether or not an item with a given key exists
     *
     * @param {number} key
     * @returns {boolean}
     */
    public has( key : number ) : boolean {

        if ( this.state.collection.hasOwnProperty(key.toString()) ) {
            return true;
        }

        return false;
    }

    /**
     * Remove the item with the given key from the collection.
     *
     * @param {number} key
     * @returns {NumberMap<T>}
     */
    public remove( key: number ) : NumberMap<T> {

        if ( this.has( key )) {
            delete(this.state.collection[key]);
        }

        return this;
    }

    /**
     * Get the keys belonging to the map as an array.
     * @returns {string[]}
     */
    public getKeys() : number[] {
        let keys = Object.keys( this.state.collection );
        let convertedToNumberKeys : number[] = [];

        keys.forEach( (key : string, index : number )  => {
           convertedToNumberKeys[index] = parseInt( key );
        });

        return convertedToNumberKeys;
    }

    /**
     * Provide a callback function - this function will be invoked for every item in the map.
     * @param {(key: number, index?: number, array?: number[]) => void} callback
     */
    public forEachKey( callback : ( key : number, index? : number, array? : number[] ) => void ) : void {

        let keys : number[] = this.getKeys();
        for ( let i = 0 ; i < keys.length ; i++ ) {

            if ( keys[i] !== undefined ) {
                callback( keys[i], i, keys );
            }
        }
    }

    /**
     * Get the number of items in the map.
     * @returns {number}
     */
    public get length() : number {
        return Object.keys( this.state.collection ).length;
    }
}