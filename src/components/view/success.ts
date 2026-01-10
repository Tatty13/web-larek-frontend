import * as EventTypes from '../../types/event';
import { ISuccess, ISuccessData } from '../../types/view';
import { CURRENCY } from '../../utils/constants';

import { IEvents } from '../base/events';
import { BaseView } from '../base/baseView';

export class SuccessView extends BaseView<ISuccessData> implements ISuccess {
	protected _title: HTMLElement;
	protected _description: HTMLElement;
	protected _closeBtn: HTMLButtonElement;

	constructor(element: HTMLElement, events: IEvents) {
		super(element, events);

		this._title = element.querySelector('.order-success__title');
		this._description = element.querySelector('.order-success__description');
		this._closeBtn = element.querySelector('.order-success__close');

		this._closeBtn.addEventListener('click', () => {
			events.emit(EventTypes.Order.finish);
		});
	}

	set totalPrice(value: number) {
		this.setText(this._description, `Списано ${value} ${CURRENCY}`);
	}
}
