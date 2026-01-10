import * as EventTypes from '../../types/event';
import { Order } from '../../types/common';
import { IOrderModel } from '../../types/model';

import { IEvents } from '../base/events';

export class OrderModel implements IOrderModel {
	protected _orderDetails: Order = {
		address: '',
		payment: undefined,
	};

	constructor(protected events: IEvents) {}

	set orderDetails(details: Partial<Order>) {
		this._orderDetails = {
			...this._orderDetails,
			...details,
		};

		this.#changed();
	}

	get orderDetails(): Order {
		return this._orderDetails;
	}

	get isValidOrder(): boolean {
		return (
			Boolean(this._orderDetails.payment) && Boolean(this._orderDetails.address)
		);
	}

	get errorMessage(): string {
		if (!this._orderDetails.address) {
			return 'Введите адрес доставки';
		}
		if (!this._orderDetails.payment) {
			return 'Выберете способ доставки';
		}
		return '';
	}

	reset() {
		this._orderDetails = {
			address: '',
			payment: undefined,
		};
		this.#changed();
	}

	#changed() {
		this.events.emit(EventTypes.Order.change, {
			items: this._orderDetails,
		});
	}
}
