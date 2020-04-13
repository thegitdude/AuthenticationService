import { Router } from "express-serve-static-core";
import { IRouter, BaseRouter } from "./baseRouter";
import UserService from "../service/userService";
import HttpContextHelper from '../router/httpContextHelper'

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

    getUsersAsync = async (helper: HttpContextHelper) => {
        await helper.executeWithHttpActionResult(async () => await this._userService.getUsersAsync());
    }

    getUserAsync = async (helper: HttpContextHelper) => {
        const userId = helper.context.req.params.userId
        helper.validateRequiredParam(userId, 'Invalid user id provided.')

        await helper.executeWithHttpActionResult(async () => await this._userService.getUserAsync(userId))
    }

    updateUserAsync = async (helper: HttpContextHelper) => {
        const userId = helper.context.req.params.userId
        const user = helper.context.req.body
        helper.validateRequiredParam(userId, 'Invalid user id provided.')
        helper.validateRequiredParam(user, 'Invalid user provided.')

        await helper.executeWithHttpActionResult(async () => await this._userService.updateUserAsync(userId, user))
    }
}