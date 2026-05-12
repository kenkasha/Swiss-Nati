<script>
	// Formular zum Spiel-Erfassen — kommt im nächsten Schritt
</script>

<svelte:head>
	<title>Neues Spiel · Swiss Nati</title>
</svelte:head>

<div class="container py-5">

	<a href="/games" class="text-decoration-none mb-3 d-inline-block">← Zurück zur Spieleliste</a>
	<h1 class="fw-bold mb-4">Neues Spiel erfassen</h1>

<form method="POST" action="?/createGame" class="card shadow-sm border-0 p-4">

	<div class="mb-3">
		<label for="opponent" class="form-label">Gegner</label>
		<input id="opponent" name="opponent" type="text" class="form-control" required>
	</div>

	<div class="mb-3">
		<label for="date" class="form-label">Datum</label>
		<input id="date" name="date" type="date" class="form-control" required>
	</div>

	<div class="mb-3">
		<label for="location" class="form-label">Ort</label>
		<input id="location" name="location" type="text" class="form-control" required>
	</div>

	<div class="mb-3">
		<label for="competition" class="form-label">Wettbewerb</label>
		<select id="competition" name="competition" class="form-select" required>
			<option value="">Bitte wählen</option>
			<option value="WM 2026">WM 2026</option>
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