//Repositorio de comandos do banco de dados
import db from "../database/db";
import Book from "../model/bookModel";
import DatabaseError from "../model/errors/databaseErrorModel";

class bookRepository {

    //Comando para mostrar todos os livros 
    async findAllBooks(): Promise<Book[]> {

        //Variável com o comando em SQL
        const query = `
        SELECT * FROM biblioteca_pj
        `;

        const {rows} = await db.query<Book>(query); //Realiza-se uma query no BD e são retornadas todas as colunas requisitadas
        return rows || [];
    }

    //Comando para mostrar um livro especifico a partir do seu ID
    async findBookById(uuid: string): Promise<any> {

        //Realiza-se um try...catch para lidar com possiveis erros na busca por ID
        try {

            //Variável com o comando em SQL
            const query = `
            SELECT nome, autor, ano_publicacao
            FROM biblioteca_pj
            WHERE uuid = $1
            `;

            const values = [uuid]; //Parâmetro para a busca especifica

            const { rows } = await db.query<Book>(query, values); //Realiza-se uma query no BD e são retornadas todas as colunas do ID requisitado 
            const [ book ] = rows;

            return book || [];

        } catch (error) {
            throw new DatabaseError('Erro na consulta por ID', error);
        }
    }

    //Comando para mostrar os livros através do nome
    async findBookByName(nome: string): Promise<any> {

        //Realiza-se um try...catch para lidar com possiveis erros na busca por nome
        try {

            //Variável com o comando em SQL
            const query = `
            SELECT nome, autor, ano_publicacao
            FROM biblioteca_pj 
            WHERE nome ILIKE '${nome}%'`; //A porcentagem indica que após o parâmetro 'nome' informado pode haver qualquer outra letra/nome

            const { rows } = await db.query<Book>(query); //Realiza-se uma query no BD e são retornadas todas as colunas que possuem nome/iniciais iguais à informada

            return rows || [];
        } catch (error) {
            throw new DatabaseError('Erro na consulta por nome', error);
        }
    }

    //Comando para adicionar livros no banco de dados
    async sendBook(book: Book): Promise<string> {

        //Variável com o comando em SQL
        const query = `
            INSERT INTO biblioteca_pj (
                nome,
                autor,
                ano_publicacao
            )
            VALUES ($1, $2, $3)
            RETURNING uuid
        `;

        const values = [book.nome, book.autor, book.ano_publicacao]; //Parâmetros para a inserção no BD

        const { rows } = await db.query<{ uuid: string }>(query, values); //Realiza-se uma query no BD e é retornado o ID do livro adicionado
        const [ newBook ] = rows;

        return newBook.uuid;
    }

    //Comando para atualizar livros do banco de dados a partir do ID
    async updateBook(book: Book): Promise<void> {

        //Variável com o comando em SQL
        const query = `
            UPDATE biblioteca_pj
            SET
                nome = $1,
                autor = $2,
                ano_publicacao = $3
            WHERE uuid = $4
        `;

        const values = [book.nome, book.autor, book.ano_publicacao, book.uuid]; //Parâmetros para a atualização

        await db.query(query, values); //Realiza-se uma query no BD e nada é retornado
    }

    //Comando para deletar livros do banco de dados a partir do ID
    async deleteBook(uuid: string): Promise<void> {

        //Variável com o comando em SQL
        const query = `
            DELETE FROM biblioteca_pj
            WHERE uuid = $1
        `;

        const values = [uuid]; //ID para a deleção do livro específico

        await db.query(query, values); //Realiza-se uma query no BD e nada é retornado
    }
}

export default new bookRepository();
