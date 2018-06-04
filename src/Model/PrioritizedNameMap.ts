import {NameMap} from "./NameMap";
import {NumberMap} from "./NumberMap";

export class PrioritizedNameMap<T> {

    protected _prioritizedNames : NumberMap<NameMap<T>>;
    private get prioritizedNames() { return this._prioritizedNames; }

    protected _namePriorityIndex : NameMap<number>;
    private get namePriorityIndex() { return this._namePriorityIndex; }

    private static DEFAULT_PRIORITY : number = 1000;

    public constructor() {
        this._prioritizedNames = new NumberMap<NameMap<T>>();
        this._namePriorityIndex = new NameMap<number>();
    }

    /**
     * Add an item to the collection with the given key.
     *
     * @param {string} key
     * @param {T} value
     * @param {number} priority (defaults to 1000)
     * @returns {NameMap<T>}
     */
    public add( key : string, value : T, priority : number = PrioritizedNameMap.DEFAULT_PRIORITY )
        : PrioritizedNameMap<T> {

        if ( priority < 0 ) {
            throw new Error( "Priority cannot be less than 0" );
        }

        if ( this.has( key ) ) {
            throw Error( "Item with name " + key + " already exists." );
        }

        if (! this.prioritizedNames.has( priority )) {
            this.prioritizedNames.add( priority, new NameMap<T>());
        }

        this.prioritizedNames.get( priority ).add( key, value );
        this.namePriorityIndex.add( key , priority );

        return this;
    }

    /**
     * Add or replace an item in the collection with a given key.
     *
     * @param {string} key
     * @param {T} value
     * @param {number|null} priority  Leave null to leave
     * @returns {NameMap<T>}
     */
    public set( key : string, value : T, priority : number|null = null ) : PrioritizedNameMap<T> {

        if (priority == null) {
            priority = this.getPriorityOfKey( key );
        }

        if ( ! this.prioritizedNames.has( priority )) {
            this.prioritizedNames.add( priority, new NameMap<T>());
        }

        if ( this.has( key )) {

            const existingKeyPriority =  this.namePriorityIndex.get( key );

            if ( priority == existingKeyPriority ) {
                // Swap out the existing value at the same priority tier
                this.prioritizedNames.get( priority ).set( key, value );
            } else {
                // Remove the registration at the existing priority tier, register new value at new tier.
                this.prioritizedNames.get( existingKeyPriority ).remove( key );
                this.prioritizedNames.get( priority ).add( key, value );
                this.namePriorityIndex.replace( key, priority );
            }
        } else {

            this.add( key, value, priority );
        }



        return this;
    }

    /**
     * Replace an existing item in the collection with a given key.
     *
     * @param {string} key
     * @param {T} value
     * @returns {NameMap<T>}
     */
    public replace( key : string, value : T ) : PrioritizedNameMap<T> {

        if ( ! this.has( key )) {
            throw Error( "Cannot replace " + key + " item.  It does not exist on the NameMap" );
        }

        const existingKeyPriority = this.namePriorityIndex.get( key );

        this.prioritizedNames.get( existingKeyPriority ).replace( key, value );
        return this;
    }

    /**
     * Get a single item in the collection, referenced with the given key.
     *
     * @param {string} key?
     * @returns {T}
     */
    public get( key : string ) : T {

        if ( ! this.has( key )) {

            throw new Error( 'Cannot find item with key ' + key );
        }

        const existingKeyPriority = this.namePriorityIndex.get( key );

        return this.prioritizedNames.get( existingKeyPriority ).get( key );
    }

    /**
     * Returns a NameMap with all items registered at the given priority level.
     *
     * @param {number} priority
     * @returns {NameMap<T>}
     */
    public getMapForPriority( priority : number ) : NameMap<T> {

        if ( ! this.prioritizedNames.has( priority )) {
            throw new Error( 'Cannot find any items registered with priority ' + priority );
        }

        return this.prioritizedNames.get( priority );
    }

    /**
     * Get all items in the collection
     *
     * @returns {{[p: string]: T}}
     */
    public getAll() : { [key:string] : T } {

        let collection : { [key:string] : T } = {};
        let priorityMap : NameMap<T>;

        this.prioritizedNames.forEachKey( ( priorityKey : number ) => {

            priorityMap = this.prioritizedNames.get( priorityKey );

            priorityMap.forEachKey( ( mapKey : string ) => {
                collection[mapKey] = priorityMap.get( mapKey );
            });
        });

        return collection;
    }

    /**
     * Request information on whether or not an item with a given key exists
     *
     * @param {string} key
     * @returns {boolean}
     */
    public has( key : string, priority : number|null = null ) : boolean {

        let itemFound : boolean = false;

        // Loop through each priority tier's name map and check for the given key
        this.prioritizedNames.forEachKey( ( priorityKey : number ) => {
            if ( this.prioritizedNames.get( priorityKey ).has( key )) { itemFound = true; }
        });

        return itemFound;
    }

    /**
     * Remove the item with the given key from the collection.
     *
     * @param {string} key
     * @returns {NameMap<T>}
     */
    public remove( key: string ) : PrioritizedNameMap<T> {

        this.prioritizedNames.forEachKey( ( priorityKey : number ) => {
            if ( this.prioritizedNames.get( priorityKey ).has( key )) {
                this.prioritizedNames.get( priorityKey ).remove( key );
            }
        });

        return this;
    }

    /**
     * Get the keys belonging to the map as an array.
     * @returns {string[]}
     */
    public getKeys( priority : number|null = null ) : string[] {

        if ( priority ) {
            return Object.keys(this.prioritizedNames.get( priority ));
        }
        else {

            let keys : string[] = [];

            // Loop through each tier and collect the keys from the collection on that tier.
            this.prioritizedNames.forEachKey( ( priorityKey : number ) => {
                this.prioritizedNames.get( priorityKey ).forEachKey( ( itemKey : string ) => {
                   keys.push(itemKey);
                });
            });

            return keys;
        }
    }

    /**
     * Provide a callback function - this function will be invoked for every item in the map.  Will deliver items
     * from priority tiers in ASCENDING order ( starting with 0, then 1, etc... ).
     * @param {(key: string, index?: number, array?: string[]) => void} callback
     */
    public forEachKey( callback : ( key : string, index? : number, array? : string[] ) => void ) : void {

        let keys : number[] = this.prioritizedNames.getKeys();

        keys.sort( ( a : number, b : number ) => {

            if ( a < b ) return -1;
            if ( a == b ) return 0;
            return 1;
        });

        for ( let i = 0 ; i < keys.length ; i++ ) {

            this.prioritizedNames.get( i ).forEachKey ( callback );
        }
    }

    /**
     * Change the priority of the indicated item with the given key.
     *
     * @param {string} key
     * @param {number} newPriority
     */
    public updatePriority( key : string, newPriority : number ) {

        // Collect values
        let itemPriority : number = this.namePriorityIndex.get( key );
        let value : T = this.prioritizedNames.get( itemPriority ).get( key );

        // Remove Values
        this.prioritizedNames.get( itemPriority ).remove( key );
        this.namePriorityIndex.remove( key );

        // Add replacement value.
        this.add( key, value, newPriority );
    }


    /**
     * Get the number of items in the map.
     * @returns {number}
     */
    public get length() : number {

        let length : number = 0;

        this.prioritizedNames.forEachKey( ( key : number ) => {

            length += this.prioritizedNames.get( key ).length;
        });

        return length;
    }

    /**
     * Will search for the priority of the given key.  If no such key is found,
     * this function will return the DEFAULT PRIORITY value.  Handy for situations where
     * you just need a number to assign, and don't require the key to already have been registered
     * to take action.
     *
     * @param {string} key
     * @returns {number}
     */
    protected getPriorityOfKey( key : string ) : number {

        try {

            return this.namePriorityIndex.get( key );
        }
        catch ( ex ){

            return PrioritizedNameMap.DEFAULT_PRIORITY;
        }

    }
}