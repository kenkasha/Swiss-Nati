import db from '$lib/server/db';
import { redirect } from '@sveltejs/kit';
import { isPastDate } from '$lib/date';

function parseGoalCount(value) {
	const goals = Number(value);
	return Number.isInteger(goals) && goals >= 0 ? goals : null;
}

export const actions = {
	createGame: async ({ request }) => {
		const formData = await request.formData();
		const date = formData.get('date');

		const game = {
			opponent: formData.get('opponent'),
			date,
			location: formData.get('location'),
			competition: formData.get('competition')
		};

		if (isPastDate(date)) {
			const opponentGoals = parseGoalCount(formData.get('opponentGoals'));
			const swissGoals = parseGoalCount(formData.get('swissGoals'));

			if (opponentGoals !== null && swissGoals !== null) {
				game.result = {
					status: 'Full-time',
					homeTeam: 'opponent',
					opponentGoals,
					swissGoals,
					events: []
				};
			}
		}

		await db.createGame(game);

		throw redirect(303, '/games');
	}
};
