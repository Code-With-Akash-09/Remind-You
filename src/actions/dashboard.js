"use server"

import { fetchClientWithToken } from "@/services/fetch";

export const getAllTodosByState = async (statusId) => {
    console.log(statusId);

    const resp = await fetchClientWithToken(`/v1/todos/dashboard/getAll/${statusId}`, {
        method: "GET",
    });

    return resp;
}