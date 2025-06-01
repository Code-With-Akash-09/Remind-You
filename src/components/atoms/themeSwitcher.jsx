"use client"

import { Button } from "@/ui/button"
import { MoonStarIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"

const ThemeSwitcher = ({ size = "icon" }) => {
	const { theme, setTheme } = useTheme()

	return (
		<Button
			size={size}
			variant="outline"
			suppressHydrationWarning
			onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
		>
			{theme === "dark" ? (
				<MoonStarIcon className="size-5" />
			) : (
				<SunIcon className="size-5" />
			)}
		</Button>
	)
}

export default ThemeSwitcher
