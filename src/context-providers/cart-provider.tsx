/** @format */

import { randomUUID } from "expo-crypto";
import { createContext, PropsWithChildren, useContext, useState } from "react";
import { CartItem, Tables } from "../types";
import { useInsertOrder } from "../api-hooks/orders";
import { useRouter } from "expo-router";
import { useInsertOrderItems } from "../api-hooks/order-items";
import initializePaymentSheet, { openPaymentSheet } from "../lib/stripe";

type Product = Tables<"products">;

type CartType = {
	items: CartItem[];
	addItem: (product: Product, size: CartItem["size"]) => void;
	updateQuantity: (itemId: string, amount: 1 | -1) => void;
	total: number;
	checkout: () => void;
};

const CartContext = createContext<CartType>({
	items: [],
	addItem: () => {},
	updateQuantity: () => {},
	total: 0,
	checkout: () => {},
});

export default function CartProvider({ children }: PropsWithChildren) {
	const [items, setItems] = useState<CartItem[]>([]);

	const { mutate: insertOrder } = useInsertOrder();
	const { mutate: insertOrderItems } = useInsertOrderItems();
	const router = useRouter();

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

	function clearCart() {
		setItems([]);
	}

	async function checkout() {
		await initializePaymentSheet(Math.floor(total * 100));

		const payed = await openPaymentSheet();
		if (!payed) return;

		insertOrder(
			{ total },
			{
				onSuccess: saveOrderItems,
			}
		);
	}

	function saveOrderItems(order: Tables<"orders">) {
		const orderItems = items.map((cartItem) => ({
			order_id: order.id,
			product_id: cartItem.product_id,
			quantity: cartItem.quantity,
			size: cartItem.size,
		}));

		/* 
		insertOrderItems(
			{
				order_id: order.id,
				product_id: item1.product_id,
				quantity: item1.quantity,
				size: item1.size,
			},
			{ */

		insertOrderItems(orderItems, {
			onSuccess() {
				clearCart();
				router.push(`/(user)/orders/${order.id}`);
			},
		});
	}

	return (
		<CartContext.Provider
			value={{
				items,
				addItem,
				updateQuantity,
				total,
				checkout,
			}}>
			{children}
		</CartContext.Provider>
	);
}

export const useCart = () => useContext(CartContext);
