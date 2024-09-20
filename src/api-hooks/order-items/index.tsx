/** @format */

import { supabase } from "@/src/lib/supabase";
import { InsertTables } from "@/src/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useInsertOrderItems() {
	const queryClient = useQueryClient();

	return useMutation({
		async mutationFn(items: InsertTables<"order_items">[]) {
			const { data: newProduct, error } = await supabase
				.from("order_items")
				.insert(items)
				.select();

			if (error) {
				throw new Error(error.message);
			}

			return newProduct;
		},
	});
}
