"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.get("*", (req, res, next) => {
    console.log("Request hit.");
    res.send("Request.");
});
app.listen(1709, () => {
    console.log("Server is running.");
});
