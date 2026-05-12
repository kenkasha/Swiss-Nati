import { MongoClient, ObjectId } from 'mongodb';
import { DB_URI } from '$env/static/private';

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

async function getGames() {
	const collection = db.collection('games');
	const games = await collection.find({}).sort({ date: 1 }).toArray();

	games.forEach((game) => {
		game._id = game._id.toString();
	});

	return games;
}

async function createPlayer(player) {
	const collection = db.collection('players');
	await collection.insertOne(player);
}

async function createGame(game) {
	const collection = db.collection('games');
	await collection.insertOne(game);
}

export default {
	getPlayers,
	getGames,
	createPlayer,
	createGame
};