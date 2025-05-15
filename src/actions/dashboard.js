"use server"

import { fetchClientWithToken } from "@/services/fetch";

export const getAllTodosByState = async (statusId) => {
    const resp = await fetchClientWithToken(`/v1/todos/dashboard/getAll/${statusId}`, {
        method: "GET",
    });

    return resp;
}

export const searchTodos = async (query) => {
    const resp = await fetchClientWithToken(`/v1/todos/dashboard/search?query=${query}`, {
        method: "GET",
    });

    return resp;
}