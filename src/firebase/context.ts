import firebase from 'firebase'
import { User, RegistrationRequest } from '../types/user'

export class UserStore {
    private readonly _collectionName = 'userDetails'
    private readonly _store = firebase.firestore().collection

    public async signInAsync(email: string, password: string): Promise<User> {
        // sign in with the firebise auth store
        const signInResult = await firebase.auth().signInWithEmailAndPassword(email, password)
        const authUser = signInResult.user

        // get the user details
        const user = await this.getUserAsync(authUser.uid)
        if(user.deleted) {
            throw new Error('The user account has been deleted.')
        } else {
            return user
        }
    }

    public async getUsersAsync(): Promise<User[]> {
        const result = await firebase.firestore().collection(this._collectionName).get()
        return result.docs.map<User>(x => {
            const user = x.data()
            user.id = x.id
            return user as User
        })
    }

    public async getUserAsync(id: string): Promise<User> {
        const result = await firebase.firestore().collection(this._collectionName).doc(id).get()
        const userDetails = result.data() as User
        userDetails.id = id

        return userDetails
    }

    public async updateUserAsync(id: string, user: User) {
        return await firebase.firestore().collection(this._collectionName).doc(id).update({ "refreshToken": user.refreshToken, "roles": user.roles })
    }

    public async deleteUser(id: string) {
        return await this._store(this._collectionName).doc(id).update({ "deleted": true})
    }

    public async addUserAsync(request: RegistrationRequest): Promise<string> {
        // add the user to the firebase auth store
        const result = await firebase.auth().createUserWithEmailAndPassword(request.user.email, request.password)

        // add the resulted user uid to the user details object
        const user = request.user

        // store the user details object
        await firebase.firestore().collection(this._collectionName).doc(result.user.uid).set(user)

        return user.id
    }

    public async resetPasswordAsync(email: string): Promise<void> {
        await firebase.auth().sendPasswordResetEmail(email)
    }
}

export class AuthRolesStore {
    private readonly _collectionName: string = 'authRoles'

    public async getAuthRoles(): Promise<any[]> {
        let result = await firebase.firestore().collection(this._collectionName).get()
        return result.docs[0].data().roles;
    }

    public async addAuthRole(role: string): Promise<any> {
        const id = 'Nnvu3xMeBfRNlltnADhN' 
        return await firebase.database().ref(`${this._collectionName}/${id}/roles`).push(role)
    }
}