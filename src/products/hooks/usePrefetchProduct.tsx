import { useQueryClient } from "@tanstack/react-query"
import { productsActions } from "..";

export function usePrefetchProduct() {
    const queryClient = useQueryClient();


    const preFetchProduct = (id: number) => {
        queryClient.prefetchQuery({
            queryKey: ['products', id],
            queryFn: () => productsActions.getProductById(id),
            staleTime: 1000 * 60 * 60,
        })
    }

    return preFetchProduct;
}
