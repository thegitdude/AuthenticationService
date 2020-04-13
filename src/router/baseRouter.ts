import { Router } from 'express';
import AuthMiddleware from '../service/authMiddleware';
import HttpContextHelper from './httpContextHelper'
import { HttpContext } from '../types/context';

export interface IRouter {
    registerRoutes(router: any): void
}

export class BaseRouter {
    protected readonly _routePrefix: string
    private readonly _authMiddleware: AuthMiddleware

    constructor(routePrefix: string) {
        this._routePrefix = routePrefix
        this._authMiddleware = new AuthMiddleware()
    }

    addWithAuthorization = async (router: Router, route: string, httpActionType: string, callback: Function, authRole: string = null) => {
        let executor: any = (req, res, next) => next()
        if(authRole)
            executor = await this.executeWithAuthAsync

        switch (httpActionType) {
            case 'GET':
                router.get(`${this._routePrefix}${route}`, (req, res, next, role = authRole) => executor(req, res, next, role), (req, res) => this.withCallbackWrapper(req, res, callback))
                break
            case 'POST':
                router.post(`${this._routePrefix}${route}`, (req, res, next, role = authRole) => executor(req, res, next, role), (req, res) => this.withCallbackWrapper(req, res, callback))
                break
            case 'PUT':
                router.put(`${this._routePrefix}${route}`, (req, res, next, role = authRole) => executor(req, res, next, role), (req, res) => this.withCallbackWrapper(req, res, callback))
                break
            case 'DELETE':
                router.delete(`${this._routePrefix}${route}`, (req, res, next, role = authRole) => executor(req, res, next, role), (req, res) => this.withCallbackWrapper(req, res, callback))
                break
        }
    }

    withCallbackWrapper = (req, res, callbackFunc: Function) => {
        const httpContext: HttpContext = {
            req,
            res
        }

        const httpContextHelper = new HttpContextHelper(httpContext)
        callbackFunc(httpContextHelper)
    }

    executeWithAuthAsync = async (req, res, next, role) => {
        await this._authMiddleware.authAsync(req, res, next, role)
    }
}