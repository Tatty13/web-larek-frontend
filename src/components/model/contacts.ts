import * as EventTypes from '../../types/event';
import { Contacts } from '../../types/common';
import { IContactsModel } from '../../types/model';
import { EMAIL_REGEXP, PHONE_REGEXP } from '../../utils/constants';

import { IEvents } from '../base/events';

export class ContactsModel implements IContactsModel {
	_contacts: Contacts = {
		email: '',
		phone: '',
	};

	constructor(protected events: IEvents) {}

	set contacts(details: Partial<Contacts>) {
		this._contacts = {
			...this._contacts,
			...details,
		};

		this.#changed();
	}

	get contacts(): Contacts {
		return this._contacts;
	}

	get errorMessage(): string {
		if (!this._contacts.email) {
			return 'Введите email';
		}
		if (!EMAIL_REGEXP.test(this._contacts.email)) {
			return 'Введён невалидный email';
		}
		if (!this._contacts.phone) {
			return 'Выберете номер телефона';
		}
		if (!PHONE_REGEXP.test(this._contacts.phone)) {
			return 'Введите телефон в формате +7 (ххх) ххх-хх-хх';
		}
		return '';
	}

	get isValidContacts(): boolean {
		return this.isValidateEmail && this.isValidPhone;
	}

	get isValidateEmail(): boolean {
		return Boolean(
			this._contacts.email && EMAIL_REGEXP.test(this._contacts.email)
		);
	}

	get isValidPhone(): boolean {
		return Boolean(
			this._contacts.phone && PHONE_REGEXP.test(this._contacts.phone)
		);
	}

	reset() {
		this._contacts = {
			email: '',
			phone: '',
		};
		this.#changed();
	}

	#changed() {
		this.events.emit(EventTypes.Contacts.change, {
			items: this._contacts,
		});
	}
}
