export interface EntityType {
    Name: string,
    OpenType: boolean,
    BaseType: string,
    Key: Array<{
        PropertyRef: {
            Name: string
        }
    }>,
    Property: Array<{
        Name: string,
        Type: 'string',
        Nullable: boolean
    }>,
    NavigationProperty: Array<{
        Name: string,
        Relationship: string,
        FromRole: string,
        ToRole: string
    }>
}

export interface EntitySet {
    Name: string,
    EntityType: string
}

export interface ComplexType {
    Name: string,
    Property: Array<{
        Name: string,
        Type: string,
        Nullable: boolean
    }>
}

export interface Association {
    Name: string,
    End: Array<{
        Role: string;
        Multiplicity: string;
    }>
}

export interface EnumType {
    Name: string,
    UnderlyingType: string,
    Member: Array<{
        Name: string
    }>
}

export interface FunctionImport {
    Name: string,
    IsBindable: boolean,
    IsSideEffecting: boolean,
    ReturnType: string,
    Parameter: Array<{
        Name: string,
        Type: string;
    }>
}

