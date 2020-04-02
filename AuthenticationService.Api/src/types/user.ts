export interface User {
    id: string,
    email: string,
    createdDateTime: Date
    name: string,
    roles: string [],
    refreshToken: string,
    deleted: boolean
}

export interface RegistrationRequest {
    user: User,
    password: string
}

export interface AuthenticationResponse {
    bearerToken: string,
    refreshToken: string
}