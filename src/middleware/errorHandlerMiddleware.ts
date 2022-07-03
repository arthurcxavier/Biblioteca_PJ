import { Request, Response } from "express";
import DatabaseError from "../model/errors/databaseErrorModel";

function errorHandler(error: any, req: Request, res: Response) {
    if (error instanceof DatabaseError){
        res.status(400).json({erro: "UUID inexistente"});
    } else {
        res.status(500);
    }
}

export default errorHandler;