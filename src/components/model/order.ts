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

		this._changed();
	}

	get orderDetails(): Order {
		return this._orderDetails;
	}

	get isValidOrder(): boolean {
		return this._isValidPayment() && this._isValidAddress();
	}

	get errorMessage(): string {
		if (!this._isValidAddress()) {
			return 'Введите адрес доставки';
		}
		if (!this._isValidPayment()) {
			return 'Выберете способ доставки';
		}
		return '';
	}

	private _isValidPayment(): boolean {
		return Boolean(this._orderDetails.payment);
	}

	private _isValidAddress(): boolean {
		return Boolean(this._orderDetails.address);
	}

	reset() {
		this._orderDetails = {
			address: '',
			payment: undefined,
		};
		this._changed();
	}

	_changed() {
		this.events.emit(EventTypes.Order.change, {
			items: this._orderDetails,
		});
	}
}
