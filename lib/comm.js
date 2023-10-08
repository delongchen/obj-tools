"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseRuleList = exports.NOT_OK = exports.OK = void 0;
const OK = () => true;
exports.OK = OK;
const NOT_OK = () => false;
exports.NOT_OK = NOT_OK;
const parseRuleList = (ruleStr, itemSeparator, kvSeparator) => {
    const result = [];
    const ruleStrList = ruleStr.split(itemSeparator);
    for (const ruleRaw of ruleStrList) {
        const [handlerName, arg] = ruleRaw.split(kvSeparator);
        if (handlerName !== undefined && handlerName !== '') {
            result.push([handlerName.trim(), arg?.trim() ?? '']);
        }
    }
    return result;
};
exports.parseRuleList = parseRuleList;
