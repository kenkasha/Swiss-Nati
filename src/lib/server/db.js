import { MongoClient, ObjectId } from 'mongodb';
import { DB_URI } from '$env/static/private';
import { getCountryDisplayName } from '$lib/country-flags';

const client = new MongoClient(DB_URI);
await client.connect();

const db = client.db('swissNati');

async function getPlayers() {
	const collection = db.collection('players');
	const players = await collection.find({}).toArray();

	players.forEach((player) => {
		player._id = player._id.toString();
	});

	return players;
}

async function getPlayer(id) {
	const collection = db.collection('players');
	const player = await collection.findOne({ _id: new ObjectId(id) });

	if (!player) {
		return null;
	}

	player._id = player._id.toString();
	return player;
}

async function getGames() {
	const collection = db.collection('games');
	const games = await collection.find({}).sort({ date: 1 }).toArray();

	games.forEach((game) => {
		game._id = game._id.toString();
		game.opponent = getCountryDisplayName(game.opponent);
	});

	return games;
}

async function getGame(id) {
	const collection = db.collection('games');
	const game = await collection.findOne({ _id: new ObjectId(id) });

	if (!game) {
		return null;
	}

	game._id = game._id.toString();
	game.opponent = getCountryDisplayName(game.opponent);
	return game;
}

async function createPlayer(player) {
	const collection = db.collection('players');
	await collection.insertOne(player);
}

async function updatePlayer(id, player) {
	const collection = db.collection('players');
	await collection.updateOne(
		{ _id: new ObjectId(id) },
		{ $set: player }
	);

	await syncLineupsForPlayerPosition(id, player.position);
}

async function deletePlayer(id) {
	const playerId = new ObjectId(id);
	const lineups = db.collection('lineups');

	await lineups.updateMany(
		{ 'positions.selectedPlayer': id },
		{ $set: { 'positions.$[position].selectedPlayer': '', updatedAt: new Date() } },
		{ arrayFilters: [{ 'position.selectedPlayer': id }] }
	);

	const result = await db.collection('players').deleteOne({ _id: playerId });
	return result.deletedCount === 1;
}

async function createGame(game) {
	const collection = db.collection('games');
	await collection.insertOne(game);
}

async function updateGame(id, game) {
	const collection = db.collection('games');
	await collection.updateOne(
		{ _id: new ObjectId(id) },
		{ $set: game }
	);
}

async function deleteGame(id) {
	await db.collection('lineups').deleteMany({ gameId: id });

	const result = await db.collection('games').deleteOne({ _id: new ObjectId(id) });
	return result.deletedCount === 1;
}

async function getLineup(gameId) {
	const collection = db.collection('lineups');
	const lineup = await collection.findOne({ gameId });

	if (!lineup) {
		return null;
	}

	lineup._id = lineup._id.toString();
	return lineup;
}

async function saveLineup(gameId, positions, formation) {
	const collection = db.collection('lineups');
	await collection.updateOne(
		{ gameId },
		{
			$set: {
				gameId,
				formation,
				positions,
				updatedAt: new Date()
			}
		},
		{ upsert: true }
	);
}

function getAllowedPlayerPosition(positionLabel) {
	if (positionLabel === 'Torwart') {
		return 'Goalie';
	}

	if (
		positionLabel === 'Linksverteidigung' ||
		positionLabel === 'Innenverteidigung' ||
		positionLabel === 'Innenverteidiger' ||
		positionLabel === 'Rechtsverteidigung' ||
		positionLabel === 'Linker Aussenläufer' ||
		positionLabel === 'Rechter Aussenläufer'
	) {
		return 'Verteidigung';
	}

	if (
		positionLabel === 'Mittelfeld' ||
		positionLabel === 'Zentrales Mittelfeld' ||
		positionLabel === 'Defensives Mittelfeld' ||
		positionLabel === 'Offensives Mittelfeld' ||
		positionLabel === 'Linkes Mittelfeld' ||
		positionLabel === 'Rechtes Mittelfeld'
	) {
		return 'Mittelfeld';
	}

	return 'Sturm';
}

async function syncLineupsForPlayerPosition(playerId, playerPosition) {
	const collection = db.collection('lineups');
	const lineups = await collection.find({ 'positions.selectedPlayer': playerId }).toArray();

	for (const lineup of lineups) {
		let changed = false;
		const positions = lineup.positions.map((position) => {
			if (
				position.selectedPlayer === playerId &&
				getAllowedPlayerPosition(position.label) !== playerPosition
			) {
				changed = true;
				return {
					...position,
					selectedPlayer: ''
				};
			}

			return position;
		});

		if (changed) {
			await collection.updateOne(
				{ _id: lineup._id },
				{
					$set: {
						positions,
						updatedAt: new Date()
					}
				}
			);
		}
	}
}

export default {
	getPlayers,
	getPlayer,
	getGames,
	getGame,
	createPlayer,
	updatePlayer,
	deletePlayer,
	createGame,
	updateGame,
	deleteGame,
	getLineup,
	saveLineup
};
