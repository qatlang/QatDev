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
		screens: {
			'xs': '300px',
			// => @media (min-width: 300px) { ... }

			'sm': '640px',
			// => @media (min-width: 640px) { ... }

			'md': '768px',
			// => @media (min-width: 768px) { ... }

			'lg': '1024px',
			// => @media (min-width: 1024px) { ... }

			'xl': '1280px',
			// => @media (min-width: 1280px) { ... }

			'2xl': '1536px',
			// => @media (min-width: 1536px) { ... }
		}
	},
	plugins: [],
}

