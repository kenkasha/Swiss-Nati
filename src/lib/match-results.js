const knownMatchResults = [
	{
		date: '2025-06-11',
		opponent: 'USA',
		result: {
			status: 'Full-time',
			homeTeam: 'opponent',
			opponentGoals: 0,
			swissGoals: 4,
			events: [
				{ type: 'goal', team: 'switzerland', player: 'Dan Ndoye', minute: "13'" },
				{ type: 'goal', team: 'switzerland', player: 'Michel Aebischer', minute: "23'" },
				{ type: 'goal', team: 'switzerland', player: 'Breel Embolo', minute: "33'" },
				{ type: 'goal', team: 'switzerland', player: 'Johan Manzambi', minute: "36'" },
				{ type: 'yellowCard', team: 'opponent', player: 'Quinn Sullivan', minute: "41'" },
				{ type: 'yellowCard', team: 'switzerland', player: 'Nico Elvedi', minute: "51'" },
				{ type: 'yellowCard', team: 'switzerland', player: 'Aurele Amenda', minute: "90'" },
				{ type: 'yellowCard', team: 'opponent', player: 'Patrick Agyemang', minute: "90+2'" },
				{ type: 'yellowCard', team: 'opponent', player: 'Johnny Cardoso', minute: "90+3'" }
			]
		}
	},
	{
		date: '2025-09-05',
		opponent: 'Kosovo',
		result: {
			status: 'Full-time',
			homeTeam: 'opponent',
			opponentGoals: 0,
			swissGoals: 4,
			events: [
				{ type: 'goal', team: 'switzerland', player: 'Manuel Akanji', minute: "22'" },
				{ type: 'goal', team: 'switzerland', player: 'Breel Embolo', minute: "25'" },
				{ type: 'goal', team: 'switzerland', player: 'Silvan Widmer', minute: "39'" },
				{ type: 'goal', team: 'switzerland', player: 'Breel Embolo', minute: "45'" },
				{ type: 'yellowCard', team: 'switzerland', player: 'Miro Muheim', minute: "71'" },
				{ type: 'yellowCard', team: 'switzerland', player: 'Silvan Widmer', minute: "77'" }
			]
		}
	},
	{
		date: '2025-11-15',
		opponents: ['Sweden', 'Schweden'],
		result: {
			status: 'Full-time',
			homeTeam: 'switzerland',
			opponentGoals: 1,
			swissGoals: 4,
			events: [
				{ type: 'goal', team: 'switzerland', player: 'Breel Embolo', minute: "12'" },
				{ type: 'goal', team: 'opponent', player: 'Benjamin Nygren', minute: "33'" },
				{ type: 'goal', team: 'switzerland', player: 'Granit Xhaka', minute: "60' (P)" },
				{ type: 'goal', team: 'switzerland', player: 'Dan Ndoye', minute: "75'" },
				{ type: 'goal', team: 'switzerland', player: 'Johan Manzambi', minute: "90+4'" },
				{ type: 'yellowCard', team: 'opponent', player: 'Yasin Ayari', minute: "18'" },
				{ type: 'yellowCard', team: 'switzerland', player: 'Dan Ndoye', minute: "36'" },
				{ type: 'yellowCard', team: 'opponent', player: 'Jesper Karlstrom', minute: "51'" },
				{ type: 'yellowCard', team: 'opponent', player: 'Viktor Johansson', minute: "58'" },
				{ type: 'yellowCard', team: 'opponent', player: 'Emil Forsberg', minute: "90+2'" }
			]
		}
	},
	{
		date: '2026-03-27',
		opponents: ['Germany', 'Deutschland'],
		result: {
			status: 'Full-time',
			homeTeam: 'switzerland',
			opponentGoals: 4,
			swissGoals: 3,
			events: [
				{ type: 'goal', team: 'switzerland', player: 'Dan Ndoye', minute: "17'" },
				{ type: 'goal', team: 'opponent', player: 'Jonathan Tah', minute: "26'" },
				{ type: 'goal', team: 'switzerland', player: 'Breel Embolo', minute: "41'" },
				{ type: 'goal', team: 'opponent', player: 'Serge Gnabry', minute: "45+2'" },
				{ type: 'goal', team: 'opponent', player: 'Florian Wirtz', minute: "61'" },
				{ type: 'goal', team: 'switzerland', player: 'Joël Monteiro', minute: "79'" },
				{ type: 'goal', team: 'opponent', player: 'Florian Wirtz', minute: "85'" }
			]
		}
	}
];

function normalizeName(value) {
	return String(value ?? '').trim().toLowerCase();
}

function cloneResult(result) {
	return {
		...result,
		events: result.events.map((event) => ({ ...event }))
	};
}

function getEventKey(event) {
	return [event.type, event.team, normalizeName(event.player), event.minute].join('|');
}

function mergeEvents(savedEvents = [], knownEvents = []) {
	const mergedEvents = knownEvents.map((event) => ({ ...event }));
	const eventKeys = new Set(mergedEvents.map(getEventKey));

	for (const savedEvent of savedEvents) {
		const eventKey = getEventKey(savedEvent);

		if (!eventKeys.has(eventKey)) {
			mergedEvents.push({ ...savedEvent });
		}
	}

	return mergedEvents;
}

export function findKnownMatchResult(game) {
	const match = knownMatchResults.find(
		(knownMatch) => {
			const opponents = knownMatch.opponents ?? [knownMatch.opponent];

			return (
				knownMatch.date === game.date &&
				opponents.some((opponent) => normalizeName(opponent) === normalizeName(game.opponent))
			);
		}
	);

	return match ? cloneResult(match.result) : null;
}

export function getEnrichedMatchResult(game) {
	const knownResult = findKnownMatchResult(game);
	const savedResult = typeof game.result === 'object' && game.result ? game.result : null;

	if (!knownResult) {
		return savedResult;
	}

	if (!savedResult || !Array.isArray(savedResult.events) || savedResult.events.length === 0) {
		return {
			...knownResult,
			opponentGoals: savedResult?.opponentGoals ?? knownResult.opponentGoals,
			swissGoals: savedResult?.swissGoals ?? knownResult.swissGoals
		};
	}

	return savedResult;
}
