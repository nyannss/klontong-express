"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorResponse = void 0;
const library_1 = require("@prisma/client/runtime/library");
function errorResponse(err, res) {
    console.log(err);
    if (err instanceof library_1.PrismaClientValidationError) {
        const lines = err.message.split("\n");
        const errorMessage = lines[lines.length - 1].trim();
        return res.status(500).json({
            msg: "Prisma Error: " + errorMessage,
        });
    }
    if (err instanceof library_1.PrismaClientKnownRequestError) {
        let errorMessage = err.meta ? err.meta.cause : err.message;
        return res.status(500).json({
            msg: "Prisma Error: " + errorMessage,
        });
    }
    const errorMessage = err instanceof Error ? err.message : "Internal Server Error";
    res.status(500).json({
        msg: errorMessage,
    });
}
exports.errorResponse = errorResponse;
