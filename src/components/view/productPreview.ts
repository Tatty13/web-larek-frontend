import { Product } from '../../types/common';
import { IProductPreview } from '../../types/view';

import { IEvents } from '../base/events';
import { ProductExtendedView } from './productExtended';

export class ProductPreview
	extends ProductExtendedView<Product>
	implements IProductPreview
{
	protected _cardText: HTMLElement;
	protected _actionBtn: HTMLButtonElement;
	private _addToCartCallback: () => void;

	constructor(element: HTMLElement, events: IEvents) {
		super(element, events);

		this._cardText = this.element.querySelector('.card__text');
		this._actionBtn = this.element.querySelector('.card__button');

		this.handleAddToCart = this.handleAddToCart.bind(this);
		this._actionBtn.addEventListener('click', this.handleAddToCart);
	}

	set price(value: number) {
		if (!value) {
			this.setIsDisabledAddBtn(true);
		}
		super.price = value;
	}

	set description(value: string) {
		this.setText(this._cardText, value);
	}

	setAddToCartCallback(callback: () => void) {
		this._addToCartCallback = callback;
	}

	private handleAddToCart() {
		if (this._addToCartCallback) {
			this._addToCartCallback();
			this.setIsDisabledAddBtn(true);
		}
	}

	setIsDisabledAddBtn(disabled: boolean) {
		this.setIsDisabled(this._actionBtn, disabled);
	}
}
