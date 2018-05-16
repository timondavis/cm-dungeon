import {NameMap} from "./NameMap";

export class Effect {

    public attributeFilters : NameMap<(input:number) => number>
    public labelFilters : NameMap<(input:string) => string>
}