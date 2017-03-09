import {convertStream, convertString} from 'xml2o';
import {Schema} from "./schema";

export class Reader {
    static async convert(source: string | NodeJS.ReadableStream): Promise<Schema> {
        let document;
        if (typeof source === 'string') {
            document = await convertString(source);
        } else {
            document = await convertStream(source);
        }

        return Schema.create(document);
    }
}

export default Reader;
