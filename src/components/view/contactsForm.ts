import * as EventTypes from '../../types/event';
import { IContactsFormViewData } from '../../types/view';

import { IEvents } from '../base/events';
import { Form } from '../base/form';

export class ContactsFormView extends Form<IContactsFormViewData> {
	constructor(element: HTMLFormElement, events?: IEvents) {
		super(element, events);

		this.element.addEventListener('submit', (evt) => {
			evt.preventDefault();
			events.emit(EventTypes.Contacts.submit);
		});

		this._formInputs.forEach((input) => {
			input.addEventListener('input', () => {
				events.emit(EventTypes.Contacts.setValue, {
					[input.name]: input.value,
				});
			});
		});
	}
}
