"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../database/db"));
const databaseErrorModel_1 = __importDefault(require("../model/errors/databaseErrorModel"));
class bookRepository {
    async findAllBooks() {
        const query = `
        SELECT uuid, nome, autor, ano_publicacao
        FROM biblioteca_pj
        `;
        const { rows } = await db_1.default.query(query);
        return rows || [];
    }
    async findBookById(uuid) {
        try {
            const query = `
            SELECT nome, autor, ano_publicacao
            FROM biblioteca_pj
            WHERE uuid = $1
            `;
            const values = [uuid];
            const { rows } = await db_1.default.query(query, values);
            const [book] = rows;
            return book || [];
        }
        catch (error) {
            throw new databaseErrorModel_1.default('Erro na consulta por ID', error);
        }
    }
    async findBookByName(nome) {
        try {
            const query = `
            SELECT nome, autor, ano_publicacao
            FROM biblioteca_pj 
            WHERE nome ILIKE '${nome}%'`;
            const { rows } = await db_1.default.query(query);
            return rows || [];
        }
        catch (error) {
            throw new databaseErrorModel_1.default('Erro na consulta por nome', error);
        }
    }
    async sendBook(book) {
        const query = `
            INSERT INTO biblioteca_pj (
                nome,
                autor,
                ano_publicacao
            )
            VALUES ($1, $2, $3)
            RETURNING uuid
        `;
        const values = [book.nome, book.autor, book.ano_publicacao];
        const { rows } = await db_1.default.query(query, values);
        const [newBook] = rows;
        return newBook.uuid;
    }
    async updateBook(book) {
        const query = `
            UPDATE biblioteca_pj
            SET
                nome = $1,
                autor = $2,
                ano_publicacao = $3
            WHERE uuid = $4
        `;
        const values = [book.nome, book.autor, book.ano_publicacao, book.uuid];
        await db_1.default.query(query, values);
    }
    async deleteBook(uuid) {
        const query = `
            DELETE FROM biblioteca_pj
            WHERE uuid = $1
        `;
        const values = [uuid];
        await db_1.default.query(query, values);
    }
}
exports.default = new bookRepository();
