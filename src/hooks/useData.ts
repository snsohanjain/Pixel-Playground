import { useState, useEffect } from "react";
import apiClient from "../services/api-client";
import { AxiosRequestConfig } from "axios";

export interface FetchResponse<T>{
    count:number;
    results: T[];
}

export const useData = <T>(endpoint: string, requestConfig?: AxiosRequestConfig, deps?: any[]) => {
    const [data, setData] = useState<T[]>([]);
    const [error, setError] = useState("");
    const [isLoading, setLoading] = useState(false);

   
    useEffect(() => {
        const controller = new AbortController();
        setLoading(true);
      apiClient
        .get<FetchResponse<T>>(endpoint, {signal: controller.signal, ...requestConfig})
        .then((res) => {setData(res.data.results);
            setLoading(false);
    })
        .catch((err) => {setError(err.message);
            setLoading(false);
        });
    }, deps ? [...deps] : []);
    return {data, error, isLoading};

}