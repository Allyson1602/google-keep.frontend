import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from "axios";
import { ELocalStorage } from "./enums/local-storage.enum";

export type IResponse<T> = Promise<AxiosResponse<T>>;

const initializeAxios = (config: AxiosRequestConfig): AxiosInstance => {
    return axios.create(config);
};

const authKeyStorage = localStorage.getItem(ELocalStorage.AUTH_KEY);

const initialConfig: AxiosRequestConfig = {
    baseURL: 'http://localhost:3000',
    responseType: 'json',
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': authKeyStorage ? `Bearer ${authKeyStorage}` : undefined
    }
};

const axiosInstance = initializeAxios(initialConfig);

export interface IApiRestClient {
    get: <T>(url: string, queryParams?: object) => IResponse<T>;

    post: <T>(url: string, body: object, queryParams?: object) => IResponse<T>;

    put: <T>(url: string, body: object, queryParams?: object) => IResponse<T>;

    patch: <T>(url: string, body: object, queryParams?: object) => IResponse<T>;

    delete: <T>(url: string, id:number) => IResponse<T>;
}

class ApiRestClient implements IApiRestClient {
    get = <T>(url: string, queryParams?: object): IResponse<T> => {
        return axiosInstance.get<T>(url, { params: queryParams });
    }

    post = <T>(url: string, body: object, queryParams?: object): IResponse<T> => {
        return axiosInstance.post<T>(url, body, { params: queryParams });
    }

    put = <T>(url: string, body: object, queryParams?: object): IResponse<T> => {
        return axiosInstance.put<T>(url, body, { params: queryParams });
    }

    patch = <T>(url: string, body: object, queryParams?: object): IResponse<T> => {
        return axiosInstance.patch<T>(url, body, { params: queryParams });
    }

    delete = <T>(url: string, id: number | string): IResponse<T> => {
        return axiosInstance.delete<T>(`${url}/${id}` );
    }
}

export default ApiRestClient;
