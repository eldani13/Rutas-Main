import useSWR from "swr";
import {  processEnv } from "@/utils/cookies";

export function useViewProducts() {

    const fetcher = (url) => fetch(url).then((res) => res.json());
    const { data, error } = useSWR(`${processEnv.back}view-products`, fetcher);
    console.log(data);

    const products = data ? data.details : null; // Verificar si data está definido antes de acceder a 'details'

    return {
        products: products,
        isLoading: !error && !data,
        isError: error,
    };
}