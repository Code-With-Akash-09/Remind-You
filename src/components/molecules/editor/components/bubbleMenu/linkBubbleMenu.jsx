import { BubbleMenu } from "@tiptap/react"
import { useCallback, useState } from "react"
import LinkEditBlock from "../link/linkEditBlock"
import LinkPopoverBlock from "../link/linkPopoverBlock"

const LinkBubbleMenu = ({ editor }) => {
	const [showEdit, setShowEdit] = useState(false)
	const [linkAttrs, setLinkAttrs] = useState({ href: "", target: "" })
	const [selectedText, setSelectedText] = useState("")

	const updateLinkState = useCallback(() => {
		const { from, to } = editor.state.selection
		const { href, target } = editor.getAttributes("link")
		const text = editor.state.doc.textBetween(from, to, " ")

		setLinkAttrs({ href, target })
		setSelectedText(text)
	}, [editor])

	const shouldShow = useCallback(
		({ editor, from, to }) => {
			if (from === to) {
				return false
			}
			const { href } = editor.getAttributes("link")

			if (href) {
				updateLinkState()
				return true
			}
			return false
		},
		[updateLinkState]
	)

	const handleEdit = useCallback(() => {
		setShowEdit(true)
	}, [])

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
				.setLink({ href: url, target: openInNewTab ? "_blank" : "" })
				.run()
			setShowEdit(false)
			updateLinkState()
		},
		[editor, updateLinkState]
	)

	const onUnsetLink = useCallback(() => {
		editor.chain().focus().extendMarkRange("link").unsetLink().run()
		setShowEdit(false)
		updateLinkState()
	}, [editor, updateLinkState])

	return (
		<BubbleMenu
			editor={editor}
			shouldShow={shouldShow}
			tippyOptions={{
				placement: "bottom-start",
				onHidden: () => setShowEdit(false),
			}}
		>
			{showEdit ? (
				<LinkEditBlock
					defaultUrl={linkAttrs.href}
					defaultText={selectedText}
					defaultIsNewTab={linkAttrs.target === "_blank"}
					onSave={onSetLink}
					className="w-full min-w-80 rounded-md border bg-white p-4 text-gray-900 shadow-md outline-none"
				/>
			) : (
				<LinkPopoverBlock
					onClear={onUnsetLink}
					url={linkAttrs.href}
					onEdit={handleEdit}
				/>
			)}
		</BubbleMenu>
	)
}

export default LinkBubbleMenu
