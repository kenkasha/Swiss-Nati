<script>
	import { isPastDate } from '$lib/date';
	import { getEnrichedMatchResult } from '$lib/match-results';
	import { getCountryFlag } from '$lib/country-flags';

	let { data } = $props();

	const pastGames = $derived(data.games.filter((game) => isPastDate(game.date)));

	const eventMeta = {
		goal: { icon: '⚽', label: 'Goal' },
		ownGoal: { icon: '🥅', label: 'Own goal' },
		yellowCard: { icon: '', label: 'Yellow card' },
		redCard: { icon: '', label: 'Red card' },
		secondYellow: { icon: '', label: '2 yellow cards' }
	};

	const scoringTypes = new Set(['goal', 'ownGoal']);

	function getResult(game) {
		return getEnrichedMatchResult(game);
	}

	function getSwissGoals(game) {
		return getResult(game)?.swissGoals ?? game.swissGoals ?? game.switzerlandGoals ?? null;
	}

	function getOpponentGoals(game) {
		return getResult(game)?.opponentGoals ?? game.opponentGoals ?? null;
	}

	function hasScore(game) {
		return getSwissGoals(game) !== null && getOpponentGoals(game) !== null;
	}

	function getSwitzerlandSide(game) {
		return {
			key: 'switzerland',
			name: 'Switzerland',
			flag: getCountryFlag('Switzerland'),
			goals: getSwissGoals(game)
		};
	}

	function getOpponentSide(game) {
		return {
			key: 'opponent',
			name: game.opponent,
			flag: getCountryFlag(game.opponent),
			goals: getOpponentGoals(game)
		};
	}

	function getHomeSide(game) {
		return getResult(game)?.homeTeam === 'opponent'
			? getOpponentSide(game)
			: getSwitzerlandSide(game);
	}

	function getAwaySide(game) {
		return getResult(game)?.homeTeam === 'opponent'
			? getSwitzerlandSide(game)
			: getOpponentSide(game);
	}

	function getEvents(game) {
		return getResult(game)?.events ?? [];
	}

	function getTeamEvents(game, team, filterFn) {
		return getEvents(game).filter((event) => event.team === team && filterFn(event));
	}

	function getScoringEvents(game, team) {
		return getTeamEvents(game, team, (event) => scoringTypes.has(event.type));
	}

	function getDisciplinaryEvents(game, team) {
		return getTeamEvents(game, team, (event) => !scoringTypes.has(event.type));
	}

	function getEventClass(type) {
		return `event-icon event-icon-${type}`;
	}

	function formatCompetition(competition) {
		return competition === 'Freundschaftsspiel' ? 'Friendlies' : competition;
	}
</script>

<svelte:head>
	<title>Resultate · Swiss Nati</title>
</svelte:head>

<div class="container py-5">
	<div class="d-flex justify-content-between align-items-center mb-4">
		<div>
			<h1 class="fw-bold mb-1">Resultate</h1>
			<p class="text-muted mb-0">Vergangene Spiele der Schweizer Nationalmannschaft</p>
		</div>
		<div class="d-flex align-items-center gap-4">
			<img class="title-sfv-logo" src="/logo/SFV_Logo_rgb.webp" alt="SFV Logo">
			<a href="/games" class="btn btn-outline-primary">Zur Spieleliste</a>
		</div>
	</div>

	{#if pastGames.length === 0}
		<div class="alert alert-info" role="alert">Noch keine vergangenen Spiele erfasst.</div>
	{:else}
		<div class="results-grid">
			{#each pastGames as game}
				{@const home = getHomeSide(game)}
				{@const away = getAwaySide(game)}
				<section class="result-card">
					<div class="result-meta">
						<span>{formatCompetition(game.competition)}</span>
						<span>·</span>
						<span>{game.date}</span>
						<span class="result-status">{getResult(game)?.status ?? 'Full-time'}</span>
					</div>

					<div class="scoreline">
						<div class="team">
							<div class="team-flag">
								{#if home.flag.url}
									<img src={home.flag.url} alt={`${home.name} Flagge`}>
								{:else if home.flag.emoji}
									<span class="team-flag-emoji" aria-label={`${home.name} Flagge`}>{home.flag.emoji}</span>
								{/if}
							</div>
							<div class="team-name">{home.name}</div>
							<div class="scorers">
								{#each getScoringEvents(game, home.key) as event}
									<div class="team-event-row">{eventMeta[event.type]?.icon} {event.player} {event.minute}</div>
								{/each}
							</div>
						</div>

						<div class="score">
							{#if hasScore(game)}
								<span>{home.goals}</span>
								<span class="score-divider">-</span>
								<span>{away.goals}</span>
							{:else}
								<span class="no-score">Kein Resultat</span>
							{/if}
						</div>

						<div class="team">
							<div class="team-flag">
								{#if away.flag.url}
									<img src={away.flag.url} alt={`${away.name} Flagge`}>
								{:else if away.flag.emoji}
									<span class="team-flag-emoji" aria-label={`${away.name} Flagge`}>{away.flag.emoji}</span>
								{/if}
							</div>
							<div class="team-name">{away.name}</div>
							<div class="scorers">
								{#each getScoringEvents(game, away.key) as event}
									<div class="team-event-row">{eventMeta[event.type]?.icon} {event.player} {event.minute}</div>
								{/each}
							</div>
						</div>
					</div>

					<div class="event-board">
						<div>
							{#each getDisciplinaryEvents(game, home.key) as event}
								<div class="event-row">
									<span class={getEventClass(event.type)}>{eventMeta[event.type]?.icon ?? '•'}</span>
									<span>{event.player} {event.minute}</span>
								</div>
							{/each}
						</div>
						<div class="event-board-spacer"></div>
						<div>
							{#each getDisciplinaryEvents(game, away.key) as event}
								<div class="event-row event-row-away">
									<span class={getEventClass(event.type)}>{eventMeta[event.type]?.icon ?? '•'}</span>
									<span>{event.player} {event.minute}</span>
								</div>
							{/each}
						</div>
					</div>

					<div class="result-footer">
						<a href={`/lineup?gameId=${game._id}`} class="btn btn-sm btn-outline-light">
							Aufstellung ansehen
						</a>
					</div>
				</section>
			{/each}
		</div>
	{/if}
</div>

<style>
	.results-grid {
		display: grid;
		gap: 24px;
	}

	.result-card {
		background: #1f1f1f;
		color: #f8f9fa;
		border-radius: 18px;
		padding: 28px;
		box-shadow: 0 16px 36px rgba(0, 0, 0, 0.22);
		overflow: hidden;
	}

	.result-meta {
		display: flex;
		align-items: center;
		gap: 8px;
		color: #ffbfd0;
		font-size: 0.95rem;
	}

	.result-status {
		margin-left: auto;
		color: #ffffff;
	}

	.scoreline {
		display: grid;
		grid-template-columns: minmax(0, 1fr) 220px minmax(0, 1fr);
		align-items: start;
		gap: 28px;
		padding: 28px 0;
	}

	.team {
		display: grid;
		grid-template-rows: 68px auto minmax(96px, auto);
		justify-items: center;
		text-align: center;
		min-width: 0;
	}

	.team-flag {
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 58px;
		margin-bottom: 10px;
	}

	.team-flag img {
		width: 58px;
		height: 58px;
		object-fit: cover;
		border-radius: 10px;
		box-shadow: 0 6px 16px rgba(0, 0, 0, 0.35);
	}

	.team-flag-emoji {
		display: inline-block;
		font-size: 58px;
		line-height: 1;
	}

	.team-name {
		font-size: 1.3rem;
		font-weight: 700;
		min-height: 1.65rem;
	}

	.scorers {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		min-height: 96px;
		margin-top: 16px;
		color: #c6ccd2;
		font-size: 0.95rem;
		line-height: 1.35;
		text-align: center;
	}

	.team-event-row {
		white-space: nowrap;
	}

	.score {
		display: flex;
		align-items: center;
		gap: 34px;
		font-size: clamp(2.5rem, 7vw, 4.5rem);
		font-weight: 700;
		width: 220px;
		justify-content: center;
		align-self: start;
		padding-top: 28px;
	}

	.score-divider {
		color: #aeb4bb;
	}

	.no-score {
		font-size: 1.2rem;
		color: #aeb4bb;
	}

	.event-board {
		display: grid;
		grid-template-columns: minmax(0, 1fr) 220px minmax(0, 1fr);
		gap: 28px;
		border-top: 1px solid rgba(255, 255, 255, 0.08);
		padding-top: 18px;
		color: #c6ccd2;
		font-size: 0.95rem;
		line-height: 1.35;
	}

	.event-board > div {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-self: center;
		width: 100%;
		min-height: 72px;
		text-align: center;
	}

	.event-board-spacer {
		width: 220px;
	}

	.event-row {
		display: flex;
		align-items: center;
		gap: 7px;
		justify-content: center;
		width: 100%;
		min-height: 1.35em;
		line-height: 1.35;
		white-space: nowrap;
	}

	.event-row-away {
		justify-content: center;
	}

	.event-icon {
		display: inline-block;
		width: 0.65em;
		height: 0.95em;
		border-radius: 2px;
		line-height: 1.35;
		transform: rotate(10deg);
		flex: 0 0 auto;
	}

	.event-icon-yellowCard {
		background: #ffc940;
	}

	.event-icon-redCard {
		background: #f04444;
	}

	.event-icon-secondYellow {
		position: relative;
		background: #ffc940;
	}

	.event-icon-secondYellow::after {
		content: '';
		position: absolute;
		left: 0.38em;
		top: 0.16em;
		width: 0.65em;
		height: 0.95em;
		border-radius: 2px;
		background: #f04444;
	}

	.result-footer {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		gap: 16px;
		margin-top: 18px;
	}

	@media (max-width: 768px) {
		.scoreline,
		.event-board {
			grid-template-columns: 1fr;
		}

		.team {
			grid-template-rows: auto auto auto;
		}

		.score {
			width: 100%;
			padding-top: 0;
		}

		.event-board-spacer {
			display: none;
		}

		.event-row-away {
			justify-content: center;
			flex-direction: row;
		}

		.result-footer {
			align-items: flex-start;
			flex-direction: column;
		}
	}
</style>
