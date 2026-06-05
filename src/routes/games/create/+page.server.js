import db from '$lib/server/db';
import { fail, redirect } from '@sveltejs/kit';
import { isPastDate } from '$lib/date';
import { findKnownMatchResult } from '$lib/match-results';
import { isSelectableOpponent } from '$lib/country-flags';

function parseGoalCount(value) {
	const goals = Number(value);
	return Number.isInteger(goals) && goals >= 0 ? goals : null;
}

export const actions = {
	createGame: async ({ request }) => {
		const formData = await request.formData();
		const date = formData.get('date');
		const opponent = formData.get('opponent');

		if (!isSelectableOpponent(opponent)) {
			return fail(400, { error: 'Bitte wähle einen gültigen Gegner aus.' });
		}

		const game = {
			opponent,
			date,
			location: formData.get('location'),
			competition: formData.get('competition')
		};

		if (isPastDate(date)) {
			const opponentGoals = parseGoalCount(formData.get('opponentGoals'));
			const swissGoals = parseGoalCount(formData.get('swissGoals'));
			const knownResult = findKnownMatchResult(game);

			if (opponentGoals !== null && swissGoals !== null) {
				game.result = {
					...(knownResult ?? { status: 'Full-time', homeTeam: 'opponent', events: [] }),
					opponentGoals,
					swissGoals
				};
			}
		}

		await db.createGame(game);

		throw redirect(303, '/games');
	}
};
