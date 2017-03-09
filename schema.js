"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = require("assert");
const xml2o_1 = require("xml2o");
const EDMX_NS = 'http://schemas.microsoft.com/ado/2007/06/edmx';
const EDMX_SCHEMA_NS = 'http://schemas.microsoft.com/ado/2009/11/edm';
const EDMX_METADATA_NS = 'http://schemas.microsoft.com/ado/2007/08/dataservices/metadata';
const stringToBoolean = str => str === 'true' ? true : (str === 'false' ? false : undefined);
const normalizeType = str => !!str ? str.substr(str.indexOf('.') + 1) : undefined;
class Schema {
    constructor(document) {
        const [dataServices] = document.query('/DataServices', EDMX_NS);
        assert_1.ok(dataServices instanceof xml2o_1.Node, 'Cannot resolve a DataServices node');
        this.Metadata = dataServices.getAttributes(EDMX_METADATA_NS);
        const [schema] = dataServices.query('/Schema', EDMX_SCHEMA_NS);
        assert_1.ok(schema instanceof xml2o_1.Node, 'Cannot resolve a Schema node');
        const entityType = schema.query('/EntityType', EDMX_SCHEMA_NS);
        const entitySet = schema.query('/EntityContainer/EntitySet', EDMX_SCHEMA_NS);
        const functionImport = schema.query('/EntityContainer/FunctionImport', EDMX_SCHEMA_NS);
        const complexType = schema.query('/ComplexType', EDMX_SCHEMA_NS);
        const association = schema.query('/Association', EDMX_SCHEMA_NS);
        const enumType = schema.query('/EnumType', EDMX_SCHEMA_NS);
        this.Namespace = schema.getAttribute('Namespace');
        this.EntityType = entityType.map(item => {
            const Key = item.query('/Key/PropertyRef', EDMX_SCHEMA_NS)
                .map(x => ({ PropertyRef: { Name: x.getAttribute('Name') } }));
            const NavigationProperty = item.query('/NavigationProperty', EDMX_SCHEMA_NS)
                .map(x => ({
                Name: x.getAttribute('Name'),
                Relationship: x.getAttribute('Relationship'),
                FromRole: x.getAttribute('FromRole'),
                ToRole: x.getAttribute('ToRole')
            }));
            const Property = item.query('/Property', EDMX_SCHEMA_NS)
                .map(x => ({
                Name: x.getAttribute('Name'),
                Type: normalizeType(x.getAttribute('Type')),
                Nullable: stringToBoolean(x.getAttribute('Nullable'))
            }));
            const OpenType = stringToBoolean(item.getAttribute('OpenType'));
            const BaseType = normalizeType(item.getAttribute('BaseType'));
            return {
                Key,
                Name: item.getAttribute('Name'),
                NavigationProperty,
                Property,
                OpenType,
                BaseType
            };
        });
        this.EntitySet = entitySet.map(item => ({
            Name: item.getAttribute('Name'),
            EntityType: item.getAttribute('EntityType')
        }));
        this.ComplexType = complexType.map(item => ({
            Name: item.getAttribute('Name'),
            Property: item.query('/Property', EDMX_SCHEMA_NS)
                .map(x => ({
                Name: x.getAttribute('Name'),
                Type: normalizeType(x.getAttribute('Type')),
                Nullable: stringToBoolean(x.getAttribute('Nullable'))
            }))
        }));
        this.Association = association.map(item => ({
            Name: item.getAttribute('Name'),
            End: item.query('/End', EDMX_SCHEMA_NS)
                .map(x => ({
                Role: x.getAttribute('Role'),
                Type: normalizeType(x.getAttribute('Type')),
                Multiplicity: x.getAttribute('Multiplicity')
            }))
        }));
        this.EnumType = enumType.map(item => ({
            Name: item.getAttribute('Name'),
            UnderlyingType: normalizeType(item.getAttribute('UnderlyingType')),
            Member: item.query('/Member', EDMX_SCHEMA_NS)
                .map(x => ({ Name: x.getAttribute('Name') }))
        }));
        this.FunctionImport = functionImport.map(item => ({
            Name: item.getAttribute('Name'),
            IsBindable: stringToBoolean(item.getAttribute('IsBindable')),
            IsSideEffecting: stringToBoolean(item.getAttribute('IsSideEffecting')),
            ReturnType: item.getAttribute('ReturnType'),
            Parameter: item.query('/Parameter', EDMX_SCHEMA_NS)
                .map(x => ({
                Name: x.getAttribute('Name'),
                Type: normalizeType(x.getAttribute('Type'))
            }))
        }));
    }
    static create(document) {
        return new Schema(document);
    }
}
exports.Schema = Schema;
//# sourceMappingURL=schema.js.map