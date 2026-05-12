<script>
let { data } = $props();
</script>

<svelte:head>
	<title>Spiele · Swiss Nati</title>
</svelte:head>

<div class="container py-5">

	<!-- Seitenkopf -->
	<div class="d-flex justify-content-between align-items-center mb-4">
		<div>
			<h1 class="fw-bold mb-1">⚽ Spiele</h1>
			<p class="text-muted mb-0">Alle Spiele der Schweizer Nationalmannschaft</p>
		</div>
		<a href="/games/create" class="btn btn-primary">
			+ Neues Spiel
		</a>
	</div>

{#if data.games.length === 0}
	<div class="alert alert-info" role="alert">
		<strong>📌 Noch keine Spiele erfasst.</strong>
		<br>
		Klicke oben auf <em>"+ Neues Spiel"</em>, um das erste Spiel hinzuzufügen.
	</div>
{:else}
	<div class="row g-4">
		{#each data.games as game}
			<div class="col-md-6">
				<div class="card shadow-sm border-0 h-100">
					<div class="card-body">

						<h3 class="h4 fw-bold mb-3">
							🇨🇭 Schweiz vs. {game.opponent}
						</h3>

						<p class="mb-2">
							<strong>📅 Datum:</strong> {game.date}
						</p>

						<p class="mb-2">
							<strong>📍 Ort:</strong> {game.location}
						</p>

						<p class="mb-3">
							<strong>🏆 Wettbewerb:</strong> {game.competition}
						</p>

					</div>
				</div>
			</div>
		{/each}
	</div>
{/if}
</div>