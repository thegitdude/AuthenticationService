import { Router } from 'express';
import AuthMiddleware from '../service/authMiddleware';

export interface IRouter {
    registerRoutes(router: any): void 
}

export class BaseRouter {
    protected readonly _routePrefix
    private readonly _authMiddleware
    
    constructor(routePrefix: string) {
        this._routePrefix = routePrefix
        this._authMiddleware = new AuthMiddleware()
    }

    addWithAuthorization = (router: Router, route: string, httpActionType: string, callback: Function, authRole: string) => {
        switch (httpActionType) {
            case 'GET':
                router.get(`${this._routePrefix}${route}`, (req, res, next, role = authRole) => this._authMiddleware.authAsync(req, res, next, role), (req, res) => callback(req, res))
                break
            case 'POST':
                router.post(`${this._routePrefix}${route}`, (req, res, next, role = authRole) => this._authMiddleware.authAsync(req, res, next, role), (req, res) => callback(req, res))
                break
            case 'PUT':
                router.put(`${this._routePrefix}${route}`, (req, res, next, role = authRole) => this._authMiddleware.authAsync(req, res, next, role), (req, res) => callback(req, res))
                break
            case 'DELETE':
                router.delete(`${this._routePrefix}${route}`, (req, res, next, role = authRole) => this._authMiddleware.authAsync(req, res, next, role), (req, res) => callback(req, res))
                break
        }
    }
}