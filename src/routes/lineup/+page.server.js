import db from '$lib/server/db';
import { isPastDate } from '$lib/date';
import { error, redirect } from '@sveltejs/kit';

export async function load({ url }) {
	const players = await db.getPlayers();
	const games = await db.getGames();
	const selectedGameId = url.searchParams.get('gameId') ?? games[0]?._id ?? '';
	const lineup = selectedGameId ? await db.getLineup(selectedGameId) : null;
	const selectedGame = games.find((game) => game._id === selectedGameId);
	const isPastGame = selectedGame ? isPastDate(selectedGame.date) : false;

	return {
		players,
		games,
		selectedGameId,
		lineup,
		isReadOnly: isPastGame && Boolean(lineup),
		isPastGame
	};
}

export const actions = {
	saveLineup: async ({ request, url }) => {
		const gameId = url.searchParams.get('gameId');

		if (!gameId) {
			throw redirect(303, '/lineup');
		}

		const game = await db.getGame(gameId);

		if (!game) {
			throw error(404, 'Spiel nicht gefunden');
		}

		const lineup = await db.getLineup(gameId);

		if (isPastDate(game.date) && lineup) {
			throw error(403, 'Aufstellungen vergangener Spiele können nicht mehr geändert werden');
		}

		const formData = await request.formData();
		const formation = formData.get('formation') ?? '4-3-3';
		const players = await db.getPlayers();
		const shouldFilterUnavailablePlayers = !isPastDate(game.date);
		const selectedPlayerIds = new Set();
		const positions = Array.from({ length: 11 }, (_, index) => {
			const selectedPlayer = formData.get(`position-${index}`) ?? '';
			const player = players.find((player) => player._id === selectedPlayer);
			const isUnavailable =
				shouldFilterUnavailablePlayers &&
				(player?.status === 'verletzt' || player?.status === 'gesperrt' || player?.status === 'fraglich');
			const uniqueSelectedPlayer =
				selectedPlayerIds.has(selectedPlayer) || isUnavailable ? '' : selectedPlayer;

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
