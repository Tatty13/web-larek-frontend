import * as EventTypes from '../../types/event';
import { Product } from '../../types/common';

import { IEvents } from '../base/events';
import { ProductView } from './productView';

export class ProductGalleryView extends ProductView<Product> {
	constructor(element: HTMLElement, events: IEvents) {
		super(element, events);

		this.element.addEventListener('click', () => {
			this.events.emit(EventTypes.Product.getDetails, { id: this._id });
		});
	}
}
