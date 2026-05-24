<section class="bg-primary text-white py-5">
	<div class="container py-5">
		<div class="row align-items-center">
			<div class="col-lg-8">
				<h1 class="display-3 fw-bold mb-3">
					🇨🇭 Schweizer Nationalmannschaft
				</h1>
				<p class="lead mb-4">
					Verwalte Spieler, Spiele und Kader-Aufstellungen der Schweizer Fussball-Nationalmannschaft
					an einem zentralen Ort. Stelle für jedes Spiel den passenden Kader zusammen - übersichtlich,
					schnell und jederzeit anpassbar.
				</p>
				<div class="d-flex gap-3 flex-wrap">
					<a href="/players" class="btn btn-light btn-lg fw-semibold">
						👥 Zur Spielerliste
					</a>
					<a href="/games" class="btn btn-outline-light btn-lg fw-semibold">
						⚽ Zur Spieleliste
					</a>
				</div>
			</div>
		</div>
	</div>
</section>

<section class="py-5">
	<div class="container">
		<h2 class="text-center mb-5">Was kannst du hier tun?</h2>
		<div class="row g-4">
			<div class="col-md-4">
				<div class="feature-card card h-100 shadow-sm border-0">
					<a href="/players" class="feature-card-link" aria-label="Spieler verwalten"></a>
					<div class="card-body text-center p-4">
						<div class="display-4 mb-3">👥</div>
						<h3 class="h5 fw-bold">Spieler verwalten</h3>
						<p class="text-muted mb-0">
							Erfasse Spieler mit Position, Club und Status. Behalte den Überblick,
							wer fit oder verletzt ist.
						</p>
					</div>
				</div>
			</div>

			<div class="col-md-4">
				<div class="feature-card card h-100 shadow-sm border-0">
					<a href="/games" class="feature-card-link" aria-label="Spiele planen"></a>
					<div class="card-body text-center p-4">
						<div class="display-4 mb-3">⚽</div>
						<h3 class="h5 fw-bold">Spiele planen</h3>
						<p class="text-muted mb-0">
							Trage kommende Spiele ein - Gegner, Datum, Ort und Wettbewerb. Alles an einem Ort.
						</p>
					</div>
				</div>
			</div>

			<div class="col-md-4">
				<div class="feature-card card h-100 shadow-sm border-0">
					<a href="/lineup" class="feature-card-link" aria-label="Kader aufstellen"></a>
					<div class="card-body text-center p-4">
						<div class="display-4 mb-3">📋</div>
						<h3 class="h5 fw-bold">Kader aufstellen</h3>
						<p class="text-muted mb-0">
							Stelle für jedes Spiel den Kader zusammen. Schnell anpassen, wenn sich etwas ändert.
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.feature-card {
		position: relative;
		color: inherit;
		cursor: pointer;
		transition:
			transform 0.16s ease,
			box-shadow 0.16s ease;
	}

	.feature-card-link {
		position: absolute;
		inset: 0;
		z-index: 3;
		border-radius: inherit;
	}

	.feature-card:hover,
	.feature-card:focus-within {
		color: inherit;
		transform: translateY(-3px);
		box-shadow: 0 12px 28px rgba(0, 0, 0, 0.14) !important;
	}

	.feature-card-link:focus-visible {
		outline: 3px solid var(--swiss-red);
		outline-offset: 4px;
	}
</style>
