import { cn } from "@/lib/utils"
import Analytics from "@/providers/analytics"
import QueryParamsProvider from "@/providers/queryParams"
import { TooltipProvider } from "@/ui/tooltip"
import { ThemeProvider } from "next-themes"
import { ViewTransitions } from "next-view-transitions"
import { Geist } from "next/font/google"
import { Suspense } from "react"
import { Toaster } from "sonner"
import "./globals.css"

const geist = Geist({
	subsets: ["latin"],
})

export const viewport = {
	viewportFit: "cover",
	width: "device-width",
	initialScale: 1,
	maximumScale: 1,
	userScalable: false,
}

export const metadata = {
	title: "Remind You",
	description: "Remind You",
}

export default function RootLayout({ children }) {
	return (
		<ViewTransitions>
			<html
				lang="en"
				suppressHydrationWarning
			>
				<body
					className={cn(
						"h-dvh w-screen overflow-hidden bg-gray-50 dark:bg-gray-950 text-gray-950 dark:text-gray-50 antialiased",
						geist.className
					)}
					suppressHydrationWarning
				>
					<ThemeProvider
						attribute="class"
						defaultTheme="light"
						enableSystem
						suppressHydrationWarning
						disableTransitionOnChange
					>
						<Suspense>
							<QueryParamsProvider />
						</Suspense>
						<TooltipProvider>
							<div className="flex h-full w-full flex-col overflow-hidden">
								{children}
							</div>
							<Toaster richColors />
						</TooltipProvider>
						<Analytics />
					</ThemeProvider>
				</body>
			</html>
		</ViewTransitions>
	)
}