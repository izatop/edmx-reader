/// <reference types="node" />
import { Schema } from "./schema";
export declare function convert(source: string | NodeJS.ReadableStream): Promise<Schema>;
export { Schema };
export * from './edmx';
export default convert;
