import { IView } from '../../types/view';
import { IEvents } from './events';

export abstract class BaseView<T> implements IView<T> {
	constructor(protected element: HTMLElement, protected events?: IEvents) {}

	render(data: T): HTMLElement {
		if (typeof data === 'object') {
			Object.assign(this, data ?? {});
		}
		return this.element;
	}
}
