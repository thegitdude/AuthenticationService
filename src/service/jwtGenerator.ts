import * as jwt from 'jsonwebtoken'
import { User } from '../types/user'

export default class JwtGenerator {
    private _secretKey: string = '288502b9-d8b2-4767-ae0a-9f3f520c8b30'

    public async getJwtTokenForUserResourcesAsync(content: any): Promise<any> {
        return await jwt.sign(
            {
                exp: Math.floor(Date.now() / 1000) + (1 * 60), // 15 min expiration
                data: content
            }, this._secretKey)
    }

    public async getJwtRefreshToken(content: any): Promise<any> {
        return await jwt.sign(
            {
                exp: Math.floor(Date.now() / 1000) + (30 * 24 * 60 * 60), // 30 day expiration
                data: {
                    id: content.id,
                    email: content.email
                }
            }, this._secretKey
        )
    }

    public async getVerifiedJwtAsync(token: string) {
        return await jwt.verify(token, this._secretKey)
    }
}