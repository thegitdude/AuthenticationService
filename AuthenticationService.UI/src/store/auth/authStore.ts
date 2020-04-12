import { ActionTree, MutationTree, GetterTree } from 'vuex'
import { postAsync, getAsync } from '@/server/adaptor'
import router from '../../router/router'

const state = {
    user: {},
    roles: []
}
const mutations: MutationTree<any> = {
    loadUser(state) {
        const authUser = JSON.parse(localStorage.getItem('authUser') || '{}')
        state.user = authUser
    },
    setUser(state, payload) {
        state.user = payload
        localStorage.setItem('authUser', JSON.stringify(payload))
    },
    setUsers(state, payload) {
        state.users = payload
    },
    setRoles(state, payload) {
        state.roles = payload
    }
}

const actions: ActionTree<any, any> = {
    async signIn(context, payload: any) {
        const user = await postAsync('authentication/signin', { username: payload.username, password: payload.password })
        if (user) {
            context.commit('setUser', user)
            router.push('/users')
        }
    },
    signOut(context) {
        context.commit('setUser', {})
        router.push('/login')
    },
    async register(context, payload: any) {
        const user = postAsync('authentication/register', { username: payload.username, password: payload.password })
        context.commit('setUser', user)
    },
    async resetPassword(emailAddress: any): Promise<void> {
        return postAsync('authentication/resetPassword', { emailAddress })
    },
    async refreshToken(context: any, payload: any) {
        const response = await postAsync('authentication/refreshToken', { refreshToken: context.state.user.refreshToken })
        context.commit('setUser', response)
        return response
    },
    getRoles(context: any, payload: any) {
        getAsync('authentication/roles')
        .then(roles => context.commit('setRoles', roles))
    }
}

const getters: GetterTree<any, any> = {
    isSignedIn(state: any) {
        return state.user.bearerToken && state.user.refreshToken
    }
}

const authStore = {
    state,
    actions,
    mutations,
    getters,
    namespaced: true
}
export default authStore