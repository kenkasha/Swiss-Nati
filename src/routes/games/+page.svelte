<script>
	let { data } = $props();

	const today = getTodayAtMidnight();

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

		const swissDate = dateValue.match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/);
		if (swissDate) {
			return new Date(Number(swissDate[3]), Number(swissDate[2]) - 1, Number(swissDate[1]));
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
		return gameDate ? gameDate < today : false;
	}
</script>

<svelte:head>
	<title>Spiele · Swiss Nati</title>
</svelte:head>

<div class="container py-5">
	<div class="d-flex justify-content-between align-items-center mb-4">
		<div>
			<h1 class="fw-bold mb-1">⚽ Spiele</h1>
			<p class="text-muted mb-0">Alle Spiele der Schweizer Nationalmannschaft</p>
		</div>
		<a href="/games/create" class="btn btn-primary">
			+ Neues Spiel
		</a>
	</div>

	{#if data.games.length === 0}
		<div class="alert alert-info" role="alert">
			<strong>📌 Noch keine Spiele erfasst.</strong>
			<br>
			Klicke oben auf <em>"+ Neues Spiel"</em>, um das erste Spiel hinzuzufügen.
		</div>
	{:else}
		<div class="row g-4">
			{#each data.games as game}
				{@const pastGame = isPastGame(game)}
				<div class="col-md-6">
					<div class:past-game={pastGame} class="card shadow-sm border-0 h-100">
						<div class="card-body">
							<div class="d-flex justify-content-between align-items-start gap-3 mb-3">
								<h3 class="h4 fw-bold mb-0">
									🇨🇭 Schweiz vs. {game.opponent}
								</h3>
								{#if pastGame}
									<span class="badge text-bg-dark">Vergangen</span>
								{/if}
							</div>

							<p class="mb-2">
								<strong>📅 Datum:</strong> {game.date}
							</p>

							<p class="mb-2">
								<strong>📍 Ort:</strong> {game.location}
							</p>

							<p class="mb-3">
								<strong>🏆 Wettbewerb:</strong> {game.competition}
							</p>

							{#if !pastGame}
								<a href={`/games/${game._id}/edit`} class="btn btn-outline-primary">
									Bearbeiten
								</a>
							{/if}
						</div>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>

<style>
	.past-game {
		background:
			repeating-linear-gradient(
				135deg,
				rgba(255, 255, 255, 0.08) 0,
				rgba(255, 255, 255, 0.08) 8px,
				transparent 8px,
				transparent 16px
			),
			#343a40;
		color: white;
	}

	.past-game .btn-outline-primary {
		color: white !important;
		border-color: white !important;
	}

	.past-game .btn-outline-primary:hover {
		background-color: white !important;
		color: #343a40 !important;
	}
</style>
