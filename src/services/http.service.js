import Axios from 'axios'


const BASE_URL = process.env.NODE_ENV === 'production'
    ? '/api/'
    : '//localhose:3030/api/'

const axios = Axios.create({
    withCredentials: true,
})

export const httpService = {
    get:    (endpoint, data) => ajax(endpoint, 'GET', data),
    post:   (endpoint, data) => ajax(endpoint, 'POST', data),
    put:    (endpoint, data) => ajax(endpoint, 'PUT', data),
    delete: (endpoint, data) => ajax(endpoint, 'DELETE', data),
}

async function ajax(endpoint, method='GET', data=null) {
    try {
        const res = await axios({
            url: `${BASE_URL}${endpoint}`,
            method,
            data,
            params: (method === 'GET') ? data : null,
        })
        return res.data
    } catch (err) {
        console.error(`Had issue ${method}ing to the backend, endpoint: ${endpoint}, with data:`, data)
        console.dir(err)
        if (err.response && err.response.status === 401) {
            sessionStorage.clear()
        }
        throw err
    }
}