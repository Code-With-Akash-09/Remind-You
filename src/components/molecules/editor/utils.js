let isMac

const getPlatform = () => {
	const nav = navigator

	if (nav.userAgentData) {
		if (nav.userAgentData.platform) {
			return nav.userAgentData.platform
		}

		nav.userAgentData
			.getHighEntropyValues(["platform"])
			.then(highEntropyValues => {
				if (highEntropyValues.platform) {
					return highEntropyValues.platform
				}
			})
	}

	if (typeof navigator.platform === "string") {
		return navigator.platform
	}

	return ""
}

const isMacOS = () => {
	if (isMac === undefined) {
		isMac = getPlatform().toLowerCase().includes("mac")
	}

	return isMac
}

export const getShortcutKey = key => {
	const lowercaseKey = key.toLowerCase()
	if (lowercaseKey === "mod") {
		return isMacOS()
			? { symbol: "⌘", readable: "Command" }
			: { symbol: "Ctrl", readable: "Control" }
	} else if (lowercaseKey === "alt") {
		return isMacOS()
			? { symbol: "⌥", readable: "Option" }
			: { symbol: "Alt", readable: "Alt" }
	} else if (lowercaseKey === "shift") {
		return isMacOS()
			? { symbol: "⇧", readable: "Shift" }
			: { symbol: "Shift", readable: "Shift" }
	} else {
		return { symbol: key, readable: key }
	}
}

export const getShortcutKeys = keys => {
	return keys.map(key => getShortcutKey(key))
}

export const getOutput = (editor, format) => {
	if (format === "json") {
		return editor.getJSON()
	}

	if (format === "html") {
		return editor.getText() ? editor.getHTML() : ""
	}

	return editor.getText()
}
