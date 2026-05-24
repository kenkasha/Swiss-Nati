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
	updatePlayer: async ({ params, request }) => {
		const formData = await request.formData();

		const player = {
			firstName: formData.get('firstName'),
			lastName: formData.get('lastName'),
			position: formData.get('position'),
			club: formData.get('club'),
			status: formData.get('status')
		};

		await db.updatePlayer(params.id, player);

		throw redirect(303, '/players');
	}
};
