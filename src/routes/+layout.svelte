<script>
	import '../app.css';
			
	let { children } = $props();
</script>

{@render children()}

<footer>
	Welcome to SvelteKit | Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation
</footer>
