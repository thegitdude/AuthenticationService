import { IRouter, BaseRouter } from "./baseRouter";
import UserService from "../service/userService";

export default class AuthRouter extends BaseRouter implements IRouter {
    private readonly _userService = new UserService()

    constructor() {
        super('/authentication')
    }

    registerRoutes = (router: any) => {
        router.post(`${this._routePrefix}/register`, async (req, res) => this.registerAsync(req, res))       
        
        router.post(`${this._routePrefix}/signin`, async (req, res) => this.signInAsync(req,res))
        
        router.post(`${this._routePrefix}/refreshToken`, async (req, res) => this.refreshTokenAsync(req, res))
    }

    registerAsync = async (req, res) => {
        try {
            const result = await this._userService.registerUserAsync(req.body)
            res.status(200).send(result)
        } catch(error) {
            res.status(500).send(`Message: ${error}`);
        }
    }

    signInAsync = async (req, res) => {
        try {
            var token = await this._userService.signIn(req.body.username, req.body.password)
            res.status(200).send(token)
        } catch (err) {
            res.status(401).send('SignIn failed!')
        }
    }

    refreshTokenAsync = async (req, res) => {
        try {
            const userService = new UserService()
            var token = await userService.signIn(req.body.username, req.body.password)
            res.status(200).send(token)
        } catch (err) {
            res.status(401).send('SignIn failed!')
        } 
    }
}