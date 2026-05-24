<script>
	import './lineup.css';

	import akanjiImage from '$lib/assets/players/akanji.jpg';
	import xhakaImage from '$lib/assets/players/xhaka.jpg';
	import emboloImage from '$lib/assets/players/embolo.jpg';

	let { data } = $props();

	const defaultPositions = [
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
	];

	let positions = $state(getInitialPositions());

	let playerImages = {
		'Manuel Akanji': akanjiImage,
		'Granit Xhaka': xhakaImage,
		'Breel Embolo': emboloImage
	};

	function getInitialPositions() {
		return defaultPositions.map((position, index) => ({
			...position,
			selectedPlayer: data.lineup?.positions?.[index]?.selectedPlayer ?? ''
		}));
	}

	function changeGame(event) {
		const gameId = event.currentTarget.value;
		window.location.href = gameId ? `/lineup?gameId=${gameId}` : '/lineup';
	}

	function getSelectedGame() {
		return data.games.find((game) => game._id === data.selectedGameId);
	}

	function getPlayerName(playerId) {
		const player = data.players.find((player) => player._id === playerId);
		return player ? `${player.firstName} ${player.lastName}` : '';
	}

	function getAllowedPlayerPosition(positionLabel) {
		if (positionLabel === 'Torwart') {
			return 'Goalie';
		}

		if (
			positionLabel === 'Linksverteidigung' ||
			positionLabel === 'Innenverteidigung' ||
			positionLabel === 'Rechtsverteidigung'
		) {
			return 'Verteidigung';
		}

		if (positionLabel === 'Mittelfeld') {
			return 'Mittelfeld';
		}

		return 'Sturm';
	}

	function getSelectedPlayerIds(currentIndex) {
		return positions
			.map((position, index) => (index === currentIndex ? '' : position.selectedPlayer))
			.filter(Boolean);
	}

	function getPlayersForPosition(positionLabel, currentIndex) {
		const allowedPosition = getAllowedPlayerPosition(positionLabel);
		const selectedPlayerIds = getSelectedPlayerIds(currentIndex);
		return data.players.filter(
			(player) => player.position === allowedPosition && !selectedPlayerIds.includes(player._id)
		);
	}

	function getPlayerImage(playerId) {
		return playerImages[getPlayerName(playerId)];
	}
</script>

<svelte:head>
	<title>Aufstellung · Swiss Nati</title>
</svelte:head>

<div class="container py-5">
	<div class="mb-4">
		<h1 class="fw-bold mb-1">📋 Matchday-Aufstellung</h1>
		<p class="text-muted mb-0">
			Wähle ein Spiel und stelle dafür die Startelf der Schweizer Nationalmannschaft zusammen.
		</p>
	</div>

	{#if data.games.length === 0}
		<div class="alert alert-info" role="alert">
			<strong>📌 Noch keine Spiele erfasst.</strong>
			<br>
			Erstelle zuerst ein Spiel, bevor du eine Aufstellung speichern kannst.
		</div>
	{:else}
		<div class="lineup-toolbar mb-4">
			<div>
				<label for="gameId" class="form-label fw-semibold">Spiel auswählen</label>
				<select id="gameId" class="form-select" value={data.selectedGameId} onchange={changeGame}>
					{#each data.games as game}
						<option value={game._id}>
							Schweiz vs. {game.opponent} · {game.date}
						</option>
					{/each}
				</select>
			</div>

			{#if getSelectedGame()}
				<div class="selected-game-summary">
					<strong>Aktuelles Spiel:</strong>
					<span>Schweiz vs. {getSelectedGame().opponent}</span>
				</div>
			{/if}
		</div>

		<form method="POST" action={`?/saveLineup&gameId=${data.selectedGameId}`}>
			<div class="football-field">
				<div class="halfway-line"></div>
				<div class="center-circle"></div>

				{#each positions as position, index}
					<div class="player-slot slot-{index + 1}">
						<label class="position-label" for={`position-${index}`}>{position.label}</label>
						<input type="hidden" name={`label-${index}`} value={position.label}>

						<select
							id={`position-${index}`}
							name={`position-${index}`}
							class="form-select form-select-sm"
							bind:value={position.selectedPlayer}
						>
							<option value="">Spieler wählen</option>
							{#each getPlayersForPosition(position.label, index) as player}
								<option value={player._id}>
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
										alt={getPlayerName(position.selectedPlayer)}
									/>
									<div class="selected-player-name">
										{getPlayerName(position.selectedPlayer)}
									</div>
								</div>
							{:else}
								<div class="selected-player">
									{getPlayerName(position.selectedPlayer)}
								</div>
							{/if}
						{/if}
					</div>
				{/each}
			</div>

			<div class="text-center mt-4">
				<button type="submit" class="btn btn-primary btn-lg">
					Aufstellung speichern
				</button>
			</div>
		</form>
	{/if}
</div>
