"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const routers_1 = __importDefault(require("./src/routers"));
const app = (0, express_1.default)();
const port = process.env.APP_PORT || 3000;
app.use((0, cors_1.default)());
// tracking responses
app.use((0, morgan_1.default)(":method :url :status :res[content-length] - :response-time ms"));
app.use(express_1.default.json()); // parse json body
app.use(express_1.default.urlencoded({ extended: false })); // accept x-url-encoded
app.disable("x-powered-by"); // disable "powered by" header
app.use(routers_1.default);
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
