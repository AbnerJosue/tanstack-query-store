import { Product } from "../interfaces/product";
import { productsApi } from "./api/productsApi";

interface GetProductsOptions {
    filterKey?: string;
}

export const sleep = (seconds: number): Promise<boolean> => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(true);
        }, seconds * 1000);
    });
}

export const getProducts = async ({ filterKey }: GetProductsOptions) => {
    // await sleep(2);
    
    const filterUrl = (filterKey) ? `category=${filterKey}` : '';    
    
    const { data } = await productsApi.get<Product[]>(`/products?${ filterUrl }`);
    
    return data;
}

export const getProductById = async (id: number): Promise<Product> => {
    
    const { data } = await productsApi.get<Product>(`/products/${ id }`);
    
    return data;
}

export interface ProductLike {
  id?: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}


export const createProduct = async ( product: ProductLike ): Promise<Product> => {
    await sleep(5);

    const resp = await productsApi.post<Product>(`/products`, product);


    return resp.data;
}