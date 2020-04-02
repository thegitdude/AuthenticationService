import { Router } from "express-serve-static-core";
import { IRouter, BaseRouter } from "./baseRouter";
import UserService from "../service/userService";

export default class UserRouter extends BaseRouter implements IRouter {
    private readonly _userService = new UserService()

    constructor() {
        super('/users')
    }

    registerRoutes = (router: Router) => {
        this.addWithAuthorization(router, '', 'GET', this.getUsersAsync, 'canReadUsers')

        this.addWithAuthorization(router, '/:userId', 'GET', this.getUserAsync, 'canReadUsers')
   
        this.addWithAuthorization(router, '/:userId', 'PUT', this.updateUserAsync, 'canUpdateUsers')
    }

    getUsersAsync = async () => {
        await this.executeWithHttpActionResult(async () => await this._userService.getUsersAsync());
    }

    getUserAsync = async () => {
        const userId = this._context.req.params.userId
        this.validateRequiredParam(userId, 'Invalid user id provided.')

        await this.executeWithHttpActionResult(async () => await this._userService.getUserAsync(userId))
    }

    updateUserAsync = async () => {
        const userId = this._context.req.params.userId
        const user = this._context.req.body
        this.validateRequiredParam(userId, 'Invalid user id provided.')
        this.validateRequiredParam(user, 'Invalid user provided.')
        
        await this.executeWithHttpActionResult(async () => await this._userService.updateUserAsync(userId, user))
    }
}