import db from '$lib/server/db';
import { error } from '@sveltejs/kit';

export async function load() {
	const games = await db.getGames();
	const gamesWithLineupStatus = await Promise.all(
		games.map(async (game) => ({
			...game,
			hasLineup: Boolean(await db.getLineup(game._id))
		}))
	);

	return {
		games: gamesWithLineupStatus
	};
}

export const actions = {
	deleteGame: async ({ request }) => {
		const formData = await request.formData();
		const gameId = formData.get('gameId');

		if (typeof gameId !== 'string' || !gameId) {
			throw error(400, 'Ungültige Spiel-ID');
		}

		const deleted = await db.deleteGame(gameId);

		if (!deleted) {
			throw error(404, 'Spiel nicht gefunden');
		}

		return { deleted: true };
	}
};
