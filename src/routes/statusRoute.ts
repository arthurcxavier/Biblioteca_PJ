//Rota de teste da API
import { Router, Request, Response } from "express";

const statusRoute = Router();

statusRoute.get('/', (req: Request, res: Response) => {
    res.status(200).json({message: 'Bem-vindo a Biblioteca Poli Junior!'});
});

export default statusRoute;