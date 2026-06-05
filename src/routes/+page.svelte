<section class="bg-primary text-white py-5">
	<div class="container py-5">
		<div class="row align-items-center">
			<div class="col-lg-8">
				<h1 class="home-hero-title display-3 fw-bold mb-3">
					<span class="home-hero-title-text">
						<span>Schweizer</span>
						<span>Nationalmannschaft</span>
					</span>
					<img class="home-hero-logo" src="/logo/SFV_Logo_sw.webp" alt="SFV Logo">
				</h1>
				<p class="lead mb-4">
					Verwalte Spieler, Spiele und Kader-Aufstellungen der Schweizer Fussball-Nationalmannschaft
					an einem zentralen Ort. Stelle für jedes Spiel den passenden Kader zusammen - übersichtlich,
					schnell und jederzeit anpassbar.
				</p>
				<div class="d-flex gap-3 flex-wrap">
					<a href="/players" class="btn btn-light btn-lg fw-semibold">
						Zur Spielerliste
					</a>
					<a href="/games" class="btn btn-outline-light btn-lg fw-semibold">
						Zur Spieleliste
					</a>
				</div>
			</div>
		</div>
	</div>
</section>

<section class="py-5">
	<div class="container">
		<div
			id="homeCarousel"
			class="carousel slide home-carousel shadow-sm"
			data-bs-ride="carousel"
			data-bs-interval="3500"
		>
			<div class="carousel-indicators">
				<button type="button" data-bs-target="#homeCarousel" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Bild 1"></button>
				<button type="button" data-bs-target="#homeCarousel" data-bs-slide-to="1" aria-label="Bild 2"></button>
				<button type="button" data-bs-target="#homeCarousel" data-bs-slide-to="2" aria-label="Bild 3"></button>
				<button type="button" data-bs-target="#homeCarousel" data-bs-slide-to="3" aria-label="Bild 4"></button>
				<button type="button" data-bs-target="#homeCarousel" data-bs-slide-to="4" aria-label="Bild 5"></button>
				<button type="button" data-bs-target="#homeCarousel" data-bs-slide-to="5" aria-label="Bild 6"></button>
			</div>

			<div class="carousel-inner">
				<div class="carousel-item active">
					<img src="/carousel/2f690db1-e1b6-412d-810a-43240aeb073f.png" class="d-block w-100" alt="Schweizer Nationalmannschaft">
				</div>
				<div class="carousel-item">
					<img src="/carousel/8bf13e19-a38f-4a72-a78c-f27989ac8eb9.png" class="d-block w-100" alt="Schweizer Nationalmannschaft">
				</div>
				<div class="carousel-item">
					<img src="/carousel/9f18c17c-1b92-4588-be2c-0e9a1fc661ae.png" class="d-block w-100" alt="Schweizer Nationalmannschaft">
				</div>
				<div class="carousel-item">
					<img src="/carousel/a8ce05dc-6bbc-407a-a6ac-b3405a5ffdca.png" class="d-block w-100" alt="Schweizer Nationalmannschaft">
				</div>
				<div class="carousel-item">
					<img src="/carousel/f94f194a-4568-4885-ae7f-1a56f9963b1c.png" class="d-block w-100" alt="Schweizer Nationalmannschaft">
				</div>
				<div class="carousel-item">
					<img src="/carousel/ff928d61-588e-4a4a-82cc-976b9048730f.png" class="d-block w-100" alt="Schweizer Nationalmannschaft">
				</div>
			</div>

			<button class="carousel-control-prev" type="button" data-bs-target="#homeCarousel" data-bs-slide="prev">
				<span class="carousel-control-prev-icon" aria-hidden="true"></span>
				<span class="visually-hidden">Zurück</span>
			</button>
			<button class="carousel-control-next" type="button" data-bs-target="#homeCarousel" data-bs-slide="next">
				<span class="carousel-control-next-icon" aria-hidden="true"></span>
				<span class="visually-hidden">Weiter</span>
			</button>
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
	.home-carousel {
		overflow: hidden;
		border-radius: 8px;
		background: #111;
	}

	.home-hero-title {
		position: relative;
		display: inline-block;
		padding-right: 2em;
	}

	.home-hero-title-text {
		display: flex;
		flex-direction: column;
		line-height: 1.05;
	}

	.home-hero-logo {
		position: absolute;
		top: 0.02em;
		left: 4.22em;
		width: 2.45em;
		height: auto;
		mix-blend-mode: multiply;
	}

	@media (max-width: 768px) {
		.home-hero-title {
			padding-right: 0;
		}

		.home-hero-logo {
			position: static;
			display: block;
			width: 92px;
			margin-top: 0.75rem;
		}
	}

	.home-carousel .carousel-item {
		height: 480px;
		background:
			linear-gradient(rgba(0, 0, 0, 0.28), rgba(0, 0, 0, 0.28)),
			#111;
	}

	.home-carousel .carousel-item.active {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.home-carousel img {
		width: 100% !important;
		height: 100%;
		object-fit: cover;
		object-position: center 28%;
	}

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

	@media (max-width: 768px) {
		.home-carousel .carousel-item {
			height: 320px;
		}
	}
</style>
