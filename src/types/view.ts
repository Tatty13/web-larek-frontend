import { Product } from './common';

export interface IView<T> {
	render(data?: T): HTMLElement;
}

export interface IPopupView<T> extends IView<T> {
	content: IView<T>;
	open(): void;
	close(): void;
}

export interface IProductView {
	render(item: Product): void;
}

export interface ICatalogView {
	render(items: Product[]): void;
}

export interface ICartView {
	render(items: Product[]): void;
}
