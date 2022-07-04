"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bookRepository_1 = __importDefault(require("../repositories/bookRepository"));
const routes = (0, express_1.Router)();
routes.get('/livros', async (req, res) => {
    const books = await bookRepository_1.default.findAllBooks();
    res.status(200).json(books);
});
routes.get('/livro/:uuid', async (req, res, next) => {
    try {
        const uuid = req.params.uuid;
        const book = await bookRepository_1.default.findBookById(uuid);
        res.status(200).json(book);
    }
    catch (error) {
        next(error);
    }
});
routes.get('/livros/:nome', async (req, res, next) => {
    try {
        const nome = req.params.nome;
        const book = await bookRepository_1.default.findBookByName(nome);
        res.status(200).json(book);
    }
    catch (error) {
        next(error);
    }
});
routes.post('/livros', async (req, res) => {
    const newBook = req.body;
    const uuid = await bookRepository_1.default.sendBook(newBook);
    return res.status(201).json({ message: `Novo livro de id: ${uuid} adicionado com sucesso` });
});
routes.put('/livro/:uuid', async (req, res) => {
    const uuid = req.params.uuid;
    const modifiedBook = req.body;
    modifiedBook.uuid = uuid;
    await bookRepository_1.default.updateBook(modifiedBook);
    res.status(200).json({ message: 'Livro atualizado com sucesso' });
});
routes.delete('/livro/:uuid', async (req, res) => {
    const uuid = req.params.uuid;
    await bookRepository_1.default.deleteBook(uuid);
    res.status(200).json({ message: "Livro removido do banco de dados com sucesso" });
});
exports.default = routes;
