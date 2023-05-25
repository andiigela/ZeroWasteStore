﻿import axios, { AxiosResponse } from "axios";
import { request } from "http";

axios.defaults.baseURL = "http://localhost:5280/api/";

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.put(url).then(responseBody)
};

const Catalog = {
    list: () => requests.get('Products'),
    details: (id: number) => requests.get(`Products/${id}`)
};

const TestErrors = {
    get400Error: () => requests.get('Buggy/bad-request'),
    get401Error: () => requests.get('Buggy/unauthorized'),
    get404Error: () => requests.get('Buggy/not-found'),
    get500Error: () => requests.get('Buggy/server-error'),
    getValidationError: () => requests.get('Buggy/validation-error'),
}

const agent = {
    Catalog,
    TestErrors
}
export default agent;