<script>
	let { data } = $props();

	const labels = {
		firstName: 'Vorname',
		lastName: 'Nachname',
		position: 'Position',
		club: 'Club',
		status: 'Status',
		heightCm: 'Grösse',
		birthDate: 'Geburtsdatum',
		marketValueLabel: 'Marktwert',
		preferredFoot: 'Starker Fuss'
	};

	const columns = getColumns();

	function getColumns() {
		const keys = new Set();

		for (const player of data.players) {
			for (const key of Object.keys(player)) {
				if (key !== '_id') {
					keys.add(key);
				}
			}
		}

		return [...keys];
	}

	function getLabel(key) {
		return labels[key] ?? key;
	}

	function formatValue(key, value) {
		if (value === null || value === undefined || value === '') {
			return '-';
		}

		if (key === 'heightCm') {
			return `${value} cm`;
		}

		if (value instanceof Date) {
			return value.toLocaleDateString('de-CH');
		}

		if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}/.test(value)) {
			return new Date(value).toLocaleDateString('de-CH');
		}

		if (typeof value === 'object' && value.$date) {
			return new Date(value.$date).toLocaleDateString('de-CH');
		}

		return String(value);
	}
</script>

<svelte:head>
	<title>Detailsübersicht · Swiss Nati</title>
</svelte:head>

<div class="container py-5">
	<div class="d-flex justify-content-between align-items-center mb-4">
		<div>
			<h1 class="fw-bold mb-1">Detailsübersicht</h1>
			<p class="text-muted mb-0">Alle Spieler mit allen gespeicherten Daten</p>
		</div>
		<a href="/players" class="btn btn-outline-primary">Zur Spielerliste</a>
	</div>

	{#if data.players.length === 0}
		<div class="alert alert-info" role="alert">
			Noch keine Spieler erfasst.
		</div>
	{:else}
		<div class="table-responsive overview-table-wrap">
			<table class="table table-striped table-hover align-middle mb-0">
				<thead>
					<tr>
						<th>Name</th>
						{#each columns as column}
							{#if column !== 'firstName' && column !== 'lastName'}
								<th>{getLabel(column)}</th>
							{/if}
						{/each}
						<th></th>
					</tr>
				</thead>
				<tbody>
					{#each data.players as player}
						<tr>
							<td class="fw-semibold">{player.firstName} {player.lastName}</td>
							{#each columns as column}
								{#if column !== 'firstName' && column !== 'lastName'}
									<td>{formatValue(column, player[column])}</td>
								{/if}
							{/each}
							<td class="text-end">
								<a href={`/players/${player._id}/details`} class="btn btn-sm btn-outline-primary">
									Details
								</a>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
</div>

<style>
	.overview-table-wrap {
		border-radius: 8px;
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
	}

	th {
		white-space: nowrap;
	}

	td {
		min-width: 120px;
	}
</style>
