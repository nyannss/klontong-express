"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importStar(require("multer"));
const path_1 = __importDefault(require("path"));
const storage = multer_1.default.memoryStorage();
const limits = 2e6;
const fileFilter = (req, file, callback) => {
    const pattern = /jpg|png|webp|jpeg/i;
    const ext = path_1.default.extname(file.originalname);
    if (!pattern.test(ext)) {
        return callback(new Error("Only JPG, PNG, and WebP files are allowed"));
    }
    callback(null, true);
};
const uploader = (req, res, next) => {
    const upload = (0, multer_1.default)({
        storage,
        limits: {
            fileSize: limits,
        },
        fileFilter,
    }).single("image");
    upload(req, res, function (err) {
        if (err instanceof multer_1.MulterError) {
            if (err.code && err.code === "LIMIT_FILE_SIZE") {
                return res
                    .status(422)
                    .json({ status: 422, msg: "Image must be below 2mb" });
            }
            return res.status(422).json({ status: 422, msg: "Invalid format type" });
        }
        else if (err) {
            console.log(err);
            return res.status(500).json({ status: 500, msg: err.message });
        }
        return next();
    });
};
exports.default = uploader;
