import axios from "axios";

const BASE_URL = "https://truenorth-hector-ocampo-production.up.railway.app/api/v1/";

const API = axios.create({
  baseURL: BASE_URL,
});

API.interceptors.request.use(
    async config => {
        const token = sessionStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token;
            config.headers['Access-Control-Allow-Origin'] = '*';
            config.headers['Access-Control-Allow-Credentials'] = 'true'
        }else{
            config.headers['Access-Control-Allow-Origin'] = '*';
            config.headers['Access-Control-Allow-Credentials'] = 'true'
        }
        return config
    },
    err => Promise.reject(err)
)

export default API;