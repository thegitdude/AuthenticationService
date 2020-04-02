import { Router } from 'express';
import AuthMiddleware from '../service/authMiddleware';
import { HttpContext } from '../types/context';

export interface IRouter {
    registerRoutes(router: any): void 
}

export class BaseRouter {
    protected _context: HttpContext = null
    protected readonly _routePrefix: string
    private readonly _authMiddleware: AuthMiddleware

    constructor(routePrefix: string) {
        this._routePrefix = routePrefix
        this._authMiddleware = new AuthMiddleware()
    }

    addWithAuthorization = (router: Router, route: string, httpActionType: string, callback: Function, authRole: string = null) => {
        let executor: any = this.executeWithContextAsync
        if(authRole)
            executor = this.executeWithAuthAsync
        
        switch (httpActionType) {
            case 'GET':
                router.get(`${this._routePrefix}${route}`, (req, res, next, role = authRole) => executor(req, res, next, role), (req, res) => callback(req, res))
                break
            case 'POST':
                router.post(`${this._routePrefix}${route}`, (req, res, next, role = authRole) => executor(req, res, next, role), (req, res) => callback(req, res))
                break
            case 'PUT':
                router.put(`${this._routePrefix}${route}`, (req, res, next, role = authRole) => executor(req, res, next, role), (req, res) => callback(req, res))
                break
            case 'DELETE':
                router.delete(`${this._routePrefix}${route}`, (req, res, next, role = authRole) => executor(req, res, next, role), (req, res) => callback(req, res))
                break
        }
    }

    executeWithContextAsync = async (req, res, next) => {
        this._context = {
            req,
            res
        } as HttpContext
        
        next()
    }

    executeWithAuthAsync = async (req, res, next, role) => {
        this._context = {
            req,
            res
        } as HttpContext

        await this._authMiddleware.authAsync(req, res, next, role)
    }

    validateRequiredParam = (param: any, errorMessage: string) => {
        if(!param) {
            this.badRequest(errorMessage)
        }
    }

    executeWithHttpActionResult = async (action: any, failResponse: any = null) => {
        try {
            const result = await action()
            this.ok(result)
        } catch (error) {
            this.internalServerError(failResponse)
        }
    }

    ok = (response?: any) => {
        this.returnJsonWithHttpStatusCode(200, response || '')
    }

    badRequest = (response?: string) => {
        const message = 'Invalid request parameters.'
        this.returnJsonWithHttpStatusCode(400, response || message)
    }

    internalServerError = (response?: string) => {
        const message = 'Something went wrong.'
        this.returnJsonWithHttpStatusCode(500, response || message)
    }

    unauthorised = (response?: any) => {
        const message = 'You are not authorized to access the resource requested.'
        this.returnJsonWithHttpStatusCode(401, response || message)
    }

    returnJsonWithHttpStatusCode = (statusCode: number, response: any) => {
        this._context.res.setHeader('Content-Type', 'application/json')
        this._context.res.status(statusCode).send(JSON.stringify(response))
        this._context.res = null
    }
}