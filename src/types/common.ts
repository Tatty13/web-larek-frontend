export type ProductId = string;

export type PaymentType = 'card' | 'cash';

export type Contacts = {
	phone: string;
	email: string;
};

export type Product = {
	id: ProductId;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number | null;
};

export type CartProduct = Product & {
	productIndex: number;
};

export type Order = {
	payment: PaymentType;
	address: string;
};
