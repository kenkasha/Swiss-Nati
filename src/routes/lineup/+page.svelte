<script>
	import './lineup.css';

	let { data } = $props();
	const fallbackPlayerImage = '/players/dummy_v1_rot.png';

	const formations = {
		'4-3-3': [
			'Torwart',
			'Linksverteidigung',
			'Innenverteidiger',
			'Innenverteidiger',
			'Rechtsverteidigung',
			'Zentrales Mittelfeld',
			'Defensives Mittelfeld',
			'Zentrales Mittelfeld',
			'Linker Flügel',
			'Stürmer',
			'Rechter Flügel'
		],
		'4-2-3-1': [
			'Torwart',
			'Linksverteidigung',
			'Innenverteidiger',
			'Innenverteidiger',
			'Rechtsverteidigung',
			'Defensives Mittelfeld',
			'Defensives Mittelfeld',
			'Offensives Mittelfeld',
			'Linker Flügel',
			'Stürmer',
			'Rechter Flügel'
		],
		'4-4-2': [
			'Torwart',
			'Linksverteidigung',
			'Innenverteidiger',
			'Innenverteidiger',
			'Rechtsverteidigung',
			'Linkes Mittelfeld',
			'Zentrales Mittelfeld',
			'Zentrales Mittelfeld',
			'Rechtes Mittelfeld',
			'Stürmer',
			'Stürmer'
		],
		'3-5-2': [
			'Torwart',
			'Innenverteidiger',
			'Innenverteidiger',
			'Innenverteidiger',
			'Linker Aussenläufer',
			'Defensives Mittelfeld',
			'Zentrales Mittelfeld',
			'Zentrales Mittelfeld',
			'Rechter Aussenläufer',
			'Stürmer',
			'Stürmer'
		],
		'3-4-3': [
			'Torwart',
			'Innenverteidiger',
			'Innenverteidiger',
			'Innenverteidiger',
			'Linkes Mittelfeld',
			'Zentrales Mittelfeld',
			'Zentrales Mittelfeld',
			'Rechtes Mittelfeld',
			'Linker Flügel',
			'Stürmer',
			'Rechter Flügel'
		],
		'5-3-2': [
			'Torwart',
			'Linksverteidigung',
			'Innenverteidiger',
			'Innenverteidiger',
			'Innenverteidiger',
			'Rechtsverteidigung',
			'Zentrales Mittelfeld',
			'Defensives Mittelfeld',
			'Zentrales Mittelfeld',
			'Stürmer',
			'Stürmer'
		]
	};

	const formationOptions = Object.keys(formations);

	let selectedFormation = $state('4-3-3');
	let positions = $state([]);

	$effect.pre(() => {
		if (positions.length === 0) {
			selectedFormation = data.lineup?.formation ?? '4-3-3';
			positions = getInitialPositions();
		}
	});

	function createPositions(formation) {
		return formations[formation].map((label) => ({
			label,
			selectedPlayer: ''
		}));
	}

	function getInitialPositions() {
		const labels = formations[selectedFormation] ?? formations['4-3-3'];

		return labels.map((label, index) => ({
			label,
			selectedPlayer: data.lineup?.positions?.[index]?.selectedPlayer ?? ''
		}));
	}

	function changeFormation(event) {
		selectedFormation = event.currentTarget.value;
		const oldPositions = positions;
		const usedPlayerIds = new Set();

		positions = createPositions(selectedFormation).map((position, index) => {
			const previousPlayerId = oldPositions[index]?.selectedPlayer ?? '';

			if (
				previousPlayerId &&
				!usedPlayerIds.has(previousPlayerId) &&
				getPlayer(previousPlayerId)?.position === getAllowedPlayerPosition(position.label)
			) {
				usedPlayerIds.add(previousPlayerId);
				return {
					...position,
					selectedPlayer: previousPlayerId
				};
			}

			return position;
		});
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

	function getPlayer(playerId) {
		return data.players.find((player) => player._id === playerId);
	}

	function getAllowedPlayerPosition(positionLabel) {
		if (positionLabel === 'Torwart') {
			return 'Goalie';
		}

		if (
			positionLabel === 'Linksverteidigung' ||
			positionLabel === 'Innenverteidigung' ||
			positionLabel === 'Innenverteidiger' ||
			positionLabel === 'Rechtsverteidigung' ||
			positionLabel === 'Linker Aussenläufer' ||
			positionLabel === 'Rechter Aussenläufer'
		) {
			return 'Verteidigung';
		}

		if (
			positionLabel === 'Mittelfeld' ||
			positionLabel === 'Zentrales Mittelfeld' ||
			positionLabel === 'Defensives Mittelfeld' ||
			positionLabel === 'Offensives Mittelfeld' ||
			positionLabel === 'Linkes Mittelfeld' ||
			positionLabel === 'Rechtes Mittelfeld'
		) {
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
		const player = getPlayer(playerId);

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

	function getFormationClass() {
		return `formation-${selectedFormation}`;
	}

	function hideMissingImage(event) {
		event.currentTarget.onerror = null;
		event.currentTarget.src = fallbackPlayerImage;
	}

	function showLoadedImage(event) {
		event.currentTarget.hidden = false;
	}
</script>

<svelte:head>
	<title>Aufstellung · Swiss Nati</title>
</svelte:head>

<div class="container py-5">
	<div class="mb-4">
		<h1 class="fw-bold mb-1">📋 Matchday-Aufstellung</h1>
		<p class="text-muted mb-0">
			Wähle ein Spiel, eine Formation und stelle dafür die Startelf der Schweizer Nationalmannschaft zusammen.
		</p>
	</div>

	{#if data.games.length === 0}
		<div class="alert alert-info" role="alert">
			<strong>📌 Noch keine Spiele erfasst.</strong>
			<br>
			Erstelle zuerst ein Spiel, bevor du eine Aufstellung speichern kannst.
		</div>
	{:else}
		<form method="POST" action={`?/saveLineup&gameId=${data.selectedGameId}`}>
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

				<div>
					<label for="formation" class="form-label fw-semibold">Formation</label>
					<select
						id="formation"
						name="formation"
						class="form-select"
						bind:value={selectedFormation}
						onchange={changeFormation}
					>
						{#each formationOptions as formation}
							<option value={formation}>{formation}</option>
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

			<div class={`football-field ${getFormationClass()}`}>
				<div class="halfway-line"></div>
				<div class="center-circle"></div>

				{#each positions as position, index}
					<div class:has-player={position.selectedPlayer} class="player-slot slot-{index + 1}">
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
							<div class="selected-player-card">
								{#key getPlayerImage(position.selectedPlayer)}
									<img
										class="lineup-player-photo"
										src={getPlayerImage(position.selectedPlayer)}
										alt={getPlayerName(position.selectedPlayer)}
										onload={showLoadedImage}
										onerror={hideMissingImage}
									/>
								{/key}
								<div class="selected-player-name">
									{getPlayerName(position.selectedPlayer)}
								</div>
							</div>
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
