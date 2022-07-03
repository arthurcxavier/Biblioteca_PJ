//Error Handler básico
import { Request, Response } from "express";
import DatabaseError from "../model/errors/databaseErrorModel";

//Recebe os erros e avalia qual status retornar
function errorHandler(error: any, req: Request, res: Response) {
    if (error instanceof DatabaseError){
        res.status(400).json({erro: "UUID inexistente"}); //400 - Bad Request
    } else {
        res.status(500); //500 - Internal Server Error
    }
}

export default errorHandler;