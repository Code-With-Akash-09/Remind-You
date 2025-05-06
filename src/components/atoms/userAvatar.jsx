import { cn } from "@/lib/utils"
import UnoptimizedImage from "./unoptimizedImage"

const UserAvatar = ({
	className,
	size = "h-10 w-10",
	border = null,
	rounded = "rounded-md",
	...props
}) => {
	return (
		<div
			className={cn(
				"relative inline-flex flex-shrink-0 overflow-hidden border border-neutral-200 dark:border-neutral-800",
				size,
				border,
				rounded,
				className
			)}
		>
			<UnoptimizedImage
				fill
				{...props}
			/>
		</div>
	)
}

export default UserAvatar
