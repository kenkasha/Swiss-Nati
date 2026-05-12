import db from '$lib/server/db';

export async function load() {
	const players = await db.getPlayers();

	return {
		players
	};
}