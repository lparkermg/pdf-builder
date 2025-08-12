import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

// This is the config that is used to run the UI from outside the container, mainly for active development.
export default defineConfig({
	plugins: [sveltekit()],
	define: {
		'process.env': process.env
	},
	server: {
		port: 5117
	}
});
