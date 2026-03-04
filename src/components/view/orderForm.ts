import * as EventTypes from '../../types/event';
import { PaymentType } from '../../types/common';
import { IOrderFormView, IOrderFormViewData } from '../../types/view';

import { IEvents } from '../base/events';
import { Form } from '../base/form';

export class OrderFormView
	extends Form<IOrderFormViewData>
	implements IOrderFormView
{
	protected _paymentBtns: NodeListOf<HTMLButtonElement>;

	constructor(element: HTMLFormElement, events?: IEvents) {
		super(element, events);

		this._paymentBtns = element.querySelectorAll('.button_alt');

		this._paymentBtns.forEach((button) => {
			button.addEventListener('click', () => {
				events.emit(EventTypes.Order.setValue, {
					payment: button.name,
				});
			});
		});

		this.element.addEventListener('submit', (evt) => {
			evt.preventDefault();
			events.emit(EventTypes.Order.submit);
		});

		this._formInputs.forEach((input) => {
			input.addEventListener('input', () => {
				events.emit(EventTypes.Order.setValue, {
					[input.name]: input.value,
				});
			});
		});
	}

	set payment(value: PaymentType) {
		this._paymentBtns.forEach((button) => {
			button.classList.toggle('button_alt-active', button.name === value);
		});
	}
}
