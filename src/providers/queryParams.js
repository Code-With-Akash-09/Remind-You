"use client"

import useRemindYouStore from "@/store"
import { useSearchParams } from "next/navigation"
import { useEffect } from "react"

const QueryParamsProvider = () => {
	const searchParams = useSearchParams()

	const dispatch = useRemindYouStore(store => store.dispatch)

	useEffect(() => {
		dispatch({
			type: "SET_STATE",
			payload: { queryParams: Object.fromEntries(searchParams) },
		})

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchParams])

	return null
}

export default QueryParamsProvider
