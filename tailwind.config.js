/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: "class",
	content: ["./src/pages/**/*.{js,ts,jsx,tsx}", "./src/components/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: "#043873",
				primaryAlt: "#4F9CF9",
				secondaryYellow: "#FFE492",
				secondaryBlue: "#A7CEFC",
				white: "#FFFFFF",
				shadeBlack: "#212529",
				success: "#19D16F",
				error: "#ff3900",
			},
			minWidth: {
				14: "3.5rem",
			},
		},
		fontFamily: {
			sans: ["Raleway", "sans-serif"],
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
