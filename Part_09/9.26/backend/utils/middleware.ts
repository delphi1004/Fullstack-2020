import { Request, Response, NextFunction } from 'express';

export function requestLogger(request: Request, _response: Response, next: NextFunction): void {
    console.log('Method:', request.method);
    console.log('Path:  ', request.path);
    console.log('Body:  ', request.body);
    console.log('---');
    next();
}

export function unknownEndpoint(_request: Request, response: Response): void {
    response.status(404).send({ error: 'unknown endpoint' });
}

export function errorHandler(error:Error, _request:Request, response:Response, next:NextFunction):any{

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' });
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message });
    } else if (error.name === 'JsonWebTokenError') {
        return response.status(401).json({
            error: 'invalid token'
        });
    }

    next(error);
}
