import { useQuery } from "@tanstack/react-query"
import { productsActions } from "..";

interface Options {
    id: number;
}

export function useProduct({ id }: Options) {
    const { isLoading, isError, error, data: product, isFetching } = useQuery({
        queryKey: ['products', id],
        queryFn: () => productsActions.getProductById(id),
        staleTime: 1000 * 60 * 60,
    })


    return {
        isLoading,
        isError,
        error,
        isFetching,
        product,
    }
}
