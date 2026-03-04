import { IProductExtendedView } from '../../types/view';
import { cardCategoryMap } from '../../utils/constants';

import { IEvents } from '../base/events';
import { ProductView } from './product';

export class ProductExtendedView<DataType>
	extends ProductView<DataType>
	implements IProductExtendedView
{
	protected _cardImage: HTMLImageElement;
	protected _cardCategory: HTMLElement;

	constructor(element: HTMLElement, events?: IEvents) {
		super(element, events);

		this._cardImage = this.element.querySelector('.card__image');
		this._cardCategory = this.element.querySelector('.card__category');
	}

	set image(src: string) {
		this.setImage(this._cardImage, src);
	}

	set category(value: string) {
		this.setText(this._cardCategory, value);
		if (this._cardCategory) {
			this._cardCategory.classList.add(
				`card__category_${cardCategoryMap[value]}`
			);
		}
	}

	set title(value: string) {
		super.title = value;
		this.setElementAttribute(this._cardImage, 'alt', value);
	}
}
