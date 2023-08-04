"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = __importDefault(require("../config/env"));
const prisma_1 = __importDefault(require("../config/prisma"));
function check(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const bearerToken = req.header("Authorization");
            if (!bearerToken)
                return res.status(403).json({
                    status: 403,
                    msg: "Access denied! Not logged in",
                });
            const token = bearerToken.split(" ")[1];
            const tokenVerify = yield prisma_1.default.token.findUnique({
                where: {
                    token,
                },
            });
            if (!tokenVerify) {
                return res.status(403).json({
                    status: 403,
                    msg: "JWT Rejected",
                });
            }
            const decoded = jsonwebtoken_1.default.verify(token, env_1.default.JWT_SECRET_KEY);
            req.token = decoded;
        }
        catch (err) {
            res.status(401).send("Please authenticate");
        }
    });
}
function admin(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const userRole = req.token;
        if (typeof userRole !== "object" || userRole.token !== "ADMIN") {
            return res.status(403).json({
                status: 403,
                msg: "Access denied! Role not authorized",
            });
        }
        next();
    });
}
exports.default = {
    check,
    admin,
};
