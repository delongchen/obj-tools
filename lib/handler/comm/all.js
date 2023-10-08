"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleAll = void 0;
const comm_1 = require("../../comm");
const compile_1 = require("../../compile");
exports.handleAll = {
    name: 'all',
    genValidator: (arg, ctx) => {
        if (typeof arg === 'string') {
            arg = (0, comm_1.parseRuleList)(arg, ',', ':');
        }
        const itemValidator = (0, compile_1.compileSignal)(arg, ctx);
        return (value) => {
            if (typeof value === 'string') {
                value = [...value];
            }
            if (typeof value !== 'object' || value === null) {
                return false;
            }
            const iterator = Reflect.get(value, Symbol.iterator);
            if (typeof iterator !== 'function') {
                return false;
            }
            for (const item of iterator.call(value)) {
                if (!itemValidator(item)) {
                    return false;
                }
            }
            return true;
        };
    }
};
