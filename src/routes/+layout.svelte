<script>
	import favicon from '$lib/assets/favicon.svg';
	import swissFlag from '$lib/assets/swiss-flag.svg';
	import { page } from '$app/state';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Schweizer Nationalmannschaft – Matchday Manager</title>
</svelte:head>

<nav class="navbar navbar-expand-lg navbar-dark swiss-navbar">
	<div class="container">
		<a class="navbar-brand fw-bold d-flex align-items-center gap-2" href="/">
			<img src={swissFlag} alt="Schweizer Flagge" width="28" height="28" class="rounded-1" />
			Schweizer Nationalmannschaft
		</a>
		<button
			class="navbar-toggler"
			type="button"
			data-bs-toggle="collapse"
			data-bs-target="#navbarNav"
			aria-controls="navbarNav"
			aria-expanded="false"
			aria-label="Toggle navigation"
		>
			<span class="navbar-toggler-icon"></span>
		</button>
		<div class="collapse navbar-collapse" id="navbarNav">
			<ul class="navbar-nav ms-auto">
				<li class="nav-item">
					<a
						class="nav-link"
						class:active={page.url.pathname === '/'}
						href="/"
					>Home</a>
				</li>
				<li class="nav-item">
					<a
						class="nav-link"
						class:active={page.url.pathname.startsWith('/players')}
						href="/players"
					>Spieler</a>
				</li>
				<li class="nav-item">
					<a
						class="nav-link"
						class:active={page.url.pathname.startsWith('/games')}
						href="/games"
					>Spiele</a>
				</li>
				<li class="nav-item">
					<a
						class="nav-link"
						class:active={page.url.pathname.startsWith('/lineup')}
						href="/lineup"
					>Aufstellung</a>
				</li>
			</ul>
		</div>
	</div>
</nav>

<main class="min-vh-100">
	{@render children()}
</main>

<footer class="swiss-footer text-white text-center py-3 mt-5">
	<small>Schweizer Nationalmannschaft · Matchday Manager · Prototyping-Projekt FS26</small>
</footer>

<style>
	:global(:root) {
		--swiss-red: #D52B1E;
		--swiss-red-dark: #a82116;
		--swiss-red-light: #e84538;
	}

	:global(.bg-primary) {
		background-color: var(--swiss-red) !important;
	}

	:global(.btn-primary) {
		background-color: var(--swiss-red) !important;
		border-color: var(--swiss-red) !important;
	}

	:global(.btn-primary:hover) {
		background-color: var(--swiss-red-dark) !important;
		border-color: var(--swiss-red-dark) !important;
	}

	:global(.btn-outline-primary) {
		color: var(--swiss-red) !important;
		border-color: var(--swiss-red) !important;
	}

	:global(.btn-outline-primary:hover) {
		background-color: var(--swiss-red) !important;
		color: white !important;
	}

	:global(.text-primary) {
		color: var(--swiss-red) !important;
	}

	:global(.border-primary) {
		border-color: var(--swiss-red) !important;
	}

	:global(.badge.bg-primary) {
		background-color: var(--swiss-red) !important;
	}

	.swiss-navbar {
		background-color: var(--swiss-red) !important;
	}

	.swiss-footer {
		background-color: var(--swiss-red-dark);
	}
</style>
