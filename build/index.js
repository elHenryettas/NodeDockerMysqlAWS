"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ip_1 = __importDefault(require("ip"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const PORT = process.env.SERVERPORT || 3000;
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: "*" }));
app.use(express_1.default.json());
app.get("/", (_req, res) => {
    res.send({ massage: "up" });
});
app.listen(PORT, () => {
    console.log(`Server running on ${ip_1.default.address()}:${PORT}`);
});
