export const API_URL = `${process.env.API_ORIGIN}/api/weblarek`;
export const CDN_URL = `${process.env.API_ORIGIN}/content/weblarek`;

export const cardCategoryMap: Record<string, string> = {
	'софт-скил': 'soft',
	'хард-скил': 'hard',
	другое: 'other',
	дополнительное: 'additional',
	кнопка: 'button',
};

export const CURRENCY = 'синапсов';

export const EMAIL_REGEXP =
	/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const PHONE_REGEXP =
	/^\+7\s?\(?\d{3}\)?\s?\d{3}-?\d{2}-?\d{2}$/;
