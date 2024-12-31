const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	darkMode: "class",
	theme: {
		fontFamily: {
			display: ["Roboto"],
			mono: ["JetBrains Mono"],
		},
		textColor: {
			white: "#dddddd",
			black: "#000000",
			paleWhite: "#bbbbbb",
			styleGreen: "#128f5f",
			...colors,
		},
		borderColor: {
			styleGray: "#444444",
			lightGray: "#bbbbbb",
			styleGreen: "#128f5f",
			...colors,
		},
		extend: {
			gridTemplateColumns: {
				fluid: "repeat(auto-fit, minmax(15rem, 1fr))",
			},
			colors: {
				styleGreen: "#128f5f",
				...colors,
			},
		},
		screens: {
			xs: "300px",
			// => @media (min-width: 300px) { ... }

			sm: "640px",
			// => @media (min-width: 640px) { ... }

			md: "768px",
			// => @media (min-width: 768px) { ... }

			lg: "1024px",
			// => @media (min-width: 1024px) { ... }

			xl: "1280px",
			// => @media (min-width: 1280px) { ... }

			"2xl": "1536px",
			// => @media (min-width: 1536px) { ... }
		},
	},
	plugins: [],
};
