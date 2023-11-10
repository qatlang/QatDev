const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		fontFamily: {
			"display": ["Roboto"],
			"mono": ["JetBrains Mono"]
		},
		textColor: {
			"white": "#dddddd",
			"black": "#000000",
			"green": "#128f5f"
		},
		extend: {
			colors: {
				"styleGreen": "#128f5f",
				...colors,
			}
		},
	},
	plugins: [],
}

