/// <reference types="node" />
import { Schema } from "./schema";
export declare class Reader {
    static convert(source: string | NodeJS.ReadableStream): Promise<Schema>;
}
export default Reader;
