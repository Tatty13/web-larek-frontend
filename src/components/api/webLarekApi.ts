import { Product } from '../../types/common';
import {
	CreateOrderRequest,
	CreateOrderResponse,
	IWebLarekApi,
} from '../../types/WebLarekApi';
import { API_URL } from '../../utils/constants';

import { Api, ApiListResponse } from '../base/api';

export class WebLarekApi extends Api implements IWebLarekApi {
	protected _cdn: string;

	constructor({ options = {}, cdn }: { options?: RequestInit; cdn: string }) {
		super(API_URL, options);
		this._cdn = cdn;

		this._prepareProduct = this._prepareProduct.bind(this);
	}

	protected _prepareProduct(product: Product): Product {
		return {
			...product,
			image: `${this._cdn}${product.image}`,
		};
	}

	getProductById(id: Product['id']) {
		return this.get(`/product/${id}`).then(this._prepareProduct);
	}

	getProductList() {
		return this.get(`/product`).then((data: ApiListResponse<Product>) =>
			data.items.map(this._prepareProduct)
		);
	}

	createOrder(order: CreateOrderRequest) {
		return this.post('/order', order) as Promise<CreateOrderResponse>;
	}
}
