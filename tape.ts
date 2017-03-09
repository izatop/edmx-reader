import * as tape from 'tape';

export const test = (msg, fn: (assert: tape.Test) => Promise<any>) => {
    tape(msg, assert => {
        try {
            fn(assert)
                .then(assert.end)
                .catch(assert.error);
        } catch (error) {
            assert.fail(error.stack);
            assert.end();
        }
    })
};
