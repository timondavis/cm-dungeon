import {ISerializableModel, SerializableModel} from "cm-domain-utilities";

export interface IList<T> extends ISerializableModel {
	collection: T[];
}

export class List<T> extends SerializableModel {

	protected state: IList<T>;

    protected get collection() { return this.state.collection; }

    constructor() {
    	super();

    	this.state = {
			collection: []
		};
    }

    public add( item : T ) : void {
        this.collection.push( item );
    }

    public remove( index : number ) {
        this.collection.splice(index, 1);
    }

    public clear() : void {
        this.state.collection = [];
    }

    public get( index : number ) : T {

        if ( index >= 0 && index <= this.length ) {

            return this.collection[index];
        }

        throw Error( "Cannot find index " + index + " in List" );
    }

    public get length() : number {
        return this.collection.length;
    }

    public forEachItem( callback : ( item : T, index : number ) => void ) : void {

        for ( let i = 0 ; i < this.length ; i++ ){

            callback(this.collection[i], i);
        }
    }
}