import db from '$lib/server/db';
import { getTodayDateInputValue } from '$lib/date';
import { fail, redirect } from '@sveltejs/kit';

function isFutureDate(date) {
	return date && date > getTodayDateInputValue();
}

export const actions = {
	createPlayer: async ({ request }) => {

		const formData = await request.formData();
		const birthDate = formData.get('birthDate') || null;

		if (isFutureDate(birthDate)) {
			return fail(400, { error: 'Das Geburtsdatum darf nicht in der Zukunft liegen.' });
		}

		const player = {
			firstName: formData.get('firstName'),
			lastName: formData.get('lastName'),
			position: formData.get('position'),
			club: formData.get('club'),
			status: formData.get('status'),
			heightCm: Number(formData.get('heightCm')) || null,
			birthDate,
			marketValueLabel: formData.get('marketValueLabel'),
			preferredFoot: formData.get('preferredFoot')
		};

		await db.createPlayer(player);

		throw redirect(303, '/players');
	}
};
