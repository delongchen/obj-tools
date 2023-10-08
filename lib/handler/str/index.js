"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.strHandlers = void 0;
const handleIsStr = {
    name: 'string',
    genValidator: () => (value) => typeof value === 'string'
};
exports.strHandlers = [
    handleIsStr
];
