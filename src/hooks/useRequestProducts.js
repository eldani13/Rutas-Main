import useSWR from "swr";
import {  processEnv } from "@/utils/cookies";

export function useRequestProducts() {
    const fetcher = (url) => fetch(url).then((res) => res.json());
    
    const { data, error } = useSWR(`${processEnv.back}request-products`, fetcher, {refreshInterval:1000});
    console.log(data);
    
    const requests = data ? data.details : null; 

    return {
        requests: requests,
        isLoading: !error && !data,
        isError: error,
    };
}