"use strict";
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    JWT_SECRET_KEY: (_a = process.env.JWT_SECRET_KEY) !== null && _a !== void 0 ? _a : "default_key",
    IMAGEKIT_ENDPOINT: (_b = process.env.IMAGEKIT_ENDPOINT) !== null && _b !== void 0 ? _b : "",
    IMAGEKIT_PUBLIC_KEY: (_c = process.env.IMAGEKIT_PUBLIC_KEY) !== null && _c !== void 0 ? _c : "",
    IMAGEKIT_PRIVATE_KEY: (_d = process.env.IMAGEKIT_PRIVATE_KEY) !== null && _d !== void 0 ? _d : "",
};
