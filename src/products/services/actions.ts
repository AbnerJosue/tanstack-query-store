import { Product } from "../interfaces/product";
import { productsApi } from "./api/productsApi";

interface GetProductsOptions {
    filterKey?: string;
}

const sleep = (seconds: number): Promise<boolean> => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(true);
        }, seconds * 1000);
    });
}

export const getProducts = async ({ filterKey }: GetProductsOptions) => {
    await sleep(2);
    
    const filterUrl = (filterKey) ? `category=${filterKey}` : '';    
    
    const { data } = await productsApi.get<Product[]>(`/products?${ filterUrl }`);
    
    return data;
}

export const getProductById = async (id: number): Promise<Product> => {
    
    const { data } = await productsApi.get<Product>(`/products/${ id }`);
    
    return data;
}