import db from '$lib/server/db';
import { error, redirect } from '@sveltejs/kit';

export async function load({ params }) {
	const game = await db.getGame(params.id);

	if (!game) {
		throw error(404, 'Spiel nicht gefunden');
	}

	return {
		game
	};
}

export const actions = {
	updateGame: async ({ params, request }) => {
		const formData = await request.formData();

		const game = {
			opponent: formData.get('opponent'),
			date: formData.get('date'),
			location: formData.get('location'),
			competition: formData.get('competition')
		};

		await db.updateGame(params.id, game);

		throw redirect(303, '/games');
	}
};
