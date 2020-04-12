import https from 'axios'
import store from '../store/store'

const apiUri = 'http://localhost:3000/'

https.interceptors.request.use(config => {
    if (store.state.auth.user) {
        config.headers['Authorization'] = `Bearer ${store.state.auth.user.bearerToken}`
    }
    return config
})

https.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response.status === 401) {
        const config = error.config
        config.headers['Authorization'] = `Bearer ${store.state.auth.user.bearerToken}`
        return store.dispatch('auth/refreshToken', null, { root: true })
            .then(() => {
                return https.request(config)
            })
            .catch(() => Promise.reject(error))
    }
})

export function get(requestPath: string) {
    return https.get(`${apiUri}${requestPath}`)
    .then(response => {
        return response ? response.data : null
    })
    .catch(() => Promise.reject())
}

export async function getAsync(requestPath: string): Promise<any> {
    const response = await https.get(`${apiUri}${requestPath}`)
    return response ? response.data : null
}

export async function postAsync(requestPath: string, body?: any): Promise<any> {
    const config = {
        headers: {'Access-Control-Allow-Origin': '*'}
    };
    const result = await https.post(`${apiUri}${requestPath}`, body, config)
    return result ? result.data : null
}
