import { defineConfig } from "vite"
import preact from "@preact/preset-vite"

// https://vitejs.dev/config/
export default defineConfig({
	server: {
		port: 5180,
	},
	plugins: [preact()],
	base: '/dalle-frontend',
	resolve: {
		alias: [{ find: "@", replacement: "/src" }],
	},
})