import db from '$lib/server/db';
import { error, redirect } from '@sveltejs/kit';

export async function load({ params }) {
	const player = await db.getPlayer(params.id);

	if (!player) {
		throw error(404, 'Spieler nicht gefunden');
	}

	return {
		player
	};
}

export const actions = {
	deletePlayer: async ({ params }) => {
		const deleted = await db.deletePlayer(params.id);

		if (!deleted) {
			throw error(404, 'Spieler nicht gefunden');
		}

		throw redirect(303, '/players');
	}
};
