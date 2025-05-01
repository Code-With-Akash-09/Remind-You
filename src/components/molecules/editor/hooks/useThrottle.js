import { useCallback, useRef } from "react"

const useThrottle = (callback, delay) => {
	const lastRan = useRef(Date.now())
	const timeoutRef = useRef(null)

	return useCallback(
		(...args) => {
			const handler = () => {
				if (Date.now() - lastRan.current >= delay) {
					callback(...args)
					lastRan.current = Date.now()
				} else {
					if (timeoutRef.current) {
						clearTimeout(timeoutRef.current)
					}
					timeoutRef.current = setTimeout(
						() => {
							callback(...args)
							lastRan.current = Date.now()
						},
						delay - (Date.now() - lastRan.current)
					)
				}
			}

			handler()
		},
		[callback, delay]
	)
}

export default useThrottle
