<script>
	let { data } = $props();

	let player = $derived(data.player);
</script>

<svelte:head>
	<title>Spieler bearbeiten · Swiss Nati</title>
</svelte:head>

<div class="container py-5">
	<a href="/players" class="text-decoration-none mb-3 d-inline-block">← Zurück zur Spielerliste</a>
	<h1 class="fw-bold mb-4">Spieler bearbeiten</h1>

	<form method="POST" action="?/updatePlayer" class="card shadow-sm border-0 p-4">
		<div class="mb-3">
			<label for="firstName" class="form-label">Vorname</label>
			<input id="firstName" name="firstName" type="text" class="form-control" value={player.firstName} required>
		</div>

		<div class="mb-3">
			<label for="lastName" class="form-label">Nachname</label>
			<input id="lastName" name="lastName" type="text" class="form-control" value={player.lastName} required>
		</div>

		<div class="mb-3">
			<label for="position" class="form-label">Position</label>
			<select id="position" name="position" class="form-select" required>
				<option value="">Bitte wählen</option>
				<option value="Goalie" selected={player.position === 'Goalie'}>Goalie</option>
				<option value="Verteidigung" selected={player.position === 'Verteidigung'}>Verteidigung</option>
				<option value="Mittelfeld" selected={player.position === 'Mittelfeld'}>Mittelfeld</option>
				<option value="Sturm" selected={player.position === 'Sturm'}>Sturm</option>
			</select>
		</div>

		<div class="mb-3">
			<label for="club" class="form-label">Club</label>
			<input id="club" name="club" type="text" class="form-control" value={player.club} required>
		</div>

		<div class="mb-3">
			<label for="status" class="form-label">Status</label>
			<select id="status" name="status" class="form-select" required>
				<option value="fit" selected={player.status === 'fit'}>fit</option>
				<option value="verletzt" selected={player.status === 'verletzt'}>verletzt</option>
				<option value="fraglich" selected={player.status === 'fraglich'}>fraglich</option>
				<option value="gesperrt" selected={player.status === 'gesperrt'}>gesperrt</option>
			</select>
		</div>

		<button type="submit" class="btn btn-primary">
			Änderungen speichern
		</button>
	</form>
</div>
