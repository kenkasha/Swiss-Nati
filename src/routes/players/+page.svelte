<script>
	let { data } = $props();
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
				<div class="card h-100 shadow-sm">
					<div class="card-body">
						<h2 class="h5 fw-bold">
							{player.firstName} {player.lastName}
						</h2>
						<p class="mb-1"><strong>Position:</strong> {player.position}</p>
						<p class="mb-1"><strong>Club:</strong> {player.club}</p>
						<p class="mb-0">
							<strong>Status:</strong>
							<span class="badge bg-success">{player.status}</span>
						</p>
					</div>
				</div>
			</div>
		{/each}
	</div>
{/if}

</div>