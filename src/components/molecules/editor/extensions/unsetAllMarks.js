import { Extension } from "@tiptap/core"

const UnsetAllMarks = Extension.create({
	addKeyboardShortcuts() {
		return {
			"Mod-\\": () => this.editor.commands.unsetAllMarks(),
		}
	},
})

export default UnsetAllMarks
