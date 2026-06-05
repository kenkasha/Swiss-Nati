import db from '$lib/server/db';
import { getTodayDateInputValue } from '$lib/date';
import { error, fail, redirect } from '@sveltejs/kit';

function isFutureDate(date) {
	return date && date > getTodayDateInputValue();
}

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
	updatePlayer: async ({ params, request }) => {
		const existingPlayer = await db.getPlayer(params.id);

		if (!existingPlayer) {
			throw error(404, 'Spieler nicht gefunden');
		}

		const formData = await request.formData();
		const birthDate = formData.get('birthDate') || existingPlayer.birthDate || null;

		if (isFutureDate(birthDate)) {
			return fail(400, { error: 'Das Geburtsdatum darf nicht in der Zukunft liegen.' });
		}

		const player = {
			firstName: formData.get('firstName'),
			lastName: formData.get('lastName'),
			position: formData.get('position'),
			club: formData.get('club'),
			status: formData.get('status'),
			birthDate,
			marketValueLabel: formData.get('marketValueLabel')
		};

		await db.updatePlayer(params.id, player);

		throw redirect(303, '/players');
	}
};
