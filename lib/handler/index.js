"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlers = void 0;
const len_1 = require("./comm/len");
const str_1 = require("./str");
const all_1 = require("./comm/all");
const num_1 = require("./num");
const arr_1 = require("./arr");
exports.handlers = [
    len_1.handleLen,
    all_1.handleAll,
    ...str_1.strHandlers,
    ...num_1.numHandlers,
    ...arr_1.arrHandlers
];
