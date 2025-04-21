import defaultTheme from "tailwindcss/defaultTheme"

const config = {
	darkMode: ["class"],
	content: [
		"./src/**/*.{js,jsx}",
	],
	prefix: "",
	theme: {
		screens: {
			xs: "476px",
			...defaultTheme.screens,
		},
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			height: {
				screen: "calc(var(--vh, 1vh) * 100)",
			},
			fontSize: {
				"3xs": ["0.5rem", { lineHeight: "0.5rem" }],
				"2xs": ["0.625rem", { lineHeight: "0.75rem" }],
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
				expandWidth: {
					"0%": { width: "0%" },
					"100%": { width: "100%" },
				},
				expandHeight: {
					"0%": { height: "0%" },
					"100%": { height: "100%" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				"expand-width": "expandWidth infinite linear",
				"expand-height": "expandHeight linear",
			},
		},
	},
	plugins: [
		require("tailwindcss-animate"),
		function ({ addUtilities }) {
			addUtilities(
				{
					".scrollbar-hide": {
						/* IE and Edge */
						"-ms-overflow-style": "none",
						/* Firefox */
						"scrollbar-width": "none",
						/* Safari and Chrome */
						"&::-webkit-scrollbar": {
							display: "none",
						},
					},
					".scrollbar": {
						/* IE and Edge */
						"-ms-overflow-style": "auto",
						/* Firefox */
						"scrollbar-width": "auto",
						/* Safari and Chrome */
						"&::-webkit-scrollbar": {
							display: "block",
							width: "6px",
							height: "6px",
						},
						"&::-webkit-scrollbar-track": {
							background: "transparent",
						},

						"&::-webkit-scrollbar-thumb": {
							background: "#8880",
							borderRadius: "35px",
						},

						"&::-webkit-scrollbar-thumb:hover": {
							background: "#555",
						},

						"&::-webkit-scrollbar-corner": {
							background: "transparent",
						},
					},
					".scrollbar:hover": {
						"&::-webkit-scrollbar-thumb": {
							background: "#888",
						},
					},
				},
				["responsive"]
			)
		},
	],
}

export default config
