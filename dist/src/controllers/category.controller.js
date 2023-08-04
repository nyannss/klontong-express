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
const prisma_1 = __importDefault(require("../config/prisma"));
const errorHandler_1 = require("../helpers/errorHandler");
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page = 1, limit = 10, search = "", sortBy = "id" } = req.query;
        const take = Number(limit);
        const skip = (Number(page) - 1) * Number(limit);
        const products = yield prisma_1.default.category.findMany({
            skip,
            take,
            where: {
                OR: [
                    {
                        name: {
                            contains: String(search) || "",
                        },
                    },
                ],
            },
            orderBy: {
                [String(sortBy)]: "asc", // Change 'asc' to 'desc' for descending order
            },
        });
        res.status(200).json({
            msg: "Fetched",
            data: products,
        });
    }
    catch (err) {
        (0, errorHandler_1.errorResponse)(err, res);
    }
});
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const data = yield prisma_1.default.category.findUnique({
            where: {
                id: Number(id),
            },
        });
        res.status(200).json({
            msg: "Fetched",
            data,
        });
    }
    catch (err) {
        (0, errorHandler_1.errorResponse)(err, res);
    }
});
const store = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { name } = req.body;
        const data = yield prisma_1.default.category.create({
            data: {
                name,
            },
        });
        res.status(201).json({
            msg: "Category added",
            data,
        });
    }
    catch (err) {
        (0, errorHandler_1.errorResponse)(err, res);
    }
});
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        let { name } = req.body;
        const originData = yield prisma_1.default.category.findUnique({
            where: {
                id: Number(id),
            },
        });
        if (!originData)
            return res.status(201).json({
                msg: "Category not found",
                data: {},
            });
        const updatedData = {
            name: name !== null && name !== void 0 ? name : originData.name,
        };
        const data = yield prisma_1.default.product.update({
            where: {
                id: Number(id),
            },
            data: updatedData,
        });
        res.status(201).json({
            msg: "Category updated",
            data,
        });
    }
    catch (err) {
        (0, errorHandler_1.errorResponse)(err, res);
    }
});
const destroy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const data = yield prisma_1.default.category.delete({
            where: {
                id: Number(id),
            },
        });
        res.status(200).json({
            msg: "Data was destroyed",
            data,
        });
    }
    catch (err) {
        (0, errorHandler_1.errorResponse)(err, res);
    }
});
exports.default = {
    index,
    show,
    store,
    update,
    destroy,
};
