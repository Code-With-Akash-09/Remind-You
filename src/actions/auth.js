"use server";

import {
	fetchClientWithoutToken,
	fetchClientWithToken,
} from "@/services/fetch";
import { cookies } from "next/headers";


export const signUp = async (body) => {
	const resp = await fetchClientWithoutToken("/v1/auth/signup", {
		method: "POST",
		body,
	});

	return resp;
};

export const logIn = async (body) => {
	const resp = await fetchClientWithoutToken("/v1/auth/login", {
		method: "POST",
		body,
	});

	return resp;
};

export const getProfile = async (fallbackToken) => {
	const resp = await fetchClientWithToken("/v1/user/profile", {
		method: "GET",
		fallbackToken,
	});

	if (resp.error) logout();

	return resp;
};

export const setProfile = async (body) => {
	const resp = await fetchClientWithToken("/v3/tc/user", {
		method: "PUT",
		body,
	});

	return resp;
};

export const logout = async () => {
	const cookieStore = await cookies();
	cookieStore.delete(`${process.env.NEXT_PUBLIC_COOKIE_KEY}_access`);
};

