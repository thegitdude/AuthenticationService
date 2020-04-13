import { HttpContext } from '../types/context';

export default class HttpContextHelper {
    public context: HttpContext = null

    constructor(context: HttpContext) {
        this.context = context
    }

    executeWithHttpActionResult = async (action: any, failResponse: any = null) => {
        try {
            const result = await action()
            this.ok(result)
        } catch (error) {
            this.internalServerError(failResponse)
        }
    }

    validateRequiredParam = (param: any, errorMessage: string) => {
        if(!param) {
            this.badRequest(errorMessage)
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
        this.context.res.setHeader('Content-Type', 'application/json')
        this.context.res.status(statusCode).send(JSON.stringify(response))
    }
}