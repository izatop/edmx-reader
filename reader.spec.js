"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const fs_1 = require("fs");
const test = require("tape");
const index_1 = require("./index");
test('Reader', (t) => __awaiter(this, void 0, void 0, function* () {
    const res = yield index_1.default(fs_1.createReadStream(path_1.join(__dirname, 'reader.spec.edmx.xml')));
    t.plan(8);
    t.equal(res.Namespace, 'ODataDemo');
    t.same(res.Metadata, { DataServiceVersion: '3.0', MaxDataServiceVersion: '3.0' });
    t.same(res.FunctionImport[0], {
        IsBindable: undefined,
        IsSideEffecting: undefined,
        Name: 'GetProductsByRating',
        Parameter: [{ Name: 'rating', Type: 'Int16' }],
        ReturnType: 'Collection(ODataDemo.Product)'
    });
    t.same(res.EnumType[0], {
        Name: 'RGBColors',
        UnderlyingType: 'Int32',
        Member: [{ Name: 'Red' }, { Name: 'Green' }, { Name: 'Blue' }]
    });
    t.same(res.ComplexType[0], {
        Name: 'Address',
        Property: [
            { Name: 'Street', Nullable: undefined, Type: 'String' },
            { Name: 'City', Nullable: undefined, Type: 'String' },
            { Name: 'State', Nullable: undefined, Type: 'String' },
            { Name: 'ZipCode', Nullable: undefined, Type: 'String' },
            { Name: 'Country', Nullable: undefined, Type: 'String' }
        ]
    });
    t.same(res.EntityType[0], {
        Key: [{ PropertyRef: { Name: 'ID' } }],
        Name: 'Product',
        OpenType: undefined,
        BaseType: undefined,
        Property: [
            { Name: 'ID', Nullable: false, Type: 'Int32' },
            { Name: 'Name', Nullable: undefined, Type: 'String' },
            { Name: 'Description', Nullable: undefined, Type: 'String' },
            { Name: 'ReleaseDate', Nullable: false, Type: 'DateTime' },
            { Name: 'DiscontinuedDate', Nullable: undefined, Type: 'DateTime' },
            { Name: 'Rating', Nullable: false, Type: 'Int16' },
            { Name: 'Price', Nullable: false, Type: 'Double' }
        ],
        NavigationProperty: [{
                FromRole: 'Product_Categories',
                Name: 'Categories',
                Relationship: 'ODataDemo.Product_Categories_Category_Products',
                ToRole: 'Category_Products'
            }, {
                FromRole: 'Product_Supplier',
                Name: 'Supplier',
                Relationship: 'ODataDemo.Product_Supplier_Supplier_Products',
                ToRole: 'Supplier_Products'
            }, {
                FromRole: 'Product_ProductDetail',
                Name: 'ProductDetail',
                Relationship: 'ODataDemo.Product_ProductDetail_ProductDetail_Product',
                ToRole: 'ProductDetail_Product'
            }]
    });
    t.same(res.EntitySet[0], { EntityType: 'ODataDemo.Product', Name: 'Products' });
    t.same(res.Association[0], { End: [{ Multiplicity: '*', Role: 'Category_Products', Type: 'Category' }, { Multiplicity: '*', Role: 'Product_Categories', Type: 'Product' }], Name: 'Product_Categories_Category_Products' });
}));
//# sourceMappingURL=reader.spec.js.map