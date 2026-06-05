<script>
	import { isPastDate } from '$lib/date';

	let { data } = $props();
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
				{@const pastGame = isPastDate(game.date)}
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

							<div class="game-actions">
								<a href={`/lineup?gameId=${game._id}`} class="btn btn-outline-secondary">
									{pastGame ? 'Aufstellung ansehen' : 'Zur Aufstellung'}
								</a>
								{#if !pastGame}
									<a href={`/games/${game._id}/edit`} class="btn btn-outline-primary">
										Bearbeiten
									</a>
								{/if}
								<form
									method="POST"
									action="?/deleteGame"
									onsubmit={(event) => {
										if (!confirm(`Soll das Spiel Schweiz vs. ${game.opponent} wirklich gelöscht werden?`)) {
											event.preventDefault();
										}
									}}
								>
									<input type="hidden" name="gameId" value={game._id}>
									<button type="submit" class="btn btn-outline-danger">Löschen</button>
								</form>
							</div>
							{#if pastGame && !game.hasLineup}
								<p class="small mt-3 mb-0">
									Für dieses vergangene Spiel wurde keine Aufstellung gespeichert.
								</p>
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

	.game-actions {
		display: flex;
		gap: 8px;
		flex-wrap: wrap;
	}

	.past-game .btn-outline-danger {
		color: white;
		border-color: white;
	}

	.past-game .btn-outline-danger:hover {
		background-color: white;
		color: #dc3545;
	}

	.past-game .btn-outline-secondary {
		color: white;
		border-color: white;
	}

	.past-game .btn-outline-secondary:hover {
		background-color: white;
		color: #343a40;
	}
</style>
