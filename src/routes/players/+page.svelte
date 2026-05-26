<script>
	let { data } = $props();

	const fallbackPlayerImage = '/players/dummy_v1_rot.png';

	function getPlayerImage(player) {
		if (!player?.lastName) {
			return fallbackPlayerImage;
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

	function hideMissingImage(event) {
		event.currentTarget.onerror = null;
		event.currentTarget.src = fallbackPlayerImage;
	}
</script>

<svelte:head>
	<title>Spieler · Swiss Nati</title>
</svelte:head>

<div class="container py-5">

	<!-- Seitenkopf mit Titel und "Neuer Spieler"-Button -->
	<div class="d-flex justify-content-between align-items-center mb-4">
		<div>
			<h1 class="fw-bold mb-1">👥 Spieler</h1>
			<p class="text-muted mb-0">Alle Spieler der Schweizer Nationalmannschaft</p>
		</div>
		<a href="/players/create" class="btn btn-primary">
			+ Neuer Spieler
		</a>
	</div>

{#if data.players.length === 0}
	<div class="alert alert-info" role="alert">
		<strong>📌 Noch keine Spieler erfasst.</strong>
		<br>
		Klicke oben auf <em>"+ Neuer Spieler"</em>, um den ersten Spieler hinzuzufügen.
	</div>
{:else}
	<div class="row g-4">
		{#each data.players as player}
			<div class="col-md-4">
				<div class="card h-100 shadow-sm border-0 player-card">
					<div class="card-body text-center">
						<img
							class="player-photo"
							src={getPlayerImage(player)}
							alt={`${player.firstName} ${player.lastName}`}
							onerror={hideMissingImage}
						/>
						<h2 class="h5 fw-bold mb-2">
							{player.firstName} {player.lastName}
						</h2>
						<p class="text-muted mb-3">{player.position}</p>
						<a href={`/players/${player._id}/details`} class="btn btn-outline-primary">
							Details
						</a>
					</div>
				</div>
			</div>
		{/each}
	</div>
{/if}

</div>

<style>
	.player-card {
		border-radius: 8px;
	}

	.player-photo {
		width: 96px;
		height: 96px;
		object-fit: cover;
		object-position: top center;
		border-radius: 50%;
		border: 3px solid white;
		box-shadow: 0 6px 18px rgba(0, 0, 0, 0.18);
		margin-bottom: 16px;
		background: #f8f9fa;
	}
</style>
