export class List<T> {

    private _collection : T[];

    constructor() {
        this._collection = [];
    }

    public add( item : T ) : void {
        this.push( item );
    }

    public push( item : T ) : void {
        this._collection.push( item );
    }

    public remove( index : number ) {
        this._collection.splice(index, 1);
    }

    public get( index : number ) : T {

        if ( index >= 0 && index <= this.length ) {

            return this._collection[index];
        }

        throw Error( "Cannot find index " + index + " in List" );
    }

    public get length() : number {
        return this._collection.length;
    }

    public forEachItem( callback : ( item : T, index : number ) => void ) : void {

        for ( let i = 0 ; i < this.length ; i++ ){

            callback(this._collection[i], i);
        }
    }

}