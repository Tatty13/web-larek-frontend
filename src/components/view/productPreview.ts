import * as EventTypes from '../../types/event';
import { Product } from '../../types/common';
import { IProductPreview } from '../../types/view';

import { IEvents } from '../base/events';
import { ProductView } from './product';

export class ProductPreview
	extends ProductView<Product>
	implements IProductPreview
{
	constructor(element: HTMLElement, events: IEvents) {
		super(element, events);

		this._actionBtn.addEventListener('click', () => {
			this.events.emit(EventTypes.Cart.add, { id: this._id });
			this.setIsDisabledAddBtn(true);
		});
	}

	set price(value: number) {
		if (!value) {
			this.setIsDisabledAddBtn(true);
		}
		super.price = value;
	}

	setIsDisabledAddBtn(disabled: boolean) {
		this.setIsDisabled(this._actionBtn, disabled);
	}
}
