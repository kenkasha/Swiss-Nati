import db from '$lib/server/db';
import { error, redirect } from '@sveltejs/kit';

export async function load({ params }) {
	const game = await db.getGame(params.id);

	if (!game) {
		throw error(404, 'Spiel nicht gefunden');
	}

	if (isPastGame(game)) {
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

		if (isPastGame(existingGame)) {
			throw error(403, 'Vergangene Spiele können nicht mehr bearbeitet werden');
		}

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

function getTodayAtMidnight() {
	const date = new Date();
	date.setHours(0, 0, 0, 0);
	return date;
}

function getGameDate(dateValue) {
	if (dateValue instanceof Date) {
		const date = new Date(dateValue);
		date.setHours(0, 0, 0, 0);
		return date;
	}

	if (typeof dateValue !== 'string') {
		return null;
	}

	const isoDate = dateValue.match(/^(\d{4})-(\d{2})-(\d{2})/);
	if (isoDate) {
		return new Date(Number(isoDate[1]), Number(isoDate[2]) - 1, Number(isoDate[3]));
	}

	const parsedDate = new Date(dateValue);
	if (Number.isNaN(parsedDate.getTime())) {
		return null;
	}

	parsedDate.setHours(0, 0, 0, 0);
	return parsedDate;
}

function isPastGame(game) {
	const gameDate = getGameDate(game.date);
	return gameDate ? gameDate < getTodayAtMidnight() : false;
}
