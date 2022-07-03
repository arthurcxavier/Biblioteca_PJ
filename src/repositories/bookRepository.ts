import db from "../database/db";
import Book from "../model/bookModel";
import DatabaseError from "../model/errors/databaseErrorModel";

class bookRepository {
    async findAllBooks(): Promise<Book[]> {
        const query = `
        SELECT uuid, nome, autor, ano_publicacao
        FROM biblioteca_pj
        `;

        const {rows} = await db.query<Book>(query);
        return rows || [];
    }

    async findBookById(uuid: string): Promise<any> {
        try {
            const query = `
            SELECT nome, autor, ano_publicacao
            FROM biblioteca_pj
            WHERE uuid = $1
            `;

            const values = [uuid];

            const { rows } = await db.query<Book>(query, values);
            const [ book ] = rows;

            return book || [];

        } catch (error) {
            throw new DatabaseError('Erro na consulta por ID', error);
        }
    }

    async sendBook(book: Book): Promise<string> {
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

        const { rows } = await db.query<{ uuid: string }>(query, values);
        const [ newBook ] = rows;
        return newBook.uuid;
    }

    async updateBook(book: Book): Promise<void> {
        const query = `
            UPDATE biblioteca_pj
            SET
                nome = $1,
                autor = $2,
                ano_publicacao = $3
            WHERE uuid = $4
        `;

        const values = [book.nome, book.autor, book.ano_publicacao, book.uuid];

        await db.query(query, values);
    }

    async deleteBook(uuid: string): Promise<void> {
        const query = `
            DELETE FROM biblioteca_pj
            WHERE uuid = $1
        `;

        const values = [uuid];

        await db.query(query, values);
    }
}

export default new bookRepository();
