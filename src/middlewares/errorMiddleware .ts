

import { Request, Response, NextFunction } from 'express';
import { BusinessExceptions } from '../exceptions/BusinessExceptions';

export function ErrorMiddleware(error: any, req: Request, res: Response, next: NextFunction) {

    if (error instanceof BusinessExceptions) {

        return res.status(error.status).json({
            message: error.message,
            code: error.code
        });
    } else {
        if (error?.type == 'entity.parse.failed') {
            return res.status(400).send();
        }
        return res.status(500).json({
            message: "DESCULPE OCORREU UM ERRO!",
        });
    }
}