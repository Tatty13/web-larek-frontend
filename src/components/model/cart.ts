import * as EventTypes from '../../types/event';
import { ProductId } from '../../types/common';
import { ICartModel } from '../../types/model';

import { IEvents } from '../base/events';

export class CartModel implements ICartModel {
	protected _items: Map<ProductId, number> = new Map();
	protected _totalPrice = 0;
	protected _itemsCount = 0;

	constructor(protected events: IEvents) {}

	get totalPrice(): number {
		return this._totalPrice;
	}

	get itemsCount(): number {
		return this._itemsCount;
	}

	get itemsIds(): ProductId[] {
		return Array.from(this._items.keys());
	}

	isItemInCart(id: ProductId): boolean {
		return this._items.has(id);
	}

	add(id: ProductId, price: number) {
		if (!this._items.has(id)) this._items.set(id, 0);
		this._items.set(id, this._items.get(id) + 1);
		this._totalPrice += price;
		this._itemsCount++;
		this.#changed();
	}

	remove(id: ProductId, price: number) {
		if (!this._items.has(id)) return;
		const amount = this._items.get(id);
		if (amount === 1) {
			this._items.delete(id);
		} else {
			this._items.set(id, amount - 1);
		}
		this._totalPrice -= price;
		this._itemsCount--;
		this.#changed();
	}

	reset() {
		this._items = new Map();
		this._totalPrice = 0;
		this._itemsCount = 0;

		this.#changed();
	}

	#changed() {
		this.events.emit(EventTypes.Cart.change, {
			items: Array.from(this._items.keys()),
		});
	}
}
