"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateNumericFields = exports.isNumeric = void 0;
const isNumeric = (value) => !isNaN(Number(value));
exports.isNumeric = isNumeric;
const validateNumericFields = (...fields) => {
    return fields.some((field) => field && !(0, exports.isNumeric)(field));
};
exports.validateNumericFields = validateNumericFields;
