"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.arrHandlers = void 0;
const handleIsArr = {
    name: 'array',
    genValidator: () => (value) => Array.isArray(value)
};
exports.arrHandlers = [
    handleIsArr
];
