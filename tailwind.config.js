/** @type {import('tailwindcss').Config} */

import colors from "tailwindcss/colors"

export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				sans: "Inter Variable, Segoe UI, sans",
			},
			colors: {
				primary: {
					faded: colors.blue[50],
					DEFAULT: colors.blue[100],
					active: colors.blue[200],
				},
				cancel: {
					faded: colors.red[300],
					DEFAULT: colors.red[500],
				},
				success: {
					faded: colors.green[300],
					DEFAULT: colors.green[500],
				},
				text: {
					faded: colors.neutral[600],
					DEFAULT: colors.neutral[900],
				},
			},
		},
	},
	plugins: [],
}
