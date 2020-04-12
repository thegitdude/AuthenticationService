import Vue from 'vue'
import Vuex from 'vuex'

import usersStore from './users/usersStore'
import authStore from './auth/authStore'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        auth: authStore,
        users: usersStore
    },
    state: {
        appName: 'Authentication Service',
        version: '1.0.0'
    }
})