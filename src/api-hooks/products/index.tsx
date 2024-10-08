/** @format */

import { supabase } from "@/src/lib/supabase";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useProductsList() {
	return useQuery({
		queryKey: ["products"],
		queryFn: async () => {
			const { data, error } = await supabase.from("products").select("*");

			if (error) {
				throw new Error(error.message);
			}

			return data;
		},
	});
}

export function useProduct(id: number) {
	return useQuery({
		queryKey: ["products", id],
		queryFn: async () => {
			const { data, error } = await supabase
				.from("products")
				.select("*")
				.eq("id", id)
				.single();

			if (error) {
				throw new Error(error.message);
			}

			return data;
		},
	});
}

export function useInsertProduct() {
	const queryClient = useQueryClient();

	return useMutation({
		async mutationFn(data: any) {
			const { data: newProduct, error } = await supabase
				.from("products")
				.insert({
					name: data.name,
					image: data.image,
					price: data.price,
				})
				.single();

			if (error) {
				throw new Error(error.message);
			}

			return newProduct;
		},
		async onSuccess() {
			await queryClient.invalidateQueries(["products"]);
		},
	});
}

export function useUpdateProduct() {
	const queryClient = useQueryClient();

	return useMutation({
		async mutationFn(data: any) {
			const { data: updatedProduct, error } = await supabase
				.from("products")
				.update({
					name: data.name,
					image: data.image,
					price: data.price,
				})
				.eq("id", data.id)
				.select()
				.single();

			if (error) {
				throw new Error(error.message);
			}

			return updatedProduct;
		},
		async onSuccess(_, { id }) {
			await queryClient.invalidateQueries(["products"]);
			await queryClient.invalidateQueries(["products", id]);
		},
	});
}

export function useDeleteProduct() {
	const queryClient = useQueryClient();

	return useMutation({
		async mutationFn(id: number) {
			await supabase.from("products").delete().eq("id", id);
		},
		async onSuccess() {
			await queryClient.invalidateQueries(["products"]);
		},
	});
}
