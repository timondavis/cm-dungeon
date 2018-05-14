export class Effect {

    public attributeFilters : { [key:string] : (value:number) => number }
    public labelFilters : { [key:string] : (label:string) => string }
}