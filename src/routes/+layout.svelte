<script>
	import '../styles/app.css';
	import '../styles/forms.css';
	import { storePopup } from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';

	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });
	console.log('Popup store initialized.');		

	let { children } = $props();
</script>

{@render children()}

<footer>
	Welcome to SvelteKit | Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation
</footer>
