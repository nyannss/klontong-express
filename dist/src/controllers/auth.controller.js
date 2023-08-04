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
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = __importDefault(require("../config/env"));
const prisma_1 = __importDefault(require("../config/prisma"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
        if (!email.match(regexEmail))
            return res.status(422).json({ msg: "Invalid email input" });
        if (password == undefined || password.length < 7)
            return res
                .status(422)
                .json({ msg: "Password must be atleast have 7 characters" });
        const encryptedPass = yield bcrypt_1.default.hash(password, 10);
        yield prisma_1.default.user.create({
            data: {
                email,
                password: encryptedPass,
                role: "CUSTOMER",
            },
        });
        res.status(201).json({
            status: 201,
            msg: "USER_CREATED",
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            status: 500,
            msg: "Internal Server Error",
        });
    }
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { email, password } = req.body;
        const user = yield prisma_1.default.user.findUnique({
            where: {
                email: email,
            },
        });
        if (!user)
            return res.status(404).json({
                msg: "Invalid email & password combination",
            });
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch)
            return res.status(404).json({
                msg: "Invalid email & password combination",
            });
        const payload = {
            id: user.id,
            email: user.email,
            role: user.role,
        };
        const expiredInHour = 1;
        const expirationDate = new Date();
        expirationDate.setHours(expirationDate.getHours() + expiredInHour);
        const secret = (_a = env_1.default.JWT_SECRET_KEY) !== null && _a !== void 0 ? _a : "default";
        const token = jsonwebtoken_1.default.sign(payload, secret, {
            expiresIn: `${expiredInHour}h`,
        });
        yield prisma_1.default.token.create({
            data: {
                token,
                expired_time: expirationDate,
            },
        });
        res.status(201).json({
            status: 201,
            msg: "Token Created",
            data: {
                token,
            },
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            status: 500,
            msg: "Internal Server Error",
        });
    }
});
exports.default = {
    register,
    login,
};
