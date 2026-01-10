import { ProductId } from '../../types/common';
import { cardCategoryMap, CURRENCY } from '../../utils/constants';

import { IEvents } from '../base/events';
import { BaseView } from '../base/baseView';
import { IProductView } from '../../types/view';

export class ProductView<DataType>
	extends BaseView<DataType>
	implements IProductView
{
	protected _cardImage: HTMLImageElement;
	protected _cardCategory: HTMLElement;
	protected _cardTitle: HTMLElement;
	protected _cardPrice: HTMLElement;
	protected _cardText: HTMLElement;
	protected _actionBtn: HTMLButtonElement;
	protected _id: string;

	constructor(element: HTMLElement, events: IEvents) {
		super(element, events);

		this._cardImage = this.element.querySelector('.card__image');
		this._cardCategory = this.element.querySelector('.card__category');
		this._cardTitle = this.element.querySelector('.card__title');
		this._cardPrice = this.element.querySelector('.card__price');
		this._cardText = this.element.querySelector('.card__text');
		this._actionBtn = this.element.querySelector('.card__button');
	}

	_getPriceText(price: number | null) {
		if (price === null) {
			return 'Бесценно';
		}

		return `${price} ${CURRENCY}`;
	}

	set id(value: ProductId) {
		this._id = value;
	}

	set image(src: string) {
		this.setImage(this._cardImage, src);
	}

	set title(value: string) {
		this.setText(this._cardTitle, value);
		this.setElementAttribute(this._cardImage, 'alt', value);
	}

	set category(value: string) {
		this.setText(this._cardCategory, value);
		if (this._cardCategory) {
			this._cardCategory.classList.add(
				`card__category_${cardCategoryMap[value]}`
			);
		}
	}

	set description(value: string) {
		this.setText(this._cardText, value);
	}

	set price(value: number) {
		this.setText(this._cardPrice, this._getPriceText(value));
	}
}
