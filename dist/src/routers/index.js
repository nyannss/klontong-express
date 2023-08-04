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
const express_1 = require("express");
const auth_router_1 = __importDefault(require("./auth.router"));
const category_router_1 = __importDefault(require("./category.router"));
const product_router_1 = __importDefault(require("./product.router"));
const routers = (0, express_1.Router)();
routers.use("/auth", auth_router_1.default);
routers.use("/product", product_router_1.default);
routers.use("/category", category_router_1.default);
routers.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({
        status: 200,
        msg: "Welcome to Rest API kelontong app!",
        contributors: [
            {
                alias: "nyannss",
                github: "https://github.com/nyannss",
            },
        ],
    });
}));
exports.default = routers;
