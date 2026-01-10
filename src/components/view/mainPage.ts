import { IMainPage, IMainPageData } from '../../types/view';

import { BaseView } from '../base/baseView';

export class MainPage extends BaseView<IMainPageData> implements IMainPage {
	protected _pageWrapper: HTMLElement;

	constructor(element: HTMLElement) {
		super(element);

		this._pageWrapper = element.querySelector('.page__wrapper');
	}

	set isLocked(value: boolean) {
		value
			? this._pageWrapper.classList.add('page__wrapper_locked')
			: this._pageWrapper.classList.remove('page__wrapper_locked');
	}
}
