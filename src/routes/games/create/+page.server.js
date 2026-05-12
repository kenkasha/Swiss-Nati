import db from '$lib/server/db';
import { redirect } from '@sveltejs/kit';

export const actions = {
	createGame: async ({ request }) => {

		const formData = await request.formData();

		const game = {
			opponent: formData.get('opponent'),
			date: formData.get('date'),
			location: formData.get('location'),
			competition: formData.get('competition')
		};

		await db.createGame(game);

		throw redirect(303, '/games');
	}
};