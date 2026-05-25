<script>
	import { onMount } from 'svelte';

	let { data } = $props();

	const shotZones = [
		{ id: 'leftTop', label: 'Links oben', className: 'zone-left-top' },
		{ id: 'centerTop', label: 'Mitte oben', className: 'zone-center-top' },
		{ id: 'rightTop', label: 'Rechts oben', className: 'zone-right-top' },
		{ id: 'leftBottom', label: 'Links unten', className: 'zone-left-bottom' },
		{ id: 'centerBottom', label: 'Mitte unten', className: 'zone-center-bottom' },
		{ id: 'rightBottom', label: 'Rechts unten', className: 'zone-right-bottom' }
	];

	const goalies = $derived(data.players.filter((player) => player.position === 'Goalie'));
	const shooters = $derived(data.players.filter((player) => player.position !== 'Goalie'));

	let selectedShooterId = $state('');
	let selectedGoalie = $state(null);
	let lastShot = $state(null);
	let lastSave = $state(null);
	let result = $state('Wähle einen Spieler und ziele auf eine Ecke.');
	let goals = $state(0);
	let saves = $state(0);
	let attempts = $state(0);
	let aimX = $state(50);
	let aimY = $state(55);
	let ballX = $state(null);
	let ballY = $state(null);
	let keeperX = $state(50);
	let keeperY = $state(75);
	let shotKey = $state(0);
	let isKicking = $state(false);
	let wasSaved = $state(false);
	let ballLaunchTimer = null;
	let ballResetTimer = null;
	let goalieDirection = 1;
	let goalieMoveTimer = null;

	const selectedShooter = $derived(
		shooters.find((player) => player._id === selectedShooterId) ?? shooters[0]
	);

	$effect(() => {
		if (!selectedShooterId && shooters[0]?._id) {
			selectedShooterId = shooters[0]._id;
		}

		if (!selectedGoalie && goalies.length > 0) {
			selectedGoalie = getRandomGoalie();
		}
	});

	onMount(() => {
		goalieMoveTimer = setInterval(() => {
			if (!selectedGoalie || isKicking || ballX !== null) {
				return;
			}

			const step = 5 + Math.random() * 4;
			const nextX = keeperX + goalieDirection * step;

			if (nextX > 72) {
				keeperX = 72;
				goalieDirection = -1;
			} else if (nextX < 28) {
				keeperX = 28;
				goalieDirection = 1;
			} else {
				keeperX = nextX;
			}

			keeperY = 68 + Math.random() * 8;
		}, 520);

		return () => {
			clearInterval(goalieMoveTimer);
		};
	});

	function getRandomGoalie() {
		if (goalies.length === 0) {
			return null;
		}

		return goalies[Math.floor(Math.random() * goalies.length)];
	}

	function getPlayerImage(player) {
		if (!player?.lastName) {
			return '';
		}

		const lastNameSlug = player.lastName.split(' ')[0].toLowerCase();
		const imageName =
			lastNameSlug === 'cömert'
				? lastNameSlug
				: lastNameSlug
						.toLowerCase()
						.replace(/ä/g, 'ae')
						.replace(/ö/g, 'oe')
						.replace(/ü/g, 'ue')
						.normalize('NFD')
						.replace(/[\u0300-\u036f]/g, '')
						.replace(/[^a-z0-9]+/g, '-')
						.replace(/^-|-$/g, '');

		return `/players/${imageName}.jpg`;
	}

	function hideMissingImage(event) {
		event.currentTarget.hidden = true;
	}

	function clamp(value, min, max) {
		return Math.min(Math.max(value, min), max);
	}

	function getPointFromEvent(event) {
		const rect = event.currentTarget.getBoundingClientRect();
		const x = ((event.clientX - rect.left) / rect.width) * 100;
		const y = ((event.clientY - rect.top) / rect.height) * 100;

		return {
			x: clamp(x, 6, 94),
			y: clamp(y, 10, 90)
		};
	}

	function moveAim(event) {
		const point = getPointFromEvent(event);
		aimX = point.x;
		aimY = point.y;
	}

	function getZoneFromPoint(x, y) {
		const horizontal = x < 33 ? 'left' : x > 66 ? 'right' : 'center';
		const vertical = y < 50 ? 'Top' : 'Bottom';
		const id = `${horizontal}${vertical}`;

		return shotZones.find((zone) => zone.id === id) ?? shotZones[1];
	}

	function pickGoaliePoint(targetX, targetY) {
		const readsShot = Math.random() < 0.32;

		if (readsShot) {
			return {
				x: clamp(targetX + (Math.random() * 12 - 6), 8, 92),
				y: clamp(targetY + (Math.random() * 12 - 6), 12, 88)
			};
		}

		return {
			x: clamp(keeperX + (Math.random() * 54 - 27), 8, 92),
			y: clamp(keeperY + (Math.random() * 42 - 21), 12, 88)
		};
	}

	function shoot(event) {
		if (isKicking) {
			return;
		}

		if (!selectedShooter || !selectedGoalie) {
			result = 'Für das Spiel braucht es mindestens einen Feldspieler und einen Goalie.';
			return;
		}

		const shotPoint = getPointFromEvent(event);
		const savePoint = pickGoaliePoint(shotPoint.x, shotPoint.y);
		const distance = Math.hypot(shotPoint.x - savePoint.x, shotPoint.y - savePoint.y);
		const isSaved = distance < 16;

		aimX = shotPoint.x;
		aimY = shotPoint.y;
		shotKey += 1;
		const currentShotKey = shotKey;
		isKicking = true;
		wasSaved = false;
		ballX = null;
		ballY = null;
		lastShot = getZoneFromPoint(shotPoint.x, shotPoint.y);
		lastSave = getZoneFromPoint(savePoint.x, savePoint.y);
		attempts += 1;

		if (ballLaunchTimer) {
			clearTimeout(ballLaunchTimer);
		}

		if (ballResetTimer) {
			clearTimeout(ballResetTimer);
		}

		ballLaunchTimer = setTimeout(() => {
			if (shotKey === currentShotKey) {
				ballX = shotPoint.x;
				ballY = shotPoint.y;
				keeperX = savePoint.x;
				keeperY = savePoint.y;
				wasSaved = isSaved;
			}
		}, 430);

		setTimeout(() => {
			isKicking = false;
		}, 860);

		ballResetTimer = setTimeout(() => {
			if (shotKey === currentShotKey) {
				ballX = null;
				ballY = null;
				wasSaved = false;
			}
		}, 1500);

		if (isSaved) {
			saves += 1;
			result = `Gehalten von ${selectedGoalie.firstName} ${selectedGoalie.lastName}!`;
		} else {
			goals += 1;
			result = `Tor durch ${selectedShooter.firstName} ${selectedShooter.lastName}!`;
		}
	}

	function resetGame() {
		goals = 0;
		saves = 0;
		attempts = 0;
		lastShot = null;
		lastSave = null;
		result = 'Bewege die Maus im Tor und klicke zum Schiessen.';
		aimX = 50;
		aimY = 55;
		ballX = null;
		ballY = null;
		if (ballLaunchTimer) {
			clearTimeout(ballLaunchTimer);
			ballLaunchTimer = null;
		}
		if (ballResetTimer) {
			clearTimeout(ballResetTimer);
			ballResetTimer = null;
		}
		keeperX = 50;
		keeperY = 75;
		goalieDirection = 1;
		isKicking = false;
		wasSaved = false;
		selectedGoalie = getRandomGoalie();
	}

	function changeGoalie() {
		selectedGoalie = getRandomGoalie();
		lastShot = null;
		lastSave = null;
		ballX = null;
		ballY = null;
		if (ballLaunchTimer) {
			clearTimeout(ballLaunchTimer);
			ballLaunchTimer = null;
		}
		if (ballResetTimer) {
			clearTimeout(ballResetTimer);
			ballResetTimer = null;
		}
		keeperX = 50;
		keeperY = 75;
		goalieDirection = 1;
		isKicking = false;
		wasSaved = false;
		result = 'Neuer Goalie im Tor. Bereit für den nächsten Penalty.';
	}
</script>

<svelte:head>
	<title>Penalty Game · Swiss Nati</title>
</svelte:head>

<section class="game-page py-5">
	<div class="container">
		<div class="d-flex justify-content-between align-items-start gap-3 flex-wrap mb-4">
			<div>
				<h1 class="fw-bold mb-2">🎮 Penalty Game</h1>
				<p class="text-muted mb-0">
					Wähle einen Schützen, ziele auf eine Zone und versuche den automatischen Goalie zu
					überwinden.
				</p>
			</div>
			<div class="score-board">
				<div>
					<span class="score-value">{goals}</span>
					<span class="score-label">Tore</span>
				</div>
				<div>
					<span class="score-value">{saves}</span>
					<span class="score-label">Paraden</span>
				</div>
				<div>
					<span class="score-value">{attempts}</span>
					<span class="score-label">Versuche</span>
				</div>
			</div>
		</div>

		{#if shooters.length === 0 || goalies.length === 0}
			<div class="alert alert-warning" role="alert">
				Für das Penalty Game braucht es mindestens einen Feldspieler und einen Spieler mit Position
				Goalie.
			</div>
		{:else if !selectedShooter || !selectedGoalie}
			<div class="alert alert-info" role="alert">
				Das Penalty Game wird vorbereitet.
			</div>
		{:else}
			<div class="row g-4 align-items-stretch">
				<div class="col-lg-4">
					<div class="control-panel h-100">
						<label for="shooter" class="form-label fw-semibold">Schütze wählen</label>
						<select id="shooter" class="form-select mb-3" bind:value={selectedShooterId}>
							{#each shooters as player}
								<option value={player._id}>{player.firstName} {player.lastName}</option>
							{/each}
						</select>

						<div class="player-duel">
							<div>
								<img
									class="duel-photo"
									src={getPlayerImage(selectedShooter)}
									alt={`${selectedShooter.firstName} ${selectedShooter.lastName}`}
									onerror={hideMissingImage}
								/>
								<strong>{selectedShooter.firstName} {selectedShooter.lastName}</strong>
								<span>{selectedShooter.position}</span>
							</div>

							<div>
								<img
									class="duel-photo"
									src={getPlayerImage(selectedGoalie)}
									alt={`${selectedGoalie.firstName} ${selectedGoalie.lastName}`}
									onerror={hideMissingImage}
								/>
								<strong>{selectedGoalie.firstName} {selectedGoalie.lastName}</strong>
								<span>Goalie</span>
							</div>
						</div>

						<div class="d-grid gap-2 mt-4">
							<button type="button" class="btn btn-outline-primary" onclick={changeGoalie}>
								Goalie wechseln
							</button>
							<button type="button" class="btn btn-outline-secondary" onclick={resetGame}>
								Spiel zurücksetzen
							</button>
						</div>
					</div>
				</div>

				<div class="col-lg-8">
					<div class="game-card">
						<div class="goal-scene">
							<div class="pitch-perspective">
								<button
									type="button"
									class="goal-frame"
									onmousemove={moveAim}
									onclick={shoot}
									aria-label="Im Tor zielen und schiessen"
								>
									<div class="net-lines"></div>
									<div class="aim-marker" style={`left:${aimX}%; top:${aimY}%`}></div>

									<div class="keeper-marker" style={`left:${keeperX}%; top:${keeperY}%`}>
										<img
											src={getPlayerImage(selectedGoalie)}
											alt={`${selectedGoalie.firstName} ${selectedGoalie.lastName}`}
											onerror={hideMissingImage}
										/>
									</div>

									{#if ballX !== null && ballY !== null}
										{#key shotKey}
											<div
												class:ball-saved={wasSaved}
												class="ball-marker"
												style={`--ball-x:${ballX}%; --ball-y:${ballY}%`}
											>
												⚽
											</div>
										{/key}
									{/if}
								</button>

								<div class:shooter-kicking={isKicking} class="shooter-figure">
									<div class="player-avatar" aria-hidden="true">
										<div class="figure-head"></div>
										<div class="figure-body">
											<div class="figure-arm arm-left"></div>
											<div class="figure-arm arm-right"></div>
										</div>
										<div class="figure-shorts"></div>
										<div class="figure-leg leg-left"></div>
										<div class="figure-leg leg-right"></div>
									</div>
									<span>{selectedShooter.lastName}</span>
								</div>

								<div class:spot-hidden={ballX !== null} class="penalty-ball">⚽</div>
								<div class="penalty-arc"></div>
							</div>
						</div>

						<div class="result-panel">
							<h2 class="h4 fw-bold mb-2">{result}</h2>
							{#if lastShot && lastSave}
								<p class="text-muted mb-0">
									Schuss: {lastShot.label} · Goalie: {lastSave.label}
								</p>
							{:else}
								<p class="text-muted mb-0">
									Bewege die Maus im Tor und klicke genau dorthin, wo du schiessen möchtest.
								</p>
							{/if}
						</div>
					</div>
				</div>
			</div>
		{/if}
	</div>
</section>

<style>
	.game-page {
		background: #f7f8fa;
		min-height: calc(100vh - 88px);
	}

	.score-board {
		display: flex;
		gap: 0.75rem;
	}

	.score-board > div,
	.control-panel,
	.game-card {
		border-radius: 8px;
		background: white;
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
	}

	.score-board > div {
		min-width: 92px;
		padding: 0.75rem 1rem;
		text-align: center;
	}

	.score-value,
	.score-label {
		display: block;
	}

	.score-value {
		font-size: 1.6rem;
		font-weight: 800;
		color: var(--swiss-red);
		line-height: 1;
	}

	.score-label {
		font-size: 0.82rem;
		color: #6c757d;
		margin-top: 0.25rem;
	}

	.control-panel {
		padding: 1.25rem;
	}

	.player-duel {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
	}

	.player-duel > div {
		display: grid;
		justify-items: center;
		text-align: center;
		gap: 0.35rem;
		padding: 1rem 0.5rem;
		border: 1px solid #e9ecef;
		border-radius: 8px;
		background: #fbfbfc;
	}

	.player-duel span {
		font-size: 0.85rem;
		color: #6c757d;
	}

	.duel-photo {
		width: 78px;
		height: 78px;
		border-radius: 50%;
		object-fit: cover;
		object-position: top center;
		box-shadow: 0 6px 16px rgba(0, 0, 0, 0.16);
		background: #f8f9fa;
	}

	.game-card {
		overflow: visible;
	}

	.goal-scene {
		padding: 1.5rem;
		background:
			linear-gradient(rgba(255, 255, 255, 0.04), rgba(0, 0, 0, 0.08)),
			repeating-linear-gradient(90deg, #2f8b56 0 72px, #287d4d 72px 144px);
		perspective: 900px;
	}

	.pitch-perspective {
		position: relative;
		min-height: 560px;
		max-width: 860px;
		margin: 0 auto;
		overflow: hidden;
		border-radius: 8px;
		background:
			radial-gradient(circle at 50% 105%, transparent 0 18%, rgba(255, 255, 255, 0.9) 18.3% 18.8%, transparent 19%),
			linear-gradient(180deg, rgba(255, 255, 255, 0.9) 42%, transparent 42.5%),
			repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.03) 0 86px, rgba(0, 0, 0, 0.04) 86px 172px);
		transform: rotateX(6deg);
		transform-origin: center bottom;
	}

	.goal-frame {
		position: relative;
		display: block;
		width: min(80%, 700px);
		height: 255px;
		margin: 0 auto;
		border: 8px solid white;
		border-bottom-width: 12px;
		background: rgba(255, 255, 255, 0.16);
		box-shadow: inset 0 0 0 2px rgba(255, 255, 255, 0.45);
		cursor: crosshair;
		overflow: hidden;
		padding: 0;
		transform: translateY(10px) scale(0.92);
		transform-origin: top center;
	}

	.goal-frame:hover,
	.goal-frame:focus-visible {
		outline: 4px solid rgba(255, 255, 255, 0.65);
		outline-offset: 4px;
	}

	.keeper-marker,
	.ball-marker {
		position: absolute;
		z-index: 4;
		display: grid;
		place-items: center;
		pointer-events: none;
		transform: translate(-50%, -50%);
	}

	.keeper-marker {
		transition:
			left 0.42s cubic-bezier(0.2, 0.8, 0.2, 1),
			top 0.42s cubic-bezier(0.2, 0.8, 0.2, 1);
	}

	.net-lines {
		position: absolute;
		inset: 0;
		background-image:
			linear-gradient(rgba(255, 255, 255, 0.48) 1px, transparent 1px),
			linear-gradient(90deg, rgba(255, 255, 255, 0.48) 1px, transparent 1px);
		background-size: 38px 30px;
		opacity: 0.75;
		pointer-events: none;
	}

	.aim-marker {
		position: absolute;
		z-index: 3;
		width: 34px;
		height: 34px;
		border: 3px solid rgba(255, 255, 255, 0.95);
		border-radius: 50%;
		box-shadow: 0 0 0 2px rgba(213, 43, 30, 0.78);
		transform: translate(-50%, -50%);
		pointer-events: none;
	}

	.aim-marker::before,
	.aim-marker::after {
		content: '';
		position: absolute;
		background: rgba(255, 255, 255, 0.95);
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}

	.aim-marker::before {
		width: 44px;
		height: 2px;
	}

	.aim-marker::after {
		width: 2px;
		height: 44px;
	}

	.keeper-marker img {
		width: 68px;
		height: 68px;
		border-radius: 50%;
		object-fit: cover;
		object-position: top center;
		border: 3px solid white;
		box-shadow: 0 6px 14px rgba(0, 0, 0, 0.25);
	}

	.ball-marker {
		left: var(--ball-x);
		top: var(--ball-y);
		font-size: 2rem;
		filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.28));
		animation: ball-flight 0.72s cubic-bezier(0.16, 0.82, 0.22, 1) both;
	}

	.ball-saved {
		animation-name: ball-saved-flight;
	}

	.shooter-figure {
		position: absolute;
		left: 25%;
		bottom: 9%;
		z-index: 5;
		display: grid;
		justify-items: center;
		gap: 0.45rem;
		transform: translateX(-50%);
		transform-origin: center bottom;
		transition: transform 0.18s ease;
	}

	.player-avatar {
		position: relative;
		width: 82px;
		height: 132px;
		filter: drop-shadow(0 12px 12px rgba(0, 0, 0, 0.24));
	}

	.player-avatar::after {
		content: '';
		position: absolute;
		left: 50%;
		bottom: -2px;
		width: 66px;
		height: 12px;
		border-radius: 50%;
		background: rgba(0, 0, 0, 0.24);
		transform: translateX(-50%);
	}

	.figure-head {
		position: absolute;
		left: 50%;
		top: 0;
		width: 34px;
		height: 38px;
		border-radius: 48% 48% 44% 44%;
		background: linear-gradient(145deg, #8f5b39, #c08355);
		box-shadow: inset 0 4px 0 rgba(33, 24, 18, 0.55);
		transform: translateX(-50%);
	}

	.figure-body {
		position: absolute;
		left: 50%;
		top: 36px;
		width: 46px;
		height: 44px;
		border-radius: 14px 14px 8px 8px;
		background: linear-gradient(145deg, #e22f27, #b71d18);
		transform: translateX(-50%);
		transform-origin: center bottom;
	}

	.figure-body::before,
	.figure-body::after {
		content: '';
		position: absolute;
		left: 50%;
		top: 50%;
		border-radius: 2px;
		background: white;
		transform: translate(-50%, -50%);
	}

	.figure-body::before {
		width: 24px;
		height: 6px;
	}

	.figure-body::after {
		width: 6px;
		height: 24px;
	}

	.figure-arm,
	.figure-leg {
		position: absolute;
		border-radius: 999px;
		transform-origin: top center;
	}

	.figure-arm {
		top: 8px;
		width: 10px;
		height: 44px;
		background: linear-gradient(#9b6844, #744426);
	}

	.arm-left {
		left: -7px;
		transform: rotate(19deg);
	}

	.arm-right {
		right: -7px;
		transform: rotate(-22deg);
	}

	.figure-shorts {
		position: absolute;
		left: 50%;
		top: 76px;
		width: 42px;
		height: 21px;
		border-radius: 6px 6px 10px 10px;
		background: #f8f9fa;
		transform: translateX(-50%);
	}

	.figure-leg {
		top: 92px;
		width: 12px;
		height: 39px;
		background: linear-gradient(#094a9a 0 72%, #151515 72% 100%);
	}

	.leg-left {
		left: 25px;
		transform: rotate(6deg);
	}

	.leg-right {
		right: 25px;
		transform: rotate(-10deg);
	}

	.shooter-figure span {
		padding: 0.15rem 0.55rem;
		border-radius: 999px;
		background: rgba(0, 0, 0, 0.55);
		color: white;
		font-size: 0.78rem;
		font-weight: 700;
	}

	.shooter-kicking {
		animation: shooter-kick 0.86s ease both;
	}

	.shooter-kicking .figure-body {
		animation: body-kick 0.86s ease both;
	}

	.shooter-kicking .arm-left {
		animation: arm-swing-left 0.86s ease both;
	}

	.shooter-kicking .arm-right {
		animation: arm-swing-right 0.86s ease both;
	}

	.shooter-kicking .leg-left {
		animation: run-plant-leg 0.86s ease both;
	}

	.shooter-kicking .leg-right {
		animation: run-kick-leg 0.86s ease both;
	}

	.penalty-ball {
		position: absolute;
		left: 50%;
		bottom: 12%;
		z-index: 4;
		font-size: 2rem;
		transform: translate(-50%, 0);
		filter: drop-shadow(0 5px 8px rgba(0, 0, 0, 0.3));
	}

	.spot-hidden {
		opacity: 0;
	}

	.penalty-arc {
		position: absolute;
		left: 50%;
		bottom: -12%;
		width: 52%;
		aspect-ratio: 1 / 0.42;
		border: 5px solid rgba(255, 255, 255, 0.9);
		border-top-left-radius: 100% 100%;
		border-top-right-radius: 100% 100%;
		border-bottom: 0;
		transform: translateX(-50%);
		pointer-events: none;
	}

	@keyframes ball-flight {
		0% {
			left: 50%;
			top: 176%;
			transform: translate(-50%, -50%) scale(2.05);
		}

		18% {
			transform: translate(-50%, -50%) scale(2.28);
		}

		55% {
			transform: translate(-50%, -50%) scale(1.12);
		}

		100% {
			left: var(--ball-x);
			top: var(--ball-y);
			transform: translate(-50%, -50%) scale(0.72);
		}
	}

	@keyframes ball-saved-flight {
		0% {
			left: 50%;
			top: 176%;
			transform: translate(-50%, -50%) scale(2.05);
		}

		18% {
			transform: translate(-50%, -50%) scale(2.28);
		}

		70% {
			left: var(--ball-x);
			top: var(--ball-y);
			transform: translate(-50%, -50%) scale(0.78);
		}

		100% {
			left: calc(var(--ball-x) + 4%);
			top: calc(var(--ball-y) + 10%);
			transform: translate(-50%, -50%) scale(0.62);
		}
	}

	@keyframes shooter-kick {
		0% {
			transform: translateX(-50%) translate(0, 0) rotate(0deg);
		}

		22% {
			transform: translateX(-50%) translate(56px, -4px) rotate(2deg);
		}

		48% {
			transform: translateX(-50%) translate(128px, -8px) rotate(6deg);
		}

		68% {
			transform: translateX(-50%) translate(146px, -2px) rotate(-3deg);
		}

		100% {
			transform: translateX(-50%) translate(114px, 0) rotate(-1deg);
		}
	}

	@keyframes body-kick {
		0%,
		100% {
			transform: translateX(-50%) rotate(0deg);
		}

		48% {
			transform: translateX(-50%) rotate(-9deg);
		}
	}

	@keyframes arm-swing-left {
		0%,
		100% {
			transform: rotate(19deg);
		}

		48% {
			transform: rotate(48deg);
		}
	}

	@keyframes arm-swing-right {
		0%,
		100% {
			transform: rotate(-22deg);
		}

		48% {
			transform: rotate(-52deg);
		}
	}

	@keyframes run-plant-leg {
		0% {
			transform: rotate(6deg);
		}

		18% {
			transform: rotate(-26deg);
		}

		36% {
			transform: rotate(28deg);
		}

		56%,
		100% {
			transform: rotate(-4deg);
		}
	}

	@keyframes run-kick-leg {
		0% {
			transform: rotate(-10deg);
		}

		18% {
			transform: rotate(28deg);
		}

		36% {
			transform: rotate(-32deg);
		}

		56% {
			transform: rotate(-68deg) translateY(-4px);
		}

		70% {
			transform: rotate(56deg) translateY(-2px);
		}

		100% {
			transform: rotate(-10deg);
		}
	}

	.result-panel {
		padding: 1.25rem 1.5rem;
	}

	@media (max-width: 768px) {
		.score-board {
			width: 100%;
			justify-content: space-between;
		}

		.score-board > div {
			min-width: 0;
			flex: 1;
		}

		.goal-scene {
			padding: 1rem;
		}

		.goal-frame {
			height: 250px;
			width: 92%;
		}

		.pitch-perspective {
			min-height: 470px;
		}

		.player-duel {
			grid-template-columns: 1fr;
		}
	}
</style>
