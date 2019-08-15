export const API_URL = 'https://localhost:8000/api/v1/';

import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import JwtService from '@/services/jwt-service';

const ApiService = {
    init() {
        Vue.use(VueAxios, axios);
        Vue.axios.defaults.baseURL = API_URL;
    },

    setHeader() {
        Vue.axios.defaults.headers.common.Authorization = `Bearer ${JwtService.getToken()}`;
    },

    query(resource: any, params: any) {
        this.setHeader();
        return Vue.axios.get(resource, params).catch((error) => {
            throw new Error(`[RWV] ApiService ${error}`);
        });
    },

    get(resource: any, slug = '') {
        this.setHeader();
        return Vue.axios.get(`${resource}/${slug}`).catch((error) => {
            throw new Error(`[RWV] ApiService ${error}`);
        });
    },

    post(resource: any, params: any) {
        this.setHeader();
        return Vue.axios.post(`${resource}`, params);
    },

    update(resource: any, slug: any, params: any) {
        this.setHeader();
        return Vue.axios.put(`${resource}/${slug}`, params);
    },

    put(resource: any, params: any) {
        this.setHeader();
        return Vue.axios.put(`${resource}`, params);
    },

    delete(resource: any) {
        this.setHeader();
        return Vue.axios.delete(resource).catch((error) => {
            throw new Error(`[RWV] ApiService ${error}`);
        });
    },
};

export default ApiService;
