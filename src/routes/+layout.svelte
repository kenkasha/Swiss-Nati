<script>
	import favicon from '$lib/assets/favicon.svg';
	import { page } from '$app/state';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Swiss Nati Matchday Manager</title>
</svelte:head>

<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
	<div class="container">
		<a class="navbar-brand fw-bold" href="/">
			🇨🇭 Swiss Nati
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

<footer class="bg-dark text-white text-center py-3 mt-5">
	<small>Swiss Nati Matchday Manager · Prototyping-Projekt FS26</small>
</footer>