"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tape = require("tape");
exports.test = (msg, fn) => {
    tape(msg, assert => {
        try {
            fn(assert)
                .then(assert.end)
                .catch(assert.error);
        }
        catch (error) {
            assert.fail(error.stack);
            assert.end();
        }
    });
};
//# sourceMappingURL=tape.js.map