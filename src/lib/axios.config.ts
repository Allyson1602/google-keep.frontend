import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from "axios";

export type IResponse<T> = Promise<AxiosResponse<T>>;

const initializeAxios = (config: AxiosRequestConfig): AxiosInstance => {
    return axios.create(config);
};

const initialConfig: AxiosRequestConfig = {
    baseURL: 'http://localhost:3006',
    responseType: 'json',
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
    }
};

const axiosInstance = initializeAxios(initialConfig);

export interface IApiRestClient {
    get: <T>(url: string, queryParams?: object) => IResponse<T>;

    post: <T>(url: string, body: object, queryParams?: object) => IResponse<T>;

    put: <T>(url: string, body: object, queryParams?: object) => IResponse<T>;

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

    delete = <T>(url: string, id: number): IResponse<T> => {
        return axiosInstance.delete<T>(`${url}/${id}` );
    }
}

export default ApiRestClient;
