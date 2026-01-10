import * as EventTypes from '../../types/event';
import { IPopupView, IPopupViewData } from '../../types/view';

import { IEvents } from '../base/events';
import { BaseView } from '../base/baseView';

export class PopupView extends BaseView<IPopupViewData> implements IPopupView {
	protected _closeBtn: HTMLButtonElement;
	protected _modalContent: HTMLElement;

	constructor(element: HTMLElement, events: IEvents) {
		super(element, events);

		this._closeBtn = element.querySelector('.modal__close');
		this._modalContent = element.querySelector('.modal__content');

		this._handleEscClose = this._handleEscClose.bind(this);
		this._handleOverlayClose = this._handleOverlayClose.bind(this);
		this.close = this.close.bind(this);
	}

	set content(value: HTMLElement) {
		this._modalContent.replaceChildren(value);
	}

	protected _handleEscClose(evt: KeyboardEvent) {
		if (evt.code === 'Escape') this.close();
	}

	protected _handleOverlayClose(evt: MouseEvent) {
		if (evt.target === this.element) {
			this.close();
		}
	}

	protected _setListeners() {
		this._closeBtn.addEventListener('click', this.close);
		this.element.addEventListener('mousedown', this._handleOverlayClose);
		document.addEventListener('keydown', this._handleEscClose);
	}

	protected _removeListeners() {
		this._closeBtn.removeEventListener('click', this.close);
		this.element.removeEventListener('mousedown', this._handleOverlayClose);
		document.removeEventListener('keydown', this._handleEscClose);
	}

	open() {
		this.element.classList.add('modal_active');
		this._setListeners();
		this.events.emit(EventTypes.Modal.open);
	}

	close() {
		this.element.classList.remove('modal_active');
		this._removeListeners();
		this.events.emit(EventTypes.Modal.close);
	}
}
