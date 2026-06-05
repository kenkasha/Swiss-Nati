<script>
	import { isPastDate } from '$lib/date';
	import { opponentCountries } from '$lib/country-flags';

	let { form } = $props();
	let selectedDate = $state('');
	let isPastGame = $derived(isPastDate(selectedDate));
</script>

<svelte:head>
	<title>Neues Spiel · Swiss Nati</title>
</svelte:head>

<div class="container py-5">
	<a href="/games" class="text-decoration-none mb-3 d-inline-block">← Zurück zur Spieleliste</a>
	<h1 class="fw-bold mb-4">Neues Spiel erfassen</h1>

	<form method="POST" action="?/createGame" class="card shadow-sm border-0 p-4">
		{#if form?.error}
			<div class="alert alert-danger" role="alert">{form.error}</div>
		{/if}

		<div class="mb-3">
			<label for="opponent" class="form-label">Gegner</label>
			<select id="opponent" name="opponent" class="form-select" required>
				<option value="">Bitte wählen</option>
				{#each opponentCountries as country}
					<option value={country.name}>{country.name}</option>
				{/each}
			</select>
		</div>

		<div class="mb-3">
			<label for="date" class="form-label">Datum</label>
			<input
				id="date"
				name="date"
				type="date"
				class="form-control"
				bind:value={selectedDate}
				required
			>
		</div>

		{#if isPastGame}
			<div class="result-box mb-3">
				<h2 class="h5 fw-bold mb-3">Resultat erfassen</h2>
				<p class="text-muted mb-3">
					Da dieses Spiel in der Vergangenheit liegt, kannst du das Endresultat direkt eintragen.
				</p>

				<div class="row g-3 align-items-end">
					<div class="col-md-5">
						<label for="opponentGoals" class="form-label">Tore Gegner</label>
						<input
							id="opponentGoals"
							name="opponentGoals"
							type="number"
							class="form-control"
							min="0"
							step="1"
							value="0"
							required={isPastGame}
						>
					</div>

					<div class="col-md-2 text-center result-separator">:</div>

					<div class="col-md-5">
						<label for="swissGoals" class="form-label">Tore Schweiz</label>
						<input
							id="swissGoals"
							name="swissGoals"
							type="number"
							class="form-control"
							min="0"
							step="1"
							value="0"
							required={isPastGame}
						>
					</div>
				</div>
			</div>
		{/if}

		<div class="mb-3">
			<label for="location" class="form-label">Ort</label>
			<input id="location" name="location" type="text" class="form-control" required>
		</div>

		<div class="mb-3">
			<label for="competition" class="form-label">Wettbewerb</label>
			<select id="competition" name="competition" class="form-select" required>
				<option value="">Bitte wählen</option>
				<option value="WM 2026">WM 2026</option>
				<option value="WM-Quali">WM-Quali</option>
				<option value="Freundschaftsspiel">Freundschaftsspiel</option>
				<option value="Nations League">Nations League</option>
				<option value="EM-Quali">EM-Quali</option>
			</select>
		</div>

		<button type="submit" class="btn btn-primary">
			Spiel speichern
		</button>
	</form>
</div>

<style>
	.result-box {
		border: 1px solid #f1d7d3;
		border-left: 5px solid #d92d27;
		border-radius: 12px;
		background: #fff8f7;
		padding: 1.25rem;
	}

	.result-separator {
		font-size: 2rem;
		font-weight: 700;
		line-height: 1;
		padding-bottom: 0.45rem;
	}
</style>
