export const required = value => (value ? undefined : 'Field is required');
export const number = value =>
	value && isNaN(Number(value)) ? 'Must be a number' : undefined;
export const length = value =>
	value && value.length === 5 ? undefined : 'Is be 5 characters';
