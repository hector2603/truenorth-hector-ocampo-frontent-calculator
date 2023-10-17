import axios from "axios";
import { getSession } from "next-auth/react";

const BASE_URL = "https://truenorth-hector-ocampo-production.up.railway.app/api/v1/";

const API = axios.create({
  baseURL: BASE_URL,
});

API.interceptors.request.use(
    async config => {
        config.headers['Access-Control-Allow-Origin'] = '*';
        config.headers['Access-Control-Allow-Credentials'] = 'true';
        config.headers['Access-Control-Allow-Methods'] = 'GET,PUT,POST,DELETE,PATCH,OPTIONS';
        return config;
    },
    err => Promise.reject(err)
)

export default API;