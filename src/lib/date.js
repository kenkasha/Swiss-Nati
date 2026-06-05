export function getTodayDateInputValue() {
	return new Intl.DateTimeFormat('sv-SE', {
		timeZone: 'Europe/Zurich',
		year: 'numeric',
		month: '2-digit',
		day: '2-digit'
	}).format(new Date());
}

export function toDateInputValue(dateValue) {
	if (!dateValue) {
		return '';
	}

	if (dateValue instanceof Date) {
		return getDateInputValue(dateValue);
	}

	if (typeof dateValue !== 'string') {
		return '';
	}

	const isoDate = dateValue.match(/^(\d{4})-(\d{2})-(\d{2})/);
	if (isoDate) {
		return `${isoDate[1]}-${isoDate[2]}-${isoDate[3]}`;
	}

	const swissDate = dateValue.match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/);
	if (swissDate) {
		return `${swissDate[3]}-${swissDate[2].padStart(2, '0')}-${swissDate[1].padStart(2, '0')}`;
	}

	return '';
}

export function isPastDate(dateValue) {
	if (dateValue instanceof Date) {
		return getDateInputValue(dateValue) < getTodayDateInputValue();
	}

	if (typeof dateValue !== 'string') {
		return false;
	}

	const isoDate = dateValue.match(/^(\d{4})-(\d{2})-(\d{2})/);
	if (isoDate) {
		return `${isoDate[1]}-${isoDate[2]}-${isoDate[3]}` < getTodayDateInputValue();
	}

	const swissDate = dateValue.match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/);
	if (swissDate) {
		const normalizedDate = `${swissDate[3]}-${swissDate[2].padStart(2, '0')}-${swissDate[1].padStart(2, '0')}`;
		return normalizedDate < getTodayDateInputValue();
	}

	return false;
}

function getDateInputValue(date) {
	return new Intl.DateTimeFormat('sv-SE', {
		timeZone: 'Europe/Zurich',
		year: 'numeric',
		month: '2-digit',
		day: '2-digit'
	}).format(date);
}

export function rejectFutureDate(event) {
	const input = event.currentTarget;

	if (input.value > getTodayDateInputValue()) {
		input.value = '';
		input.setCustomValidity('Das Geburtsdatum darf nicht in der Zukunft liegen.');
		input.reportValidity();
		return;
	}

	input.setCustomValidity('');
}
