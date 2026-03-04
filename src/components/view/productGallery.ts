import { Product } from '../../types/common';

import { ProductExtendedView } from './productExtended';

export class ProductGalleryView extends ProductExtendedView<Product> {
	constructor(element: HTMLElement, protected onClick: () => void) {
		super(element);

		this.element.addEventListener('click', onClick);
	}
}
