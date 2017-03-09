# edmx-reader

## Getting Started

Install the package:

```bash
npm i -S edmx-reader
```

Let's translate an EDMX XML document to a schema object:

```javascript
const convert = require('edmx-reader').convert;
convert(
    createReadStream('/path/to/edmx/document.xml')
).then(schema => {
    console.log('Schema', schema);
}).catch(console.log);
```

See a schema structure in `reader.spec.ts`. 

## License
MIT
