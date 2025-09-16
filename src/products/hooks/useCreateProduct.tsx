import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Product, productsActions } from '..'

export default function useCreateProduct() {
    const queryClient = useQueryClient();

    const productMutation = useMutation({
        mutationKey: ['createProduct'],
        mutationFn: productsActions.createProduct,
        onMutate: (product) => {
            console.log("Mutando - Optimistic Update")

            // optimistic product
            const optimisticProduct = { id: Math.random(), ...product, rating: { rate: 0, count: 0 } }
            // Almacenar el producto en la cache del query client
            queryClient.setQueryData<Product[]>(
                ['products', { filterKey: product.category }],
                (old) => {
                    if (!old) return [optimisticProduct];

                    return [...old, optimisticProduct];
                }
            )

            return { optimisticProduct }
        },
        onSuccess: (data, variables, context) => {

            console.log({ data, variables, context })

            // queryClient.invalidateQueries({
            //     queryKey: ['products',
            //         { filterKey: data.category }]
            // })

            queryClient.removeQueries({
                queryKey: ['products', context.optimisticProduct.id]
            })

            queryClient.setQueryData<Product[]>(
                ['products', { filterKey: data.category }],
                (old) => {
                    if (!old) return [data];

                    return old.map(cacheProduct => {
                        return cacheProduct.id === context?.optimisticProduct.id ? data : cacheProduct;
                    })
                }
            )
        },
        onError: (error, variables, context) => {
            console.log({ error, variables, context });

            // optimistic error

            queryClient.removeQueries({
                queryKey: ['products', context?.optimisticProduct.id]
            });

            queryClient.setQueryData<Product[]>(
                ['proudcts', { filterKey: variables.category }],
                (old) => {
                    if (!old) return [];

                    return old.filter(cacheProduct => cacheProduct.id !== context?.optimisticProduct.id);
                }
            )



        }
    })


    return {
        productMutation
    }
}
