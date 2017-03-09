import {join} from 'path';
import {createReadStream} from 'fs';
import * as test from "tape";
import convert from "./index";

test('Reader', async t => {
    const res = await convert(createReadStream(join(__dirname, 'reader.spec.edmx.xml')));

    t.plan(8);
    t.equal(res.Namespace, 'ODataDemo');
    t.same(res.Metadata, {DataServiceVersion: '3.0', MaxDataServiceVersion: '3.0'});

    t.same(res.FunctionImport[0], {
        IsBindable: undefined,
        IsSideEffecting: undefined,
        Name: 'GetProductsByRating',
        Parameter: [{Name: 'rating', Type: 'Edm.Int16'}],
        ReturnType: 'Collection(ODataDemo.Product)'
    });

    t.same(res.EnumType[0], {
        Name: 'RGBColors',
        UnderlyingType: 'Edm.Int32',
        Member: [{Name: 'Red'}, {Name: 'Green'}, {Name: 'Blue'}]
    });

    t.same(res.ComplexType[0], {
            Name: 'Address',
            Property: [
                {Name: 'Street', Nullable: undefined, Type: 'Edm.String'},
                {Name: 'City', Nullable: undefined, Type: 'Edm.String'},
                {Name: 'State', Nullable: undefined, Type: 'Edm.String'},
                {Name: 'ZipCode', Nullable: undefined, Type: 'Edm.String'},
                {Name: 'Country', Nullable: undefined, Type: 'Edm.String'}
            ]
        }
    );

    t.same(res.EntityType[0], {
        Key: [{PropertyRef: {Name: 'ID'}}],
        Name: 'Product',
        OpenType: undefined,
        BaseType: undefined,
        Property: [
            {Name: 'ID', Nullable: false, Type: 'Edm.Int32'},
            {Name: 'Name', Nullable: undefined, Type: 'Edm.String'},
            {Name: 'Description', Nullable: undefined, Type: 'Edm.String'},
            {Name: 'ReleaseDate', Nullable: false, Type: 'Edm.DateTime'},
            {Name: 'DiscontinuedDate', Nullable: undefined, Type: 'Edm.DateTime'},
            {Name: 'Rating', Nullable: false, Type: 'Edm.Int16'},
            {Name: 'Price', Nullable: false, Type: 'Edm.Double'}
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

    t.same(res.EntitySet[0], {EntityType: 'ODataDemo.Product', Name: 'Products'});

    t.same(res.Association[0], {End: [{Multiplicity: '*', Role: 'Category_Products', Type: 'ODataDemo.Category' }, {Multiplicity: '*', Role: 'Product_Categories', Type: 'ODataDemo.Product'}], Name: 'Product_Categories_Category_Products'});
});
