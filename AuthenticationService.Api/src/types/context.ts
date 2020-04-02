import { Request, ParamsDictionary, Response } from 'express-serve-static-core';

export interface HttpContext {
    req: Request<ParamsDictionary, any, any>,
    res: Response<any>
}