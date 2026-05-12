<script>
	import './lineup.css';

	import akanjiImage from '$lib/assets/players/akanji.jpg';
	import xhakaImage from '$lib/assets/players/xhaka.jpg';
	import emboloImage from '$lib/assets/players/embolo.jpg';

	let { data } = $props();

	let positions = $state([
		{ label: 'Torwart', selectedPlayer: '' },
		{ label: 'Linksverteidigung', selectedPlayer: '' },
		{ label: 'Innenverteidigung', selectedPlayer: '' },
		{ label: 'Innenverteidigung', selectedPlayer: '' },
		{ label: 'Rechtsverteidigung', selectedPlayer: '' },
		{ label: 'Mittelfeld', selectedPlayer: '' },
		{ label: 'Mittelfeld', selectedPlayer: '' },
		{ label: 'Mittelfeld', selectedPlayer: '' },
		{ label: 'Linker Flügel', selectedPlayer: '' },
		{ label: 'Stürmer', selectedPlayer: '' },
		{ label: 'Rechter Flügel', selectedPlayer: '' }
	]);

	let playerImages = {
		'Manuel Akanji': akanjiImage,
		'Granit Xhaka': xhakaImage,
		'Breel Embolo': emboloImage
	};

	function getPlayerImage(playerName) {
		return playerImages[playerName];
	}
</script>

<svelte:head>
	<title>Aufstellung · Swiss Nati</title>
</svelte:head>

<div class="container py-5">
	<div class="mb-4">
		<h1 class="fw-bold mb-1">📋 Matchday-Aufstellung</h1>
		<p class="text-muted mb-0">
			Stelle eine mögliche Startelf der Schweizer Nationalmannschaft zusammen.
		</p>
	</div>

	<div class="football-field">
		<div class="halfway-line"></div>
		<div class="center-circle"></div>

		{#each positions as position, index}
			<div class="player-slot slot-{index + 1}">
				<label class="position-label">{position.label}</label>

				<select class="form-select form-select-sm" bind:value={position.selectedPlayer}>
					<option value="">Spieler wählen</option>
					{#each data.players as player}
						<option value={`${player.firstName} ${player.lastName}`}>
							{player.firstName} {player.lastName}
						</option>
					{/each}
				</select>

				{#if position.selectedPlayer}
{#if getPlayerImage(position.selectedPlayer)}
	<div class="selected-player-card">
		<img 
			class="lineup-player-photo"
			src={getPlayerImage(position.selectedPlayer)} 
			alt={position.selectedPlayer} 
		/>
		<div class="selected-player-name">
			{position.selectedPlayer}
		</div>
	</div>
{:else}
		<div class="selected-player">
			{position.selectedPlayer}
		</div>
	{/if}
{/if}
			</div>
		{/each}
	</div>
</div>