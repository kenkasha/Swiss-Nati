import db from '$lib/server/db';
import { redirect } from '@sveltejs/kit';

export async function load({ url }) {
	const players = await db.getPlayers();
	const games = await db.getGames();
	const selectedGameId = url.searchParams.get('gameId') ?? games[0]?._id ?? '';
	const lineup = selectedGameId ? await db.getLineup(selectedGameId) : null;

	return {
		players,
		games,
		selectedGameId,
		lineup
	};
}

export const actions = {
	saveLineup: async ({ request, url }) => {
		const gameId = url.searchParams.get('gameId');

		if (!gameId) {
			throw redirect(303, '/lineup');
		}

		const formData = await request.formData();
		const formation = formData.get('formation') ?? '4-3-3';
		const selectedPlayerIds = new Set();
		const positions = Array.from({ length: 11 }, (_, index) => {
			const selectedPlayer = formData.get(`position-${index}`) ?? '';
			const uniqueSelectedPlayer = selectedPlayerIds.has(selectedPlayer) ? '' : selectedPlayer;

			if (uniqueSelectedPlayer) {
				selectedPlayerIds.add(uniqueSelectedPlayer);
			}

			return {
				label: formData.get(`label-${index}`),
				selectedPlayer: uniqueSelectedPlayer
			};
		});

		await db.saveLineup(gameId, positions, formation);

		throw redirect(303, `/lineup?gameId=${gameId}`);
	}
};
