import * as EventTypes from '../../types/event';
import { ICartCounter, ICartCounterData } from '../../types/view';

import { IEvents } from '../base/events';
import { BaseView } from '../base/baseView';

export class CartCounter
	extends BaseView<ICartCounterData>
	implements ICartCounter
{
	protected _countContainer: HTMLElement;

	constructor(element: HTMLElement, events: IEvents) {
		super(element, events);

		this._countContainer = element.querySelector('.header__basket-counter');

		this.element.addEventListener('click', () => {
			events.emit(EventTypes.Cart.open);
		});
	}

	set count(value: number) {
		this.setText(this._countContainer, value);
	}
}
