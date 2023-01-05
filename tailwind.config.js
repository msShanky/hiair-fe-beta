/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/pages/**/*.{js,ts,jsx,tsx}", "./src/components/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: "#7E33E0",
				secondary: "#FB2E86",
				success: "#19D16F",
				error: "#ff3900",
			},
			minWidth: {
				14: "3.5rem"
			}
		},
		fontFamily: {
			sans: ["Josefin Sans", "sans-serif"],
			serif: ["Merriweather", "serif"],
		},
		keyframes: {
			wiggle: {
				"0%, 100%": { transform: "rotate(-3deg)" },
				"50%": { transform: "rotate(3deg)" },
			},
		},
	},
	plugins: [require("tailwind-scrollbar")],
};
