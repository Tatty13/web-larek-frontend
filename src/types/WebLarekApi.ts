import { Product, ProductId, PaymentType } from './common';

export type CreateOrderRequest = {
	payment: PaymentType;
	email: string;
	phone: string;
	address: string;
	total: number;
	items: ProductId[];
};

export type CreateOrderResponse = {
	id: string;
	total: number;
};

export interface IWebLarekApi {
	getProductById: (id: Product['id']) => Promise<Product>;
	getProductList: () => Promise<Product[]>;
	createOrder: (order: CreateOrderRequest) => Promise<CreateOrderResponse>;
}
