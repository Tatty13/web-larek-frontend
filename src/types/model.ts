import { Contacts, Id, Product } from './common';

export interface IProductModel {
	data: Product;
	getDetails(): void;
}

export interface ICatalogModel {
	items: Product[];
	setItems(items: Product[]): void;
	getProduct(id: Id): Product;
}

export interface ICartModel {
	items: Map<Id, number>;
	totalPrice: number;
	add(item: Product): void;
	remove(item: Product): void;
}

export interface IUserModel {
	address: string;
	contacts: Contacts;
}
