import { Contacts, ProductId, Product, Order } from './common';

export interface ICatalogModel {
	setItems(items: Product[]): void;
	getProduct(id: ProductId): Product;
}

export interface ICartModel {
	add(id: ProductId, price: number): void;
	remove(id: ProductId, price: number): void;
	isItemInCart(id: ProductId): boolean;
	reset(): void;
}

export interface IUserModel {
	address: string;
	contacts: Contacts;
}

export interface IContactsModel {
	contacts: Contacts;
	errorMessage: string;
	isValidContacts: boolean;
	isValidPhone: boolean;
	isValidateEmail: boolean;
	reset(): void;
}

export interface IOrderModel {
	orderDetails: Order;
	isValidOrder: boolean;
	errorMessage: string;
	reset(): void;
}
