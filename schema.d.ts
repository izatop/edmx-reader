import { Node } from "xml2o";
import { Association, ComplexType, EntitySet, EntityType, EnumType, FunctionImport } from "./edmx";
export declare class Schema {
    Namespace: string;
    EntityType: EntityType[];
    EntitySet: EntitySet[];
    ComplexType: ComplexType[];
    Association: Association[];
    EnumType: EnumType[];
    FunctionImport: FunctionImport[];
    Metadata: {
        [key: string]: string;
    };
    protected constructor(document: Node);
    static create(document: Node): Schema;
}
