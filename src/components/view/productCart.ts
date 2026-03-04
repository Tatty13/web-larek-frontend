import { CartProduct } from '../../types/common';
import { IProductCartView } from '../../types/view';

import { ProductView } from './product';

export class ProductCartView
	extends ProductView<CartProduct>
	implements IProductCartView
{
	protected _productIndex: HTMLElement;
	protected _actionBtn: HTMLButtonElement;

	constructor(element: HTMLElement, protected onDelete: () => void) {
		super(element);

		this._productIndex = element.querySelector('.basket__item-index');
		this._actionBtn = this.element.querySelector('.card__button');

		this._actionBtn.addEventListener('click', onDelete);
	}

	set productIndex(value: number) {
		this.setText(this._productIndex, value);
	}
}
