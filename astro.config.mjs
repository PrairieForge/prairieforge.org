// @ts-check

import alpinejs from "@astrojs/alpinejs";
import netlify from "@astrojs/netlify";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import icon from "astro-icon";
import { loadEnv } from "vite";

// For Local Dev, set NGROK_HOST from .env
const { NGROK_HOST } = loadEnv(process.env, process.cwd(), "");

// https://astro.build/config
export default defineConfig({
	vite: {
		plugins: [tailwindcss()],
		server: {
			allowedHosts: [NGROK_HOST],
		},
	},

	integrations: [icon(), alpinejs({ entrypoint: "/src/entrypoints/alpine" })],
	adapter: netlify(),
});
