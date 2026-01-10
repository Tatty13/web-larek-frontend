import { Product } from '../../types/common';
import { ICatalogView } from '../../types/view';

import { BaseView } from '../base/baseView';

export class CatalogView extends BaseView<Product[]> implements ICatalogView {
	updateContent(elements: HTMLElement[]) {
		this.element.replaceChildren(...elements);
	}
}
