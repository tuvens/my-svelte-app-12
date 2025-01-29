import containerQueries from '@tailwindcss/container-queries';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import { join } from 'path';
import { skeleton } from '@skeletonlabs/tw-plugin';
import type { Config } from 'tailwindcss';

export default {
	content: [
		join(__dirname, './src/**/*.{html,js,svelte,ts}'), // Include Svelte files
		join(__dirname, './src/styles/*.css') // Include custom CSS files
	],

	theme: {
		extend: {        
			
		}
	},

	plugins: [
		typography,
		forms,
		containerQueries,
		skeleton({
			themes: { preset: ["skeleton"] } // Apply the Skeleton theme
		  })
	]
} satisfies Config;

						