<script>
	import { isPastDate } from '$lib/date';
	import { getCountryFlag } from '$lib/country-flags';

	let { data } = $props();
	let showDeleteModal = $state(false);
	let deleteForm = null;

	function getOpponentFlag(game) {
		return getCountryFlag(game.opponent);
	}

	function getSwissFlag() {
		return getCountryFlag('Schweiz');
	}

	function askDeleteConfirmation(event) {
		event.preventDefault();
		deleteForm = event.currentTarget;
		showDeleteModal = true;
	}

	function cancelDelete() {
		deleteForm = null;
		showDeleteModal = false;
	}

	function confirmDelete() {
		deleteForm?.submit();
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
				{@const pastGame = isPastDate(game.date)}
				{@const swissFlag = getSwissFlag()}
				{@const opponentFlag = getOpponentFlag(game)}
				<div class="col-md-6">
					<div class:past-game={pastGame} class="card shadow-sm border-0 h-100">
						<div class="card-body">
							<div class="d-flex justify-content-between align-items-start gap-3 mb-3">
								<h3 class="h4 fw-bold mb-0">
									{#if swissFlag.url}
										<img class="matchup-flag" src={swissFlag.url} alt="Schweiz Flagge">
									{:else if swissFlag.emoji}
										<span class="matchup-flag-emoji" aria-label="Schweiz Flagge">{swissFlag.emoji}</span>
									{/if}
									<span class="matchup-vs">vs</span>
									{#if opponentFlag.url}
										<img class="matchup-flag" src={opponentFlag.url} alt={`${game.opponent} Flagge`}>
									{:else if opponentFlag.emoji}
										<span class="matchup-flag-emoji" aria-label={`${game.opponent} Flagge`}>{opponentFlag.emoji}</span>
									{/if}
								</h3>
								{#if pastGame}
									<span class="badge text-bg-dark">Vergangen</span>
								{/if}
							</div>

							<p class="mb-2">
								<strong>Datum:</strong> {game.date}
							</p>

							<p class="mb-2">
								<strong>Ort:</strong> {game.location}
							</p>

							<p class="mb-3">
								<strong>Wettbewerb:</strong> {game.competition}
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
									onsubmit={askDeleteConfirmation}
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

{#if showDeleteModal}
	<div class="modal d-block" tabindex="-1" role="dialog" aria-modal="true">
		<div class="modal-dialog modal-dialog-centered">
			<div class="modal-content">
				<div class="modal-header">
					<h2 class="modal-title h5">Löschen wirklich vornehmen?</h2>
					<button type="button" class="btn-close" aria-label="Abbrechen" onclick={cancelDelete}></button>
				</div>
				<div class="modal-body">
					<p class="mb-0">Dieser Eintrag wird dauerhaft gelöscht.</p>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-outline-secondary" onclick={cancelDelete}>Abbrechen</button>
					<button type="button" class="btn btn-danger" onclick={confirmDelete}>OK</button>
				</div>
			</div>
		</div>
	</div>
	<div class="modal-backdrop show"></div>
{/if}

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

	.matchup-flag {
		width: 1.55em;
		height: 1.55em;
		object-fit: cover;
		border-radius: 0.25em;
		margin-right: 0.2em;
		vertical-align: -0.25em;
	}

	.matchup-flag-emoji {
		display: inline-block;
		font-size: 1.55em;
		line-height: 1;
		margin-right: 0.2em;
		vertical-align: -0.2em;
	}

	.matchup-vs {
		margin-right: 0.35em;
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

	.modal {
		background: rgba(0, 0, 0, 0.15);
	}
</style>
