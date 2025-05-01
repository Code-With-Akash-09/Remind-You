import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { CaretDownIcon } from "@radix-ui/react-icons"
import { useCallback, useMemo } from "react"
import { getShortcutKey } from "../utils"
import ShortcutKey from "./shortcutKey"
import ToolbarButton from "./toolbarButton"

const ToolbarSection = ({
	editor,
	actions,
	activeActions = actions.map(action => action.value),
	mainActionCount = 0,
	dropdownIcon,
	dropdownTooltip = "More options",
	dropdownClassName = "w-fit px-2",
	size,
	variant,
}) => {
	const { mainActions, dropdownActions } = useMemo(() => {
		const sortedActions = actions
			.filter(action => activeActions.includes(action.value))
			.sort(
				(a, b) =>
					activeActions.indexOf(a.value) -
					activeActions.indexOf(b.value)
			)

		return {
			mainActions: sortedActions.slice(0, mainActionCount),
			dropdownActions: sortedActions.slice(mainActionCount),
		}
	}, [actions, activeActions, mainActionCount])

	const renderToolbarButton = useCallback(
		action => (
			<ToolbarButton
				key={action.label}
				onClick={() => action.action(editor)}
				disabled={!action.canExecute(editor)}
				isActive={action.isActive(editor)}
				tooltip={`${action.label} ${action.shortcuts.map(s => getShortcutKey(s).symbol).join(" ")}`}
				aria-label={action.label}
				size={size}
				variant={variant}
			>
				{action.icon}
			</ToolbarButton>
		),
		[editor, size, variant]
	)

	const renderDropdownMenuItem = useCallback(
		action => (
			<DropdownMenuItem
				key={action.label}
				onClick={() => action.action(editor)}
				disabled={!action.canExecute(editor)}
				className={cn(
					"flex flex-row items-center justify-between gap-4",
					{
						"bg-neutral-100": action.isActive(editor),
					}
				)}
				aria-label={action.label}
			>
				<span className="grow">{action.label}</span>
				<ShortcutKey keys={action.shortcuts} />
			</DropdownMenuItem>
		),
		[editor]
	)

	const isDropdownActive = useMemo(
		() => dropdownActions.some(action => action.isActive(editor)),
		[dropdownActions, editor]
	)

	return (
		<>
			{mainActions.map(renderToolbarButton)}
			{dropdownActions.length > 0 && (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<ToolbarButton
							isActive={isDropdownActive}
							tooltip={dropdownTooltip}
							aria-label={dropdownTooltip}
							className={cn(dropdownClassName)}
							size={size}
							variant={variant}
						>
							{dropdownIcon || (
								<CaretDownIcon className="size-5" />
							)}
						</ToolbarButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						align="start"
						className="w-full"
					>
						{dropdownActions.map(renderDropdownMenuItem)}
					</DropdownMenuContent>
				</DropdownMenu>
			)}
		</>
	)
}

export default ToolbarSection
