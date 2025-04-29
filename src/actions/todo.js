import { fetchClientWithToken } from "@/services/fetch";

export const getAllTodos = async (parentId) => {
    const resp = await fetchClientWithToken(`/v1/todos/getAll?parentId=${parentId}`, {
        method: "GET",
    });

    return resp;
}