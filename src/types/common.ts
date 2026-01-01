export type Id = string;

export type PaymentType = 'online' | 'uponReceipt';

export type Contacts = {
	phone: string;
	email: string;
};

export type Product = {
	id: Id;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number | null;
};

export type Order = Contacts & {
	payment: PaymentType;
	address: string;
	total: number;
	items: string[];
};
