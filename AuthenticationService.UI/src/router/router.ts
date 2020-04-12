import VueRouter from 'vue-router'
import App from '../App.vue'
import Login from '../pages/Login.vue'
import Users from '../pages/Users.vue'
import User from '../pages/User.vue'
import NotFound from '../pages/NotFound.vue'

import store from '../store/store'

const router = new VueRouter({
    routes: [
        { path: '/', component: App },
        { path: '*', component: NotFound },
        { path: '/login', component: Login },
        { path: '/users', component: Users, meta: { requireLogin: true }},
        { path: '/users/:id', component: User, meta: { requireLogin: true }}
    ]
})

router.beforeEach((to: any, from: any, next: any) => {
    if (!to.meta.requireLogin) {
        next()
    } else {
        if (store.state.auth.user.bearerToken) {
            next()
        } else {
            next('/login')
        }
    }
})

export default router