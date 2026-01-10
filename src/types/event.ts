export const enum Cart {
	remove = 'cart:remove',
	add = 'cart:add',
	change = 'cart:change',
	open = 'cart:open',
}

export const enum Catalog {
	change = 'catalog:change',
}

export const enum Product {
	getDetails = 'product:get-details',
}

export const enum Modal {
	open = 'modal:open',
	close = 'modal:close',
}

export const enum Order {
	create = 'order:create',
	change = 'order:change',
	setValue = 'order:setValue',
	submit = 'order:submit',
	finish = 'order:finish',
}

export const enum Contacts {
	change = 'contacts:change',
	setValue = 'contacts:setValue',
	submit = 'contacts:submit',
}
