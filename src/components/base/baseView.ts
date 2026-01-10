import { IView } from '../../types/view';

import { IEvents } from './events';

type AttributeValue = string | number | boolean | null | undefined;

export abstract class BaseView<DataType> implements IView<DataType> {
	constructor(protected element: HTMLElement, protected events?: IEvents) {}

	protected showElement(element: HTMLElement) {
		if (!element) return;
		element.removeAttribute('hidden');
	}

	protected hideElement(element: HTMLElement) {
		if (!element) return;
		element.setAttribute('hidden', 'true');
	}

	protected _isDisabled(element: HTMLElement) {
		return element.hasAttribute('disabled');
	}

	protected disableElement(element: HTMLElement) {
		if (!element) return;
		element.setAttribute('disabled', 'true');
	}

	protected enableElement(element: HTMLElement) {
		if (!element) return;
		element.removeAttribute('disabled');
	}

	protected setIsDisabled(element: HTMLElement, disabled: boolean) {
		const isDisabledElement = this._isDisabled(element);

		if (disabled && !isDisabledElement) {
			this.disableElement(element);
			return;
		}

		if (!disabled && isDisabledElement) {
			this.enableElement(element);
		}
	}

	protected setText(element: HTMLElement, value: unknown) {
		if (!element) return;
		element.textContent = String(value);
	}

	protected setImage(element: HTMLImageElement, src: string, alt?: string) {
		if (!element) return;
		element.src = src;
		element.alt = alt ?? '';
	}

	protected setInputValue(
		element: HTMLInputElement,
		value: HTMLInputElement['value']
	) {
		element.value = value;
	}

	protected setElementAttribute(
		element: HTMLElement,
		attributeName: string,
		attributeValue: AttributeValue
	) {
		if (!element) return;
		if (
			attributeValue === null ||
			attributeValue === undefined ||
			attributeValue === false
		) {
			element.removeAttribute(attributeName);
			return;
		}

		element.setAttribute(attributeName, String(attributeValue));
	}

	render(data: Partial<DataType>): HTMLElement {
		if (typeof data === 'object') {
			Object.assign(this, data ?? {});
		}
		return this.element;
	}
}
