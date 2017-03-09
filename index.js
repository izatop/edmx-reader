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
const xml2o_1 = require("xml2o");
const schema_1 = require("./schema");
exports.Schema = schema_1.Schema;
function convert(source) {
    return __awaiter(this, void 0, void 0, function* () {
        let document;
        if (typeof source === 'string') {
            document = yield xml2o_1.convertString(source);
        }
        else {
            document = yield xml2o_1.convertStream(source);
        }
        return schema_1.Schema.create(document);
    });
}
exports.convert = convert;
exports.default = convert;
//# sourceMappingURL=index.js.map