import { IRouter, BaseRouter } from "./baseRouter";
import UserService from "../service/userService";

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

    registerUserAsync = async () => {
        await this.executeWithHttpActionResult(async () => await this._userService.registerUserAsync(this._context.req.body))
    }

    signInAsync = async () => {
        const username = this._context.req.body.username
        const password = this._context.req.body.password
        this.validateRequiredParam(username, 'Please provide a username.')
        this.validateRequiredParam(password, 'Please provide a password.')

        try {
            const authResponse = await this._userService.signInAsync(username, password)
            this.ok(authResponse)
        } catch (err) {
            this.unauthorised('SignIn failed!')
        }
    }

    refreshTokenAsync = async () => {
        const refreshToken = this._context.req.body.refreshToken
        this.validateRequiredParam(refreshToken, 'Please provide a refreshToken.')

        try {
            const token = await this._userService.refreshAccessTokenAsync(refreshToken)
            console.log(token)
            this.ok(token)
        } catch (err) {
            this.unauthorised('SignIn failed!')
        }
    }

    resetPasswordAsync = async () => {
        const email = this._context.req.body.email
        this.validateRequiredParam(email, 'Please provide an email address')

        this.executeWithHttpActionResult(async () => await this._userService.resetPasswordAsync(email))
    }

    getRoles = () => {
        try {
            this.ok(this._userService.getRoles())
        } catch (err) {
            this.unauthorised('SignIn failed!')
        }
    }
}