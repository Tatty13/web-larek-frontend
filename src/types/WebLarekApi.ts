import { Order, Product } from './common';

export type CreateOrderResponse = {
	id: string;
	total: number;
};

export interface IWebLarekApi {
	getProductById: (id: Product['id']) => Promise<Product>;
	getProductList: () => Promise<Product[]>;
	createOrder: (order: Order) => Promise<CreateOrderResponse>;
}
