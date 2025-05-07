import { cn } from "@/lib/utils"
import { Input } from "../ui/input"
import { Label } from "../ui/label"

const InputWithLabel = ({ label, id, className, ...props }) => {
	return (
		<div
			className={cn(
				"flex flex-col w-full gap-1.5",
				className
			)}
		>
			<Label htmlFor={id}>{label}</Label>
			<Input
				id={id}
				{...props}
				className="disabled:text-slate-500 disabled:opacity-100"
			/>
		</div>
	)
}

export default InputWithLabel
