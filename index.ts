import {convertStream, convertString} from 'xml2o';
import {Schema} from "./schema";

export async function convert(source: string | NodeJS.ReadableStream): Promise<Schema> {
    let document;
    if (typeof source === 'string') {
        document = await convertString(source);
    } else {
        document = await convertStream(source);
    }

    return Schema.create(document);
}

export {Schema};
export * from './edmx';
export default convert;
