import { Image as TiptapImage } from "@tiptap/extension-image"
import { ReactNodeViewRenderer } from "@tiptap/react"
import ImageViewBlock from "./imageViewBlock"

const Image = TiptapImage.extend({
	addNodeView() {
		return ReactNodeViewRenderer(ImageViewBlock)
	},
})

export default Image
