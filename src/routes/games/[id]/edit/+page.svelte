<script>
	let { data } = $props();

	let game = $derived(data.game);
</script>

<svelte:head>
	<title>Spiel bearbeiten · Swiss Nati</title>
</svelte:head>

<div class="container py-5">
	<a href="/games" class="text-decoration-none mb-3 d-inline-block">← Zurück zur Spieleliste</a>
	<h1 class="fw-bold mb-4">Spiel bearbeiten</h1>

	<form method="POST" action="?/updateGame" class="card shadow-sm border-0 p-4">
		<div class="mb-3">
			<label for="opponent" class="form-label">Gegner</label>
			<input id="opponent" name="opponent" type="text" class="form-control" value={game.opponent} required>
		</div>

		<div class="mb-3">
			<label for="date" class="form-label">Datum</label>
			<input id="date" name="date" type="date" class="form-control" value={game.date} required>
		</div>

		<div class="mb-3">
			<label for="location" class="form-label">Ort</label>
			<input id="location" name="location" type="text" class="form-control" value={game.location} required>
		</div>

		<div class="mb-3">
			<label for="competition" class="form-label">Wettbewerb</label>
			<select id="competition" name="competition" class="form-select" required>
				<option value="">Bitte wählen</option>
				<option value="WM 2026" selected={game.competition === 'WM 2026'}>WM 2026</option>
				<option value="Freundschaftsspiel" selected={game.competition === 'Freundschaftsspiel'}>Freundschaftsspiel</option>
				<option value="Nations League" selected={game.competition === 'Nations League'}>Nations League</option>
				<option value="EM-Quali" selected={game.competition === 'EM-Quali'}>EM-Quali</option>
			</select>
		</div>

		<button type="submit" class="btn btn-primary">
			Änderungen speichern
		</button>
	</form>
</div>
