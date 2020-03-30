import firebase, { firestore } from 'firebase'
import { User, RegistrationRequest } from '../types/user'

export class UserStore {
    private readonly _collectionName = 'userDetails'

    public async signIn(email: string, password: string): Promise<User> {
        // sign in with the firebise auth store
        let signInResult = await firebase.auth().signInWithEmailAndPassword(email, password)
        const authUser = signInResult.user

        // get the user details
        return await this.getUserDetails(authUser.uid)
    }

    public async getUsers(): Promise<User[]> {
        let result = await firebase.firestore().collection(this._collectionName).get()
        return result.docs.map<User>(x => { 
            let user = x.data()
            user.id = x.id
            return user as User
        })
    }

    public async getUserDetails(id: string): Promise<User> {
        let result = await firebase.firestore().collection(this._collectionName).doc(id).get()
        let userDetails = result.data() as User
        userDetails.id = id

        return userDetails
    }

    public async addUser(request: RegistrationRequest): Promise<string> {
        // add the user to the firebase auth store
        const result = await firebase.auth().createUserWithEmailAndPassword(request.user.email, request.password)
        
        // add the resulted user uid to the user details object
        let user = request.user

        // store the user details object
        await firebase.firestore().collection(this._collectionName).doc(result.user.uid).set(user)

        return user.id
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