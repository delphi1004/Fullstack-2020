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
