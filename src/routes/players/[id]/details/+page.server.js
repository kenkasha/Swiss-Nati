import db from '$lib/server/db';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	const player = await db.getPlayer(params.id);

	if (!player) {
		throw error(404, 'Spieler nicht gefunden');
	}

	return {
		player
	};
}
