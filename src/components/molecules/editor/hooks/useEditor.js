import { cn } from "@/lib/utils"
import Placeholder from "@tiptap/extension-placeholder"
import { TextStyle } from "@tiptap/extension-text-style"
import { Typography } from "@tiptap/extension-typography"
import { useEditor as useTipTapEditor } from "@tiptap/react"
import { StarterKit } from "@tiptap/starter-kit"
import { useCallback } from "react"
import CodeBlockLowlight from "../extensions/codeBlockLowlight"
import Color from "../extensions/color"
import HorizontalRule from "../extensions/horizontalRule"
import Image from "../extensions/image"
import Link from "../extensions/link"
import { ResetMarksOnEnter } from "../extensions/resetMarksOnEnter"
import Selection from "../extensions/selection"
import UnsetAllMarks from "../extensions/unsetAllMarks"
import { getOutput } from "../utils"
import useThrottle from "./useThrottle"

const createExtensions = placeholder => [
	StarterKit.configure({
		horizontalRule: false,
		codeBlock: false,
		paragraph: { HTMLAttributes: { class: "text-node" } },
		heading: { HTMLAttributes: { class: "heading-node" } },
		blockquote: { HTMLAttributes: { class: "block-node" } },
		bulletList: { HTMLAttributes: { class: "list-node" } },
		orderedList: { HTMLAttributes: { class: "list-node" } },
		code: { HTMLAttributes: { class: "inline", spellcheck: "false" } },
		dropcursor: { width: 2, class: "ProseMirror-dropcursor border" },
	}),
	Link,
	Image,
	Color,
	TextStyle,
	Selection,
	Typography,
	UnsetAllMarks,
	HorizontalRule,
	ResetMarksOnEnter,
	CodeBlockLowlight,
	Placeholder.configure({ placeholder: () => placeholder }),
]

const useEditor = ({
	value,
	output = "html",
	placeholder = "",
	editorClassName,
	throttleDelay = 0,
	onUpdate,
	onBlur,
	...props
}) => {
	const throttledSetValue = useThrottle(
		value => onUpdate?.(value),
		throttleDelay
	)

	const handleUpdate = useCallback(
		editor => throttledSetValue(getOutput(editor, output)),
		[output, throttledSetValue]
	)

	const handleCreate = useCallback(
		editor => {
			if (value && editor.isEmpty) {
				editor.commands.setContent(value)
			}
		},
		[value]
	)

	const handleBlur = useCallback(
		editor => onBlur?.(getOutput(editor, output)),
		[output, onBlur]
	)

	const editor = useTipTapEditor({
		extensions: createExtensions(placeholder),
		editorProps: {
			attributes: {
				autocomplete: "off",
				autocorrect: "off",
				autocapitalize: "off",
				class: cn("focus:outline-none text-sm", editorClassName),
			},
		},
		onUpdate: ({ editor }) => handleUpdate(editor),
		onCreate: ({ editor }) => handleCreate(editor),
		onBlur: ({ editor }) => handleBlur(editor),
		...props,
	})

	return editor
}

export default useEditor
