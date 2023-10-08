"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newInstance = exports.validator = void 0;
const handler_1 = require("./handler");
const compile_1 = require("./compile");
const validateObj = (value, ruleTree) => {
    if (typeof value !== 'object' || value === null) {
        return false;
    }
    for (const [key, validator] of Object.entries(ruleTree)) {
        const toValidate = Reflect.get(value, key);
        if (typeof validator === 'function') {
            if (!validator(toValidate)) {
                return false;
            }
        }
        else {
            if (!validateObj(toValidate, validator)) {
                return false;
            }
        }
    }
    return true;
};
const newInstance = () => {
    // init instance
    const handlerMap = new Map();
    for (const handler of handler_1.handlers) {
        handlerMap.set(handler.name, handler);
    }
    const instanceContext = {
        handlerMap
    };
    const setHandler = (handler) => {
        handlerMap.set(handler.name, handler);
    };
    const signal = (signalRule) => {
        const validator = (0, compile_1.compileSignal)(signalRule, instanceContext);
        return (value) => validator(value);
    };
    const obj = (template) => {
        const ruleTree = (0, compile_1.compile)(template, instanceContext, []);
        return (value) => validateObj(value, ruleTree);
    };
    const validate = (value, rule) => {
        if (rule === undefined) {
            return true;
        }
        if (typeof rule === 'string') {
            return signal(rule)(value);
        }
        else {
            return obj(rule)(value);
        }
    };
    return {
        setHandler,
        obj,
        signal,
        validate
    };
};
exports.newInstance = newInstance;
const defaultInstance = newInstance();
exports.validator = defaultInstance;
