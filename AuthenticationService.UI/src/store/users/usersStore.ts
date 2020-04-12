import { ActionTree, MutationTree } from 'vuex'
import { getAsync } from '@/server/adaptor'

const state = {
    users: [],
    user: {}
}

const mutations: MutationTree<any> = {
    setUsers(state: any, payload: any) {
        state.users = payload
    },
    setUser(state: any, payload: any) {
        state.user = payload
    }
}

const actions: ActionTree<any, any> = {
    async getUsers(context: any, payload: any) {
        const result = await getAsync('users')
        context.commit('setUsers', result)
    },

    async getUser(context: any, payload: string) {
        getAsync(`users/${payload}`)
        .then(result => {
            context.commit('setUser', result)
            context.dispatch('auth/getRoles', null, { root: true })
        })

    }
}

const usersStore = {
    state,
    actions,
    mutations,
    namespaced: true
}
export default usersStore