import db from '$lib/server/db';

export async function load() {
	const games = await db.getGames();

	return {
		games
	};
}