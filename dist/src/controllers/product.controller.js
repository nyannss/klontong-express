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
const imageKit_1 = __importDefault(require("../config/imageKit"));
const prisma_1 = __importDefault(require("../config/prisma"));
const errorHandler_1 = require("../helpers/errorHandler");
const randomString_1 = require("../helpers/randomString");
const validation_1 = require("../helpers/validation");
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page = 1, limit = 10, search = "", sortBy = "id" } = req.query;
        const take = Number(limit);
        const skip = (Number(page) - 1) * Number(limit);
        const products = yield prisma_1.default.product.findMany({
            skip,
            take,
            where: {
                OR: [
                    {
                        name: {
                            contains: String(search) || "",
                        },
                    },
                    {
                        category: {
                            name: {
                                contains: String(search) || "",
                            },
                        },
                    },
                ],
            },
            orderBy: {
                [String(sortBy)]: "asc", // Change 'asc' to 'desc' for descending order
            },
            include: {
                category: true,
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
        const data = yield prisma_1.default.product.findUnique({
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
        let { name, description, price, sku, width, length, height, weight, categoryId, } = req.body;
        price = Number(price);
        width = Number(width);
        length = Number(length);
        height = Number(height);
        weight = Number(weight);
        categoryId = Number(categoryId);
        if ((0, validation_1.validateNumericFields)(price, width, length, height, weight, categoryId))
            res.status(422).json({
                msg: "Invalid type",
            });
        let image = ""; // for default value
        if (req.file) {
            const fileName = `product-${(0, randomString_1.randomString)(6)}`;
            const imgUpload = yield imageKit_1.default.upload({
                file: req.file.buffer,
                fileName,
            });
            image = imgUpload.url;
        }
        const data = yield prisma_1.default.product.create({
            data: {
                name,
                description,
                price,
                sku,
                width,
                length,
                height,
                weight,
                categoryId,
                image,
            },
        });
        res.status(201).json({
            msg: "Product added",
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
        let { name, description, price, sku, width, length, height, weight, categoryId, } = req.body;
        if ((0, validation_1.validateNumericFields)(price, width, length, height, weight, categoryId)) {
            return res.status(422).json({
                msg: "Invalid type",
            });
        }
        price = Number(price);
        width = Number(width);
        length = Number(length);
        height = Number(height);
        weight = Number(weight);
        categoryId = Number(categoryId);
        const originData = yield prisma_1.default.product.findUnique({
            where: {
                id: Number(id),
            },
        });
        if (!originData)
            return res.status(201).json({
                msg: "Product not found",
                data: {},
            });
        let image = undefined; // for default value
        if (req.file) {
            const fileName = `product-`;
            const imgUpload = yield imageKit_1.default.upload({
                file: req.file.buffer,
                fileName,
            });
            image = imgUpload.url;
        }
        const updatedData = {
            name: name !== null && name !== void 0 ? name : originData.name,
            description: description !== null && description !== void 0 ? description : originData.description,
            price: (0, validation_1.isNumeric)(price) ? price : originData.price,
            weight: (0, validation_1.isNumeric)(weight) ? weight : originData.weight,
            width: (0, validation_1.isNumeric)(width) ? width : originData.weight,
            length: (0, validation_1.isNumeric)(length) ? length : originData.length,
            height: (0, validation_1.isNumeric)(height) ? height : originData.height,
            sku: sku !== null && sku !== void 0 ? sku : originData.sku,
            image: image !== null && image !== void 0 ? image : originData.image,
            categoryId: categoryId !== null && categoryId !== void 0 ? categoryId : originData.categoryId,
        };
        const data = yield prisma_1.default.product.update({
            where: {
                id: Number(id),
            },
            data: updatedData,
        });
        res.status(201).json({
            msg: "Product updated",
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
        const data = yield prisma_1.default.product.delete({
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
