import { NextFunction, Request, Response, Router } from "express";
import bookRepository from "../repositories/bookRepository";

const routes = Router();

//Rota para mostrar todos os livros do banco de dados
routes.get('/livros', async (req: Request, res: Response) => {
    const books = await bookRepository.findAllBooks();
    res.status(200).json(books);
});

//Rota para mostrar um livro especifico do banco de dados a partir do ID
routes.get('/livro/:uuid', async (req: Request<{uuid: string}>, res: Response, next: NextFunction) => {
    try {
        const uuid = req.params.uuid;
        const book = await bookRepository.findBookById(uuid);

        res.status(200).json(book);
    } catch (error) {
        next(error);
    }
});

//Rota para pesquisar livros pelo nome ou primeiras letras
//EX: http://localhost:3000/livros/mem --> Retorna todos os livros que comecam com as letras 'mem'
routes.get('/livros/:nome', async (req: Request<{nome: string}>, res: Response, next: NextFunction) => {
    try {
        const nome = req.params.nome;
        const book = await bookRepository.findBookByName(nome);

        res.status(200).json(book);
    } catch (error) {
        next(error);
    }
});

/*Adiciona livros no banco de dados seguindo o modelo:
    {
        "nome": "---",
        "autor": "---",
        "ano_publicacao": "---"
    }
*/
routes.post('/livros', async (req: Request, res: Response) => {
    const newBook = req.body;
    const uuid = await bookRepository.sendBook(newBook);

    return res.status(201).json({message: `Novo livro de id: ${uuid} adicionado com sucesso`})
});

//Atualiza um livro especifico do banco de dados a partir do ID
routes.put('/livro/:uuid', async (req: Request<{uuid: string}>, res: Response) => {
    const uuid = req.params.uuid;
    const modifiedBook = req.body;

    modifiedBook.uuid = uuid;

    await bookRepository.updateBook(modifiedBook);

    res.status(200).json({message: 'Livro atualizado com sucesso'});
});


//Deleta um livro especifico do banco de dados a partir do ID
routes.delete('/livro/:uuid', async (req: Request<{uuid: string}>, res: Response) => {
    const uuid = req.params.uuid;

    await bookRepository.deleteBook(uuid);

    res.status(200).json({message: "Livro removido do banco de dados com sucesso"})
});

export default routes
