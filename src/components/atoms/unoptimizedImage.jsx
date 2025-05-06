import { getType } from "@/lib/utils"
import Image from "next/image"

const generateFallbackImg = (target, alt) => {
	const prevSrcSet = target.srcset
	const prevEncodedSrc = target.src.split("image?url=").at(-1).split("&w=")[0]

	const src = `https://api.dicebear.com/9.x/initials/png?seed=${alt}&backgroundType=gradientLinear`
	const encodedSrc = encodeURIComponent(src)

	return {
		src,
		srcset: prevSrcSet.replaceAll(prevEncodedSrc, encodedSrc),
	}
}

const DEFAULT_DICEBEAR_PROPS = {
	style: "initials",
	format: "png",
}

const UnoptimizedImage = ({
	src = null,
	alt = "UnoptimizedImage",
	favicon = false,
	dicebear = false,
	...props
}) => {
	const dicebearProps = {
		...DEFAULT_DICEBEAR_PROPS,
		...(getType(dicebear) === "Object" ? dicebear : {}),
	}
	const dicebearSrc = `https://api.dicebear.com/9.x/${dicebearProps.style}/${dicebearProps.format}?seed=${alt}&backgroundType=gradientLinear`

	src = src ?? dicebearSrc

	const handleError = ({ target }) => {
		const fallbackImg = generateFallbackImg(target, alt)
		target.src = fallbackImg.src
		target.srcset = fallbackImg.srcset
	}

	return (
		<Image
			unoptimized
			src={src}
			alt={alt}
			{...props}
			onError={handleError}
		/>
	)
}

export default UnoptimizedImage
