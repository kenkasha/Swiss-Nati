<script>
	let { data } = $props();
	let filterValues = $state({
		name: [],
		position: [],
		club: [],
		status: [],
		heightCm: [],
		birthDate: [],
		marketValueLabel: [],
		preferredFoot: []
	});
	let sortKey = $state('name');
	let sortDirection = $state('asc');
	let openFilterKey = $state('');

	const labels = {
		name: 'Name',
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
	const filteredPlayers = $derived(getFilteredPlayers());

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

	function getUniqueValues(key) {
		return [
			...new Set(
				data.players
					.map((player) => player[key])
					.filter((value) => value !== null && value !== undefined && value !== '')
			)
		].sort((a, b) => String(a).localeCompare(String(b), 'de-CH'));
	}

	function getFilterOptions(key) {
		if (key === 'birthDate') {
			return [...new Set(data.players.map((player) => getBirthYear(player.birthDate)).filter(Boolean))].sort(
				(a, b) => String(a).localeCompare(String(b), 'de-CH', { numeric: true })
			);
		}

		return [...new Set(data.players.map((player) => getColumnValue(player, key)).filter(Boolean))].sort(
			(a, b) => String(a).localeCompare(String(b), 'de-CH', { numeric: true })
		);
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

	function getFullName(player) {
		return `${player.firstName ?? ''} ${player.lastName ?? ''}`.trim();
	}

	function getColumnValue(player, key) {
		if (key === 'name') {
			return getFullName(player);
		}

		return formatValue(key, player[key]);
	}

	function getFilterValue(player, key) {
		if (key === 'birthDate') {
			return getBirthYear(player.birthDate);
		}

		return getColumnValue(player, key);
	}

	function getDateTime(value) {
		if (!value) {
			return 0;
		}

		if (value instanceof Date) {
			return value.getTime();
		}

		if (typeof value === 'object' && value.$date) {
			return new Date(value.$date).getTime();
		}

		return new Date(value).getTime();
	}

	function getBirthYear(value) {
		const timestamp = getDateTime(value);
		return timestamp ? String(new Date(timestamp).getFullYear()) : '';
	}

	function getMarketNumber(value) {
		if (!value) {
			return 0;
		}

		const text = String(value).replace("'", '').replace(',', '.');
		const amount = Number(text.match(/\d+(\.\d+)?/)?.[0] ?? 0);

		if (/mio/i.test(text)) {
			return amount * 1000000;
		}

		return amount;
	}

	function getFilteredPlayers() {
		const players = data.players.filter((player) => {
			return Object.entries(filterValues).every(([key, value]) => {
				return value.length === 0 || value.includes(getFilterValue(player, key));
			});
		});

		return [...players].sort((a, b) => {
			const direction = sortDirection === 'desc' ? -1 : 1;

			if (sortKey === 'heightCm') {
				return (Number(a.heightCm ?? 0) - Number(b.heightCm ?? 0)) * direction;
			}

			if (sortKey === 'birthDate') {
				return (getDateTime(a.birthDate) - getDateTime(b.birthDate)) * direction;
			}

			if (sortKey === 'marketValueLabel') {
				return (getMarketNumber(a.marketValueLabel) - getMarketNumber(b.marketValueLabel)) * direction;
			}

			return (
				getColumnValue(a, sortKey).localeCompare(getColumnValue(b, sortKey), 'de-CH', {
					numeric: true
				}) * direction
			);
		});
	}

	function resetFilters() {
		for (const key of Object.keys(filterValues)) {
			filterValues[key] = [];
		}

		sortKey = 'name';
		sortDirection = 'asc';
		openFilterKey = '';
	}

	function sortColumn(key, direction) {
		sortKey = key;
		sortDirection = direction;
		openFilterKey = '';
	}

	function toggleFilterOption(key, option, checked) {
		const selectedValues = filterValues[key] ?? [];
		filterValues[key] = checked
			? [...selectedValues, option]
			: selectedValues.filter((value) => value !== option);
	}

	function isFilterActive(key) {
		return filterValues[key]?.length > 0;
	}

	function isFilterOptionSelected(key, option) {
		const selectedValues = filterValues[key] ?? [];
		return selectedValues.includes(option);
	}

	function areAllFilterOptionsSelected(key) {
		const options = getFilterOptions(key);
		const selectedValues = filterValues[key] ?? [];
		return options.length > 0 && selectedValues.length === options.length;
	}

	function toggleAllFilterOptions(key, checked) {
		filterValues[key] = checked ? getFilterOptions(key) : [];
	}

	function toggleFilterMenu(key) {
		openFilterKey = openFilterKey === key ? '' : key;
	}
</script>

<svelte:window
	onclick={(event) => {
		if (!event.target.closest?.('.column-filter')) {
			openFilterKey = '';
		}
	}}
	onkeydown={(event) => {
		if (event.key === 'Escape') {
			openFilterKey = '';
		}
	}}
/>

<svelte:head>
	<title>Detailsübersicht · Swiss Nati</title>
</svelte:head>

{#if openFilterKey}
	<button
		type="button"
		class="filter-backdrop"
		aria-label="Filtermenü schliessen"
		onclick={() => {
			openFilterKey = '';
		}}
	></button>
{/if}

<div class="container-fluid py-5 px-4">
	<div class="d-flex justify-content-between align-items-center mb-4">
		<div>
			<h1 class="fw-bold mb-1">Detailsübersicht</h1>
			<p class="text-muted mb-0">Alle Spieler mit allen gespeicherten Daten</p>
		</div>
		<div class="d-flex align-items-center gap-4">
			<img class="title-sfv-logo" src="/logo/SFV_Logo_rgb.webp" alt="SFV Logo">
			<a href="/players" class="btn btn-outline-primary">Zur Spielerliste</a>
		</div>
	</div>

	{#if data.players.length === 0}
		<div class="alert alert-info" role="alert">
			Noch keine Spieler erfasst.
		</div>
	{:else}
		<div class="d-flex justify-content-between align-items-center gap-3 mb-3">
			<p class="text-muted small mb-0">
				{filteredPlayers.length} von {data.players.length} Spielern angezeigt
			</p>
			<button type="button" class="btn btn-sm btn-outline-secondary" onclick={resetFilters}>
				Filter zurücksetzen
			</button>
		</div>

		<div class="overview-table-wrap">
			<table class="table table-striped table-hover align-middle mb-0 overview-table">
				<colgroup>
					<col class="name-col" />
					<col class="position-col" />
					<col class="club-col" />
					<col class="status-col" />
					<col class="heightCm-col" />
					<col class="birthDate-col" />
					<col class="marketValueLabel-col" />
					<col class="preferredFoot-col" />
					<col class="details-col" />
				</colgroup>
				<thead>
					<tr>
						<th>
							<div class="column-head name-head">
								<span>Name</span>
								<div class="column-filter" class:active-control={isFilterActive('name')}>
									<button
										type="button"
										class="column-control"
										aria-label="Name filtern oder sortieren"
										aria-expanded={openFilterKey === 'name'}
										onclick={() => toggleFilterMenu('name')}
									>▾</button>
									{#if openFilterKey === 'name'}
									<div class="filter-menu">
										<button type="button" class="filter-sort" onclick={() => sortColumn('name', 'asc')}>Sortieren A-Z</button>
										<button type="button" class="filter-sort" onclick={() => sortColumn('name', 'desc')}>Sortieren Z-A</button>
										<div class="filter-separator"></div>
										<label class="filter-option">
											<input
												type="checkbox"
												checked={areAllFilterOptionsSelected('name')}
												onchange={(event) => toggleAllFilterOptions('name', event.currentTarget.checked)}
											>
											<span>(Alles auswählen)</span>
										</label>
										{#each getFilterOptions('name') as option}
											<label class="filter-option">
												<input
													type="checkbox"
													checked={isFilterOptionSelected('name', option)}
													onchange={(event) => toggleFilterOption('name', option, event.currentTarget.checked)}
												>
												<span>{option}</span>
											</label>
										{/each}
									</div>
									{/if}
								</div>
							</div>
						</th>
						{#each columns as column}
							{#if column !== 'firstName' && column !== 'lastName'}
								<th>
									<div class={`column-head ${column}-head`}>
										<span>{getLabel(column)}</span>
										<div class="column-filter" class:active-control={isFilterActive(column)}>
											<button
												type="button"
												class="column-control"
												aria-label={`${getLabel(column)} filtern oder sortieren`}
												aria-expanded={openFilterKey === column}
												onclick={() => toggleFilterMenu(column)}
											>▾</button>
											{#if openFilterKey === column}
											<div class="filter-menu">
												<button type="button" class="filter-sort" onclick={() => sortColumn(column, 'asc')}>Sortieren aufsteigend</button>
												<button type="button" class="filter-sort" onclick={() => sortColumn(column, 'desc')}>Sortieren absteigend</button>
												<div class="filter-separator"></div>
												<label class="filter-option">
													<input
														type="checkbox"
														checked={areAllFilterOptionsSelected(column)}
														onchange={(event) => toggleAllFilterOptions(column, event.currentTarget.checked)}
													>
													<span>(Alles auswählen)</span>
												</label>
												{#each getFilterOptions(column) as option}
													<label class="filter-option">
														<input
															type="checkbox"
															checked={isFilterOptionSelected(column, option)}
															onchange={(event) => toggleFilterOption(column, option, event.currentTarget.checked)}
														>
														<span>{option}</span>
													</label>
												{/each}
											</div>
											{/if}
										</div>
									</div>
								</th>
							{/if}
						{/each}
						<th></th>
					</tr>
				</thead>
				<tbody>
					{#each filteredPlayers as player}
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
		position: relative;
		border-radius: 8px;
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
		overflow-x: auto;
		overflow-y: visible;
		display: block;
		max-width: 100%;
	}

	.overview-table {
		table-layout: fixed;
		width: 100%;
		min-width: 980px;
		font-size: 0.78rem;
	}

	.column-head {
		position: relative;
		display: flex;
		align-items: center;
		gap: 0.25rem;
		justify-content: space-between;
		min-width: 0;
	}

	.column-filter {
		position: relative;
		flex: 0 0 auto;
		z-index: 40;
	}

	.column-control {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 1.55rem;
		height: 1.45rem;
		padding: 0;
		font-size: 0.8rem;
		border: 1px solid #b7c0ca;
		border-radius: 2px;
		background-color: #f8f9fa;
		cursor: pointer;
		user-select: none;
	}

	.active-control .column-control {
		border-color: var(--swiss-red);
		background-color: #fff3f2;
	}

	.filter-menu {
		position: absolute;
		top: calc(100% + 0.35rem);
		right: 0;
		z-index: 50;
		width: max-content;
		min-width: 13rem;
		max-width: 18rem;
		max-height: 18rem;
		overflow-y: auto;
		padding: 0.45rem;
		border: 1px solid #c7cdd4;
		border-radius: 6px;
		background: white;
		box-shadow: 0 12px 28px rgba(0, 0, 0, 0.16);
		color: #111827;
	}

	.filter-backdrop {
		position: fixed;
		inset: 0;
		z-index: 35;
		border: 0;
		background: transparent;
		cursor: default;
	}

	.filter-sort {
		display: block;
		width: 100%;
		padding: 0.35rem 0.45rem;
		border: 0;
		border-radius: 4px;
		background: transparent;
		text-align: left;
		white-space: nowrap;
	}

	.filter-sort:hover {
		background: #f1f3f5;
	}

	.filter-separator {
		height: 1px;
		margin: 0.35rem 0;
		background: #d7dce1;
	}

	.filter-option {
		display: flex;
		align-items: center;
		gap: 0.45rem;
		padding: 0.3rem 0.45rem;
		border-radius: 4px;
		font-weight: 400;
		white-space: nowrap;
		cursor: pointer;
	}

	.filter-option:hover {
		background: #f8f9fa;
	}

	th {
		min-width: 0;
		padding: 0.38rem 0.35rem;
		overflow: visible;
		white-space: nowrap;
	}

	td {
		min-width: 0;
		padding: 0.38rem 0.35rem;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.name-col {
		width: 15%;
	}

	.position-col {
		width: 9%;
	}

	.club-col {
		width: 14%;
	}

	.status-col {
		width: 7%;
	}

	.heightCm-col {
		width: 7%;
	}

	.birthDate-col {
		width: 10%;
	}

	.marketValueLabel-col {
		width: 11%;
	}

	.preferredFoot-col {
		width: 9%;
	}

	.details-col {
		width: 6%;
	}

	.btn-sm {
		padding: 0.22rem 0.45rem;
		font-size: 0.78rem;
	}
</style>
