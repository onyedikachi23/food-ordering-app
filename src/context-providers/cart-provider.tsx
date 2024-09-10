/** @format */

import { createContext, PropsWithChildren, useContext, useState } from "react";
import { CartItem, Product } from "../types";
import { randomUUID } from "expo-crypto";

type CartType = {
	items: CartItem[];
	addItem: (product: Product, size: CartItem["size"]) => void;
	updateQuantity: (itemId: string, amount: 1 | -1) => void;
	total: number;
};

const CartContext = createContext<CartType>({
	items: [],
	addItem: () => {},
	updateQuantity: () => {},
	total: 0,
});

export default function CartProvider({ children }: PropsWithChildren) {
	const [items, setItems] = useState<CartItem[]>([]);

	function addItem(product: Product, size: CartItem["size"]) {
		const existItem = items.find(
			(item) => item.product === product && item.size === size
		);

		if (existItem) {
			updateQuantity(existItem.id, 1);
			return;
		}

		const newCartItem: CartItem = {
			id: randomUUID(),
			product,
			product_id: product.id,
			size,
			quantity: 1,
		};

		setItems([newCartItem, ...items]);
	}

	function updateQuantity(itemId: string, amount: 1 | -1) {
		const updatedItems = items
			.map((item) => {
				if (item.id != itemId) {
					return item;
				} else {
					return { ...item, quantity: item.quantity + amount };
				}
			})
			.filter((item) => item.quantity > 0);

		setItems(updatedItems);
	}

	const total = items.reduce(
		(sum, item) => (sum += item.product.price * item.quantity),
		0
	);

	return (
		<CartContext.Provider
			value={{
				items,
				addItem,
				updateQuantity,
				total,
			}}>
			{children}
		</CartContext.Provider>
	);
}

export const useCart = () => useContext(CartContext);
