import { CURRENCY } from '../../utils/constants';

import { IEvents } from '../base/events';
import { BaseView } from '../base/baseView';
import { IProductView } from '../../types/view';

export class ProductView<DataType>
	extends BaseView<DataType>
	implements IProductView
{
	protected _cardTitle: HTMLElement;
	protected _cardPrice: HTMLElement;

	constructor(element: HTMLElement, events?: IEvents) {
		super(element, events);

		this._cardTitle = this.element.querySelector('.card__title');
		this._cardPrice = this.element.querySelector('.card__price');
	}

	protected _getPriceText(price: number | null): string {
		if (price === null) {
			return 'Бесценно';
		}

		return `${price} ${CURRENCY}`;
	}

	set title(value: string) {
		this.setText(this._cardTitle, value);
	}

	set price(value: number) {
		this.setText(this._cardPrice, this._getPriceText(value));
	}
}
