import * as EventTypes from '../../types/event';
import { ProductId } from '../../types/common';
import { ICartModel } from '../../types/model';

import { IEvents } from '../base/events';

export class CartModel implements ICartModel {
	protected _items: ProductId[] = [];
	protected _totalPrice = 0;

	constructor(protected events: IEvents) {}

	get totalPrice(): number {
		return this._totalPrice;
	}

	get itemsCount(): number {
		return this._items.length;
	}

	get itemsIds(): ProductId[] {
		return this._items;
	}

	isItemInCart(id: ProductId): boolean {
		return this._items.includes(id);
	}

	add(id: ProductId, price: number) {
		if (this.isItemInCart(id)) return;
		this._items.push(id);
		this._totalPrice += price;
		this._changed();
	}

	remove(id: ProductId, price: number) {
		this._items = this._items.filter((itemId) => itemId !== id);
		this._totalPrice -= price;
		this._changed();
	}

	reset() {
		this._items = [];
		this._totalPrice = 0;
		this._changed();
	}

	private _changed() {
		this.events.emit(EventTypes.Cart.change, {
			items: this._items,
		});
	}
}
