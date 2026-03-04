import './scss/styles.scss';

import * as EventTypes from './types/event';
import { Contacts, ProductId, Order, Product } from './types/common';
import { CDN_URL } from './utils/constants';
import { cloneTemplate } from './utils/utils';

import { EventEmitter } from './components/base';
import { WebLarekApi } from './components/api';
import {
	CatalogModel,
	CartModel,
	OrderModel,
	ContactsModel,
} from './components/model';
import {
	MainPage,
	PopupView,
	CatalogView,
	CartCounter,
	CartView,
	ProductCartView,
	ProductPreview,
	ProductGalleryView,
	OrderFormView,
	ContactsFormView,
	SuccessView,
} from './components/view';

const pageContainer: HTMLBodyElement = document.querySelector('.page');

// Templates
const successTemplate: HTMLTemplateElement =
	pageContainer.querySelector('#success');
const catalogCardTemplate: HTMLTemplateElement =
	pageContainer.querySelector('#card-catalog');
const previewCardTemplate: HTMLTemplateElement =
	pageContainer.querySelector('#card-preview');
const cardBasketTemplate: HTMLTemplateElement =
	pageContainer.querySelector('#card-basket');
const cartTemplate: HTMLTemplateElement =
	pageContainer.querySelector('#basket');
const orderTemplate: HTMLTemplateElement =
	pageContainer.querySelector('#order');
const contactsTemplate: HTMLTemplateElement =
	pageContainer.querySelector('#contacts');

// Containers
const modalContainer: HTMLElement =
	pageContainer.querySelector('#modal-container');
const catalogContainer: HTMLElement = pageContainer.querySelector('.gallery');
const cartCounterContainer: HTMLElement =
	pageContainer.querySelector('.header__basket');

// инициализация
const api = new WebLarekApi({ cdn: CDN_URL });
const events = new EventEmitter();

const popup = new PopupView(modalContainer, events);
const mainPage = new MainPage(pageContainer);

const catalogModel = new CatalogModel(events);
const catalogView = new CatalogView(catalogContainer, events);

const productPreview = new ProductPreview(
	cloneTemplate(previewCardTemplate),
	events
);

const cartModel = new CartModel(events);
const cartView = new CartView(cloneTemplate(cartTemplate), events);
const cartCounter = new CartCounter(cartCounterContainer, events);

const orderModel = new OrderModel(events);
const orderView = new OrderFormView(cloneTemplate(orderTemplate), events);

const contactModel = new ContactsModel(events);
const contactsView = new ContactsFormView(
	cloneTemplate(contactsTemplate),
	events
);

const successView = new SuccessView(cloneTemplate(successTemplate), events);

api
	.getProductList()
	.then(catalogModel.setItems.bind(catalogModel))
	.catch((err: Error) => console.log(err));

events.on<{ items: Product[] }>(
	EventTypes.Catalog.change,
	({ items }: { items: Product[] }) => {
		const productCards = items.map((item) => {
			const productCard = new ProductGalleryView(
				cloneTemplate(catalogCardTemplate),
				() => {
					events.emit(EventTypes.Product.getDetails, { id: item.id });
				}
			);
			return productCard.render(item);
		});

		catalogView.updateContent(productCards);
	}
);

events.on<{ id: ProductId }>(EventTypes.Product.getDetails, ({ id }) => {
	const product = catalogModel.getProduct(id);
	const isProductInCart = cartModel.isItemInCart(id);
	productPreview.setIsDisabledAddBtn(isProductInCart);

	if (!isProductInCart) {
		productPreview.setAddToCartCallback(() => {
			events.emit(EventTypes.Cart.add, { id });
		});
	}

	const productPreviewElement = productPreview.render(product);
	popup.content = productPreviewElement;
	popup.open();
});

events.on(EventTypes.Modal.open, () => {
	mainPage.render({ isLocked: true });
});
events.on(EventTypes.Modal.close, () => {
	mainPage.render({ isLocked: false });
});

events.on<{ id: ProductId }>(EventTypes.Cart.add, ({ id }) => {
	const product = catalogModel.getProduct(id);
	cartModel.add(id, product.price);
});

events.on<{ id: ProductId }>(EventTypes.Cart.remove, ({ id }) => {
	const product = catalogModel.getProduct(id);
	cartModel.remove(id, product.price);
});

events.on<{ items: ProductId[] }>(EventTypes.Cart.change, ({ items }) => {
	cartCounter.render({ count: cartModel.itemsCount });
	cartView.setIsDisabledOrderBtn(!cartModel.itemsCount);

	const cartItems = items.map((id, idx) => {
		const product = catalogModel.getProduct(id);
		const productElement = new ProductCartView(
			cloneTemplate(cardBasketTemplate),
			() => {
				events.emit(EventTypes.Cart.remove, { id });
			}
		);

		return productElement.render({ ...product, productIndex: idx + 1 });
	});

	cartView.render({
		cartItems,
		totalPrice: cartModel.totalPrice,
	});
});

events.on(EventTypes.Cart.open, () => {
	popup.content = cartView.render();
	popup.open();
});

events.on(EventTypes.Order.create, () => {
	popup.content = orderView.render({
		inputValues: { address: orderModel.orderDetails.address },
		payment: orderModel.orderDetails.payment,
	});
});

events.on<Partial<Order>>(EventTypes.Order.setValue, (order) => {
	orderModel.orderDetails = order;
	if (order.payment) {
		orderView.payment = order.payment;
	}
});

events.on(EventTypes.Order.change, () => {
	const isValid = orderModel.isValidOrder;
	orderView.setIsDisabledSubmitBtn(!isValid);
	orderView.errors = orderModel.errorMessage;
});

events.on(EventTypes.Order.submit, () => {
	popup.content = contactsView.render({ inputValues: contactModel.contacts });
});

events.on(EventTypes.Contacts.change, () => {
	const isValid = contactModel.isValidContacts;
	contactsView.setIsDisabledSubmitBtn(!isValid);
	contactsView.errors = contactModel.errorMessage;
});

events.on<Partial<Contacts>>(EventTypes.Contacts.setValue, (contacts) => {
	contactModel.contacts = contacts;
});

events.on(EventTypes.Contacts.submit, async () => {
	try {
		const orderDetails = orderModel.orderDetails;
		const contacts = contactModel.contacts;

		await api.createOrder({
			email: contacts.email,
			phone: contacts.phone.replace(/[^\d+]/g, ''),
			payment: orderDetails.payment,
			address: orderDetails.address,
			total: cartModel.totalPrice,
			items: cartModel.itemsIds,
		});

		popup.content = successView.render({
			totalPrice: cartModel.totalPrice,
		});
	} catch (err) {
		popup.close();
		console.log('err while createOrder', err);
	} finally {
		[cartModel, orderModel, contactModel].forEach((model) => {
			model.reset();
		});
	}
});

events.on(EventTypes.Order.finish, () => {
	popup.close();
});
