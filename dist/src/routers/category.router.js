"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const category_controller_1 = __importDefault(require("../controllers/category.controller"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const memoryUpload_1 = __importDefault(require("../middlewares/memoryUpload"));
const categoryRouter = (0, express_1.Router)();
categoryRouter.get("/", category_controller_1.default.index);
categoryRouter.get("/:id", category_controller_1.default.show);
categoryRouter.post("/", auth_1.default.check, auth_1.default.admin, memoryUpload_1.default, category_controller_1.default.store);
categoryRouter.patch("/:id", auth_1.default.check, auth_1.default.admin, memoryUpload_1.default, category_controller_1.default.update);
categoryRouter.delete("/:id", auth_1.default.check, auth_1.default.admin, category_controller_1.default.destroy);
exports.default = categoryRouter;
