"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.numHandlers = void 0;
const handleIsNum = {
    name: 'number',
    genValidator: () => (value) => typeof value === 'number'
};
exports.numHandlers = [
    handleIsNum
];
