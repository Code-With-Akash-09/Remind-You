import { create } from "zustand"
import { devtools, redux } from "zustand/middleware"
import { reducer } from "./reducer"

export const initialState = {
	user: null,
	userUpdated: false,
	openAuth: false,
	closableAuth: true,
	isAuthenticated: false,
	todoCreated: false,
	todoDeleted: false,
	queryParams: {},
}

const useRemindYouStore = create(
	devtools(redux(reducer, initialState), {
		name: "useRemindYouStore",
		enabled:
			(typeof window !== "undefined" &&
				Boolean(window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"])) ||
			process.env.VERCEL_ENV !== "production",
	})
)

export default useRemindYouStore