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
    }

    getUsersAsync = async (req, res) => {
        try {
            var result = await this._userService.getUsers()
            res.status(200).send(JSON.stringify(result));
        } catch(error) {
            res.send('fail');
        }
    }
}