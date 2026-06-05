import db from '$lib/server/db';
import { isPastDate } from '$lib/date';
import { fail, redirect } from '@sveltejs/kit';

export const actions = {
	createGame: async ({ request }) => {

		const formData = await request.formData();
		const date = formData.get('date');

		if (isPastDate(date)) {
			return fail(400, { error: 'Neue Spiele dürfen nicht in der Vergangenheit liegen.' });
		}

		const game = {
			opponent: formData.get('opponent'),
			date,
			location: formData.get('location'),
			competition: formData.get('competition')
		};

		await db.createGame(game);

		throw redirect(303, '/games');
	}
};
