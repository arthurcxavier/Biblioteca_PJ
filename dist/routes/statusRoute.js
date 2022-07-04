"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const statusRoute = (0, express_1.Router)();
statusRoute.get('/', (req, res) => {
    res.status(200).json({ message: 'Bem-vindo a Biblioteca Poli Junior!' });
});
exports.default = statusRoute;
