import * as EventTypes from '../../types/event';
import { CartProduct } from '../../types/common';
import { IProductCartView } from '../../types/view';

import { IEvents } from '../base/events';
import { ProductView } from './product';

export class ProductCartView
	extends ProductView<CartProduct>
	implements IProductCartView
{
	protected _productIndex: HTMLElement;

	constructor(element: HTMLElement, events: IEvents) {
		super(element, events);

		this._productIndex = element.querySelector('.basket__item-index');

		this._actionBtn.addEventListener('click', () => {
			this.events.emit(EventTypes.Cart.remove, { id: this._id });
		});
	}

	set productIndex(value: number) {
		this.setText(this._productIndex, value);
	}
}
