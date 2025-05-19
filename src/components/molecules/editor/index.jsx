"use client"

import "./styles/index.css"

import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { EditorContent } from "@tiptap/react"
import ImageBubbleMenu from "./components/bubbleMenu/imageBubbleMenu"
import LinkBubbleMenu from "./components/bubbleMenu/linkBubbleMenu"
import SectionFive from "./components/section/five"
import SectionFour from "./components/section/four"
import SectionOne from "./components/section/one"
import SectionThree from "./components/section/three"
import SectionTwo from "./components/section/two"
import useEditor from "./hooks/useEditor"

const Toolbar = ({ editor }) => (
	<div className="flex h-fit md:h-12 w-full items-center overflow-x-auto overflow-y-hidden p-2 scrollbar">
		<div className="grid grid-cols-4 md:flex w-full gap-2">
			<SectionOne
				editor={editor}
				activeLevels={[1, 2, 3, 4, 5, 6]}
			/>

			<Separator orientation="vertical" className={"hidden md:flex"} />

			<SectionTwo
				editor={editor}
				activeActions={[
					"bold",
					"italic",
					"strikethrough",
					"code",
					"clearFormatting",
				]}
				mainActionCount={2}
			/>

			<Separator orientation="vertical" className={"hidden md:flex"} />

			<SectionThree editor={editor} />

			<Separator orientation="vertical" className={"hidden md:flex"} />

			<SectionFour
				editor={editor}
				activeActions={["orderedList", "bulletList"]}
				mainActionCount={0}
			/>

			<Separator orientation="vertical" className={"hidden md:flex"} />

			<SectionFive
				editor={editor}
				activeActions={["codeBlock", "blockquote", "horizontalRule"]}
				mainActionCount={0}
			/>
		</div>
	</div>
)

const Editor = ({
	value,
	onChange,
	className,
	editorContentClassName,
	defaultValue,
	...props
}) => {
	const editor = useEditor({
		onUpdate: onChange,
		...props,
	})

	if (!editor) return null

	if (defaultValue && editor.isEmpty) editor.commands.setContent(defaultValue)

	return (
		<div
			className={cn(
				"flex h-72 min-h-40 max-h-full w-full flex-col divide-y divide-neutral-200 dark:divide-neutral-700 rounded-md border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-950 shadow-sm",
				className
			)}
		>
			<Toolbar editor={editor} />
			<EditorContent
				editor={editor}
				className={cn(
					"editor flex overflow-hidden flex-1 border border-neutral-200 dark:border-neutral-700",
					editorContentClassName
				)}
			/>
			<LinkBubbleMenu editor={editor} />
			<ImageBubbleMenu editor={editor} />
		</div>
	)
}

export default Editor
