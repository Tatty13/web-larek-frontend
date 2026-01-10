import * as EventTypes from '../../types/event';
import { ICartView, ICartViewData } from '../../types/view';
import { CURRENCY } from '../../utils/constants';

import { IEvents } from '../base/events';
import { BaseView } from '../base/baseView';

export class CartView extends BaseView<ICartViewData> implements ICartView {
	protected _cartListElement: HTMLUListElement;
	protected _totalPriceElement: HTMLElement;
	protected _actionBtn: HTMLButtonElement;

	constructor(element: HTMLElement, events: IEvents) {
		super(element, events);

		this._cartListElement = element.querySelector('.basket__list');
		this._totalPriceElement = element.querySelector('.basket__price');
		this._actionBtn = element.querySelector('.basket__button');
		this._actionBtn.disabled = true;

		this._actionBtn.addEventListener('click', () => {
			events.emit(EventTypes.Order.create);
		});
	}

	protected _getPriceText(price: number | null): string {
		if (!price) {
			return '';
		}

		return `${price} ${CURRENCY}`;
	}

	set cartItems(elements: HTMLElement[]) {
		if (!elements.length) {
			this.setText(this._cartListElement, 'Корзина пуста');
			return;
		}
		this._cartListElement.replaceChildren(...elements);
	}

	set totalPrice(value: number) {
		this.setText(this._totalPriceElement, this._getPriceText(value));
	}

	setIsDisabledOrderBtn(disabled: boolean) {
		this.setIsDisabled(this._actionBtn, disabled);
	}
}
