import db from '$lib/server/db';
import { isPastDate } from '$lib/date';
import { isSelectableOpponent } from '$lib/country-flags';
import { error, fail, redirect } from '@sveltejs/kit';

export async function load({ params }) {
	const game = await db.getGame(params.id);

	if (!game) {
		throw error(404, 'Spiel nicht gefunden');
	}

	if (isPastDate(game.date)) {
		throw error(403, 'Vergangene Spiele können nicht mehr bearbeitet werden');
	}

	return {
		game
	};
}

export const actions = {
	updateGame: async ({ params, request }) => {
		const existingGame = await db.getGame(params.id);

		if (!existingGame) {
			throw error(404, 'Spiel nicht gefunden');
		}

		if (isPastDate(existingGame.date)) {
			throw error(403, 'Vergangene Spiele können nicht mehr bearbeitet werden');
		}

		const formData = await request.formData();
		const date = formData.get('date');
		const opponent = formData.get('opponent');

		if (isPastDate(date)) {
			return fail(400, { error: 'Das Spiel darf nicht in die Vergangenheit verschoben werden.' });
		}

		if (!isSelectableOpponent(opponent)) {
			return fail(400, { error: 'Bitte wähle einen gültigen Gegner aus.' });
		}

		const game = {
			opponent,
			date,
			location: formData.get('location'),
			competition: formData.get('competition')
		};

		await db.updateGame(params.id, game);

		throw redirect(303, '/games');
	}
};
