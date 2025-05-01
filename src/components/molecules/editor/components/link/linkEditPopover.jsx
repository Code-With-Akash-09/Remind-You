import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover"
import { Link2Icon } from "@radix-ui/react-icons"
import { useCallback, useState } from "react"
import ToolbarButton from "../toolbarButton"
import LinkEditBlock from "./linkEditBlock"

const LinkEditPopover = ({ editor, size, variant }) => {
	const [open, setOpen] = useState(false)

	const { from, to } = editor.state.selection
	const text = editor.state.doc.textBetween(from, to, " ")

	const onSetLink = useCallback(
		(url, text, openInNewTab) => {
			editor
				.chain()
				.focus()
				.extendMarkRange("link")
				.insertContent({
					type: "text",
					text: text || url,
					marks: [
						{
							type: "link",
							attrs: {
								href: url,
								target: openInNewTab ? "_blank" : "",
							},
						},
					],
				})
				.setLink({ href: url })
				.run()

			editor.commands.enter()
			setOpen(false)
		},
		[editor]
	)

	return (
		<Popover
			modal
			open={open}
			onOpenChange={setOpen}
		>
			<PopoverTrigger asChild>
				<ToolbarButton
					isActive={editor.isActive("link")}
					tooltip="Link"
					aria-label="Insert link"
					disabled={editor.isActive("codeBlock")}
					size={size}
					variant={variant}
				>
					<Link2Icon className="size-5" />
				</ToolbarButton>
			</PopoverTrigger>
			<PopoverContent
				className="w-full min-w-80"
				align="end"
			>
				<LinkEditBlock
					onSave={onSetLink}
					defaultText={text}
				/>
			</PopoverContent>
		</Popover>
	)
}

export default LinkEditPopover
