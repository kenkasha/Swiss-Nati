<script>
	// Formular zum Spieler-Erfassen — wird im nächsten Schritt mit Form Action verknüpft
</script>

<svelte:head>
	<title>Neuer Spieler · Swiss Nati</title>
</svelte:head>

<div class="container py-5">

	<!-- Zurück-Link und Titel -->
	<a href="/players" class="text-decoration-none mb-3 d-inline-block">← Zurück zur Spielerliste</a>
	<h1 class="fw-bold mb-4">Neuen Spieler erfassen</h1>

	<form method="POST" action="?/createPlayer" class="card shadow-sm border-0 p-4">

	<div class="mb-3">
		<label for="firstName" class="form-label">Vorname</label>
		<input id="firstName" name="firstName" type="text" class="form-control" required>
	</div>

	<div class="mb-3">
		<label for="lastName" class="form-label">Nachname</label>
		<input id="lastName" name="lastName" type="text" class="form-control" required>
	</div>

	<div class="mb-3">
		<label for="position" class="form-label">Position</label>
		<select id="position" name="position" class="form-select" required>
			<option value="">Bitte wählen</option>
			<option value="Goalie">Goalie</option>
			<option value="Verteidigung">Verteidigung</option>
			<option value="Mittelfeld">Mittelfeld</option>
			<option value="Sturm">Sturm</option>
		</select>
	</div>

	<div class="mb-3">
		<label for="club" class="form-label">Club</label>
		<input id="club" name="club" type="text" class="form-control" required>
	</div>

	<div class="mb-3">
		<label for="status" class="form-label">Status</label>
		<select id="status" name="status" class="form-select" required>
			<option value="fit">fit</option>
			<option value="verletzt">verletzt</option>
			<option value="fraglich">fraglich</option>
			<option value="gesperrt">gesperrt</option>
		</select>
	</div>

	<div class="mb-3">
		<label for="heightCm" class="form-label">Grösse in cm</label>
		<input id="heightCm" name="heightCm" type="number" min="0" class="form-control" placeholder="z.B. 189">
	</div>

	<div class="mb-3">
		<label for="birthDate" class="form-label">Geburtsdatum</label>
		<input id="birthDate" name="birthDate" type="date" class="form-control">
	</div>

	<div class="mb-3">
		<label for="marketValueLabel" class="form-label">Marktwert</label>
		<input
			id="marketValueLabel"
			name="marketValueLabel"
			type="text"
			class="form-control"
			placeholder="z.B. CHF 6.4 Mio."
		>
	</div>

	<div class="mb-3">
		<label for="preferredFoot" class="form-label">Starker Fuss</label>
		<select id="preferredFoot" name="preferredFoot" class="form-select">
			<option value="">Bitte wählen</option>
			<option value="rechts">rechts</option>
			<option value="links">links</option>
			<option value="beidfüssig">beidfüssig</option>
		</select>
	</div>

	<button type="submit" class="btn btn-primary">
		Spieler speichern
	</button>

</form>

</div>
