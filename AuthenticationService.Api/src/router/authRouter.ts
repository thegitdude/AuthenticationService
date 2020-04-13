import { IRouter, BaseRouter } from "./baseRouter";
import UserService from "../service/userService";
import HttpContextHelper from '../router/httpContextHelper'

export default class AuthRouter extends BaseRouter implements IRouter {
    private readonly _userService = new UserService()

    constructor() {
        super('/authentication')
    }

    registerRoutes = (router: any) => {
        this.addWithAuthorization(router, `/register`, 'POST', this.registerUserAsync)

        this.addWithAuthorization(router, `/signin`, 'POST', this.signInAsync)

        this.addWithAuthorization(router, `/refreshToken`, 'POST', this.refreshTokenAsync)

        this.addWithAuthorization(router, `/roles`, 'GET', this.getRoles)
    }

    registerUserAsync = async (helper: HttpContextHelper) => {
        await helper.executeWithHttpActionResult(async () => await this._userService.registerUserAsync(helper.context.req.body))
    }

    signInAsync = async (helper: HttpContextHelper) => {
        const username = helper.context.req.body.username
        const password = helper.context.req.body.password

        helper.validateRequiredParam(username, 'Please provide a username.')
        helper.validateRequiredParam(password, 'Please provide a password.')

        try {
            const authResponse = await this._userService.signInAsync(username, password)
            helper.ok(authResponse)
        } catch (err) {
            helper.unauthorised('SignIn failed!')
        }
    }

    refreshTokenAsync = async (helper: HttpContextHelper) => {
        const refreshToken = helper.context.req.body.refreshToken
        helper.validateRequiredParam(refreshToken, 'Please provide a refreshToken.')

        try {
            const token = await this._userService.refreshAccessTokenAsync(refreshToken)

            helper.ok(token)
        } catch (err) {
            helper.unauthorised('SignIn failed!')
        }
    }

    resetPasswordAsync = async (helper: HttpContextHelper) => {
        const email = helper.context.req.body.email
        helper.validateRequiredParam(email, 'Please provide an email address')

        helper.executeWithHttpActionResult(async () => await this._userService.resetPasswordAsync(email))
    }

    getRoles = (helper: HttpContextHelper) => {
        try {
            helper.ok(this._userService.getRoles())
        } catch (err) {
            helper.unauthorised('SignIn failed!')
        }
    }
}