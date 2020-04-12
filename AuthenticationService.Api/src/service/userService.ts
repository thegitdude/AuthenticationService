import { User, AuthenticationResponse, RegistrationRequest } from '../types/user'
import { UserStore } from '../firebase/context'
import JwtGenerator from './jwtGenerator'

export default class UserService {
    private _userStore = new UserStore()
    private _jwtGenerator = new JwtGenerator()

    public async signInAsync(email: string, password: string): Promise<AuthenticationResponse> {
        // get the user details for successfull signin
        const userDetails = await this._userStore.signInAsync(email, password)

        // build the token content object
        const tokenContent = {
            id: userDetails.id,
            email: userDetails.email,
            roles: userDetails.roles
        }

        // generate the bearer and refresh tokens
        const bearerToken = await this._jwtGenerator.getJwtTokenForUserResourcesAsync(tokenContent)
        const refreshToken = await this._jwtGenerator.getJwtRefreshToken(tokenContent);

        // update the refreshToken on the user document
        userDetails.refreshToken = refreshToken
        await this._userStore.updateUserAsync(userDetails.id, userDetails)

        return {
            bearerToken,
            refreshToken
        } as AuthenticationResponse
    }

    public async refreshAccessTokenAsync(currentRefreshToken: string): Promise<AuthenticationResponse> {
        // get the content of the refresh token
        // will throw exception if the token expired
        const content = await this._jwtGenerator.getVerifiedJwtAsync(currentRefreshToken)

        // get user details from the store
        const userDetails = await this._userStore.getUserAsync(content.data.id)

        // check if the refresh token has been revoked
        if(userDetails.refreshToken === currentRefreshToken) {
            // generate new bearer and refresh tokens
            const bearerToken = await this._jwtGenerator.getJwtTokenForUserResourcesAsync(userDetails)
            const refreshToken = await this._jwtGenerator.getJwtRefreshToken(userDetails);

            return {
                bearerToken,
                refreshToken
            } as AuthenticationResponse
        } else {
            // throw an error is the refresh token has been revoked
            throw new Error('Refresh token revoked!')
        }
    }

    public async getUsersAsync(): Promise<User[]> {
            return await this._userStore.getUsersAsync()
    }

    public async getUserAsync(id: string) {
        return await this._userStore.getUserAsync(id)
    }

    public getRoles() {
        return ['canReadUsers', 'canUpdateUsers', 'canDeleteUsers', 'canAddUsers', 'canAddApplications', 'role1', 'role2', 'role3', 'role4', 'role5']
    }

    public async updateUserAsync(id: string, user: User) {
        return await this._userStore.updateUserAsync(id, user)
    }

    public async registerUserAsync(request: RegistrationRequest): Promise<any> {
        return await this._userStore.addUserAsync(request);
    }

    public async resetPasswordAsync(email: string): Promise<void> {
        await this._userStore.resetPasswordAsync(email)
    }
}