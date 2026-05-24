<script>
	let { data } = $props();

	let player = $derived(data.player);

	const labels = {
		_id: 'ID',
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

	function getPlayerImage() {
		if (!player?.lastName) {
			return '';
		}

		const lastNameSlug = player.lastName.split(' ')[0].toLowerCase();
		const imageName = (lastNameSlug === 'cömert' ? lastNameSlug : lastNameSlug
			.toLowerCase()
			.replace(/ä/g, 'ae')
			.replace(/ö/g, 'oe')
			.replace(/ü/g, 'ue')
			.normalize('NFD')
			.replace(/[\u0300-\u036f]/g, '')
			.replace(/[^a-z0-9]+/g, '-')
			.replace(/^-|-$/g, ''));

		return `/players/${imageName}.jpg`;
	}

	function getEntries() {
		return Object.entries(player).filter(([key]) => key !== '_id');
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

	function hideMissingImage(event) {
		event.currentTarget.hidden = true;
	}
</script>

<svelte:head>
	<title>{player.firstName} {player.lastName} · Swiss Nati</title>
</svelte:head>

<div class="container py-5">
	<a href="/players" class="text-decoration-none mb-3 d-inline-block">← Zurück zur Spielerliste</a>

	<div class="player-detail">
		<div class="player-portrait">
			<img
				class="player-photo"
				src={getPlayerImage()}
				alt={`${player.firstName} ${player.lastName}`}
				onerror={hideMissingImage}
			/>
			<h1 class="fw-bold mb-1">{player.firstName} {player.lastName}</h1>
			<p class="text-muted mb-3">{player.position}</p>
			<a href={`/players/${player._id}/edit`} class="btn btn-primary">Bearbeiten</a>
		</div>

		<div class="card shadow-sm border-0">
			<div class="card-body p-4">
				<h2 class="h4 fw-bold mb-4">Spielerdaten</h2>

				<div class="detail-list">
					{#each getEntries() as [key, value]}
						<div class="detail-row">
							<strong>{getLabel(key)}</strong>
							<span>{formatValue(key, value)}</span>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.player-detail {
		display: grid;
		grid-template-columns: minmax(220px, 320px) 1fr;
		gap: 24px;
		align-items: start;
	}

	.player-portrait {
		text-align: center;
	}

	.player-photo {
		width: 180px;
		height: 180px;
		object-fit: cover;
		object-position: top center;
		border-radius: 50%;
		border: 4px solid white;
		box-shadow: 0 10px 28px rgba(0, 0, 0, 0.2);
		margin-bottom: 18px;
		background: #f8f9fa;
	}

	.detail-list {
		display: grid;
		gap: 12px;
	}

	.detail-row {
		display: grid;
		grid-template-columns: minmax(140px, 220px) 1fr;
		gap: 16px;
		padding-bottom: 12px;
		border-bottom: 1px solid #edf0f2;
	}

	.detail-row:last-child {
		border-bottom: 0;
		padding-bottom: 0;
	}

	.detail-row span {
		color: #495057;
	}

	@media (max-width: 768px) {
		.player-detail,
		.detail-row {
			grid-template-columns: 1fr;
		}
	}
</style>
