import { cn } from "@/lib/utils"
import { forwardRef } from "react"
import { getShortcutKey } from "../utils"

const ShortcutKey = forwardRef(({ className, keys, ...props }, ref) => {
	const modifiedKeys = keys.map(key => getShortcutKey(key))
	const ariaLabel = modifiedKeys
		.map(shortcut => shortcut.readable)
		.join(" + ")

	return (
		<span
			aria-label={ariaLabel}
			className={cn("inline-flex items-center gap-0.5", className)}
			{...props}
			ref={ref}
		>
			{modifiedKeys.map((shortcut, idx) => (
				<kbd
					key={shortcut.symbol}
					className={cn(
						"font-sans inline-block min-w-2.5 text-center align-baseline text-xs font-medium capitalize text-[rgb(156,157,160)]",

						className
					)}
					{...props}
					ref={ref}
				>
					{shortcut.symbol}
					{idx === modifiedKeys.length - 1 ? null : "+"}
				</kbd>
			))}
		</span>
	)
})

ShortcutKey.displayName = "ShortcutKey"

export default ShortcutKey
