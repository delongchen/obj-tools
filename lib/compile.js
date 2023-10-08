"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compile = exports.compileSignal = void 0;
const comm_1 = require("./comm");
const compileSignal = (signalRule, ctx, key) => {
    const { handlerMap } = ctx;
    if (typeof signalRule === 'string') {
        signalRule = (0, comm_1.parseRuleList)(signalRule, '&', '=');
    }
    if (signalRule.length === 0) {
        return () => true;
    }
    const validatorList = [];
    const existValidatorSet = new Set();
    for (const rule of signalRule) {
        const [handlerName, arg] = rule;
        const handler = handlerMap.get(handlerName.trim());
        if (handler !== undefined && !existValidatorSet.has(handlerName)) {
            validatorList.push(handler.genValidator(arg, ctx));
            existValidatorSet.add(handlerName);
        }
    }
    const validateContext = {
        key: key ?? ''
    };
    return (value) => {
        for (const validator of validatorList) {
            if (!validator(value, validateContext)) {
                return false;
            }
        }
        return true;
    };
};
exports.compileSignal = compileSignal;
const compile = (template, ctx, keyPath) => {
    const ruleTree = {};
    for (const [key, value] of Object.entries(template)) {
        keyPath.push(key);
        if (typeof value === 'string') {
            ruleTree[key] = (0, exports.compileSignal)(value, ctx, keyPath.join('.'));
        }
        else {
            ruleTree[key] = (0, exports.compile)(value, ctx, keyPath);
        }
        keyPath.pop();
    }
    return ruleTree;
};
exports.compile = compile;
