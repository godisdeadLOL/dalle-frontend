import { defineConfig } from "vite"
import preact from "@preact/preset-vite"

// https://vitejs.dev/config/
export default defineConfig({
	server: {
		port: 5180,
	},
	plugins: [preact()],
	resolve: {
		alias: [{ find: "@", replacement: "/src" }],
	},
})
