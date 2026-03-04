import { IForm } from '../../types/view';

import { IEvents } from './events';
import { BaseView } from './baseView';

export class Form<DataType extends { inputValues: Record<string, string> }>
	extends BaseView<DataType>
	implements IForm<DataType>
{
	protected _formInputs: NodeListOf<HTMLInputElement>;
	protected _submitBtn: HTMLButtonElement;
	protected _errors: HTMLElement;

	constructor(element: HTMLFormElement, events?: IEvents) {
		super(element, events);

		this._submitBtn = element.querySelector('button[type="submit"]');
		this._formInputs = element.querySelectorAll('.form__input');
		this._errors = element.querySelector('.form__errors');
	}

	set inputValues(values: DataType['inputValues']) {
		this._formInputs.forEach((input) => {
			input.value = values[input.name as keyof DataType['inputValues']];
		});
	}

	set errors(value: string) {
		this.setText(this._errors, value);
	}

	setIsDisabledSubmitBtn(disabled: boolean) {
		this.setIsDisabled(this._submitBtn, disabled);
	}
}
