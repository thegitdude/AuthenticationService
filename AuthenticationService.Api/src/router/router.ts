import { Router } from 'express';
import AuthRouter from './authRouter';
import UserRouter from './userRouter';

export default function registerRoutes(router: Router) {
    router.get('/', async(req, res)=> {
        res.send('Authorization service v 1.1.0')
    })

    const authRouter = new AuthRouter()
    authRouter.registerRoutes(router)
    const userRouter = new UserRouter()
    userRouter.registerRoutes(router)
}