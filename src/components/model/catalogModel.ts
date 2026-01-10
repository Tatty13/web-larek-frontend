import * as EventTypes from '../../types/event';
import { ProductId, Product } from '../../types/common';
import { ICatalogModel } from '../../types/model';

import { IEvents } from '../base/events';

export class CatalogModel implements ICatalogModel {
	protected _items: Product[] = null;

	constructor(protected events: IEvents) {}

	setItems(items: Product[]) {
		this._items = items;
		this.#changed();
	}

	getProduct(id: ProductId): Product {
		if (!this._items) return null;
		return this._items.find((item) => item.id === id);
	}

	#changed() {
		this.events.emit(EventTypes.Catalog.change, {
			items: this._items,
		});
	}
}
