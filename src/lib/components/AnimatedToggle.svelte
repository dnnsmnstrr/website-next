<script lang="ts">
	import { spring } from 'svelte/motion';

	export let visible = false;

	const offset = spring(0);
	$: offset.set(visible ? 0 : 1);
</script>

<div class="counter-viewport">
	<div class="counter-digits" style="transform: translate(0, {visible ? '' : '-'}{100 * $offset}%)">
		<strong class="hidden" aria-hidden="true"></strong>
		<slot />
	</div>
</div>

<style>

	svg {
		width: 25%;
		height: 25%;
	}

	path {
		vector-effect: non-scaling-stroke;
		stroke-width: 2px;
		stroke: #444;
	}

	.counter-viewport {
		width: 8em;
		height: 2em;
		overflow: hidden;
		text-align: center;
		position: relative;
	}

	.counter-viewport strong {
		position: absolute;
		display: flex;
		width: 100%;
		height: 100%;
		font-weight: 400;
		color: var(--color-theme-1);
		font-size: 4rem;
		align-items: center;
		justify-content: center;
	}

	.counter-digits {
		position: absolute;
		width: 100%;
		height: 100%;
	}
</style>
