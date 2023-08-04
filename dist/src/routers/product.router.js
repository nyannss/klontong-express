"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = __importDefault(require("../controllers/product.controller"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const memoryUpload_1 = __importDefault(require("../middlewares/memoryUpload"));
const productRouter = (0, express_1.Router)();
productRouter.get("/", product_controller_1.default.index);
productRouter.get("/:id", product_controller_1.default.show);
productRouter.post("/", auth_1.default.check, auth_1.default.admin, memoryUpload_1.default, product_controller_1.default.store);
productRouter.patch("/:id", auth_1.default.check, auth_1.default.admin, memoryUpload_1.default, product_controller_1.default.update);
productRouter.delete("/:id", auth_1.default.check, auth_1.default.admin, product_controller_1.default.destroy);
exports.default = productRouter;
