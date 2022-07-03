import { Router, Request, Response } from "express";

const welcomeRoute = Router();

welcomeRoute.get('/', (req: Request, res: Response) => {
    res.status(200).end('<h1>Bem-vindo a Biblioteca Poli Junior!</h1>');
});

export default welcomeRoute;