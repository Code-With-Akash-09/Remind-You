"use client"

import { Button } from "@/ui/button"
import { MoonStarIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"

const ThemeSwitcher = () => {
	const { theme, setTheme } = useTheme()

	return (
		<Button
			size="icon"
			variant="outline"
			suppressHydrationWarning
			onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
		>
			{theme === "dark" ? (
				<MoonStarIcon className="size-4" />
			) : (
				<SunIcon className="size-4" />
			)}
		</Button>
	)
}

export default ThemeSwitcher
