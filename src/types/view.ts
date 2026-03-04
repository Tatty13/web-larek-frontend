import { Contacts, Order, PaymentType } from './common';

export interface IView<DataType> {
	render(data?: DataType): HTMLElement;
}

export interface IMainPage {
	isLocked: boolean;
}

export interface IMainPageData {
	isLocked: boolean;
}

export interface ICatalogView {
	updateContent(elements: HTMLElement[]): void;
}

export interface IProductView {
	title: string;
	price: number;
}

export interface IProductExtendedView extends IProductView {
	image: string;
	category: string;
}

export interface IProductCartView extends IProductView {
	productIndex: number;
}

export interface IProductPreview extends IProductExtendedView {
	description: string;
	setIsDisabledAddBtn(disabled: boolean): void;
}

export interface IPopupView {
	content: HTMLElement;
	open(): void;
	close(): void;
}

export interface IPopupViewData {
	content: HTMLElement;
}

export interface IForm<
	DataType extends { inputValues: Record<string, string> }
> {
	inputValues: DataType['inputValues'];
	errors: string;
	setIsDisabledSubmitBtn(disabled: boolean): void;
}

export interface IFormData<DataType> {
	inputValues: DataType;
}

export interface IOrderFormView {
	payment: PaymentType;
}

export interface IOrderFormViewData extends IFormData<Pick<Order, 'address'>> {
	payment: PaymentType;
}

export interface IContactsFormViewData extends IFormData<Contacts> {
	inputValues: Contacts;
}

export interface ICartCounter {
	count: number;
}

export interface ICartCounterData {
	count: number;
}

export interface ICartView extends ICartViewData {
	setIsDisabledOrderBtn(disabled: boolean): void;
}

export interface ICartViewData {
	cartItems: HTMLElement[];
	totalPrice: number;
}

export interface ISuccess {
	totalPrice: number;
}

export interface ISuccessData {
	totalPrice: number;
}
