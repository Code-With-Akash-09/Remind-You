"use server"

import { fetchClientWithToken } from "@/services/fetch";

export const getAllTodos = async ({ parentId = null, page = 1, limit = 12 }) => {
    const resp = await fetchClientWithToken(`/v1/todos/getAll?parentId=${parentId}&page=${page}&limit=${limit}`, {
        method: "GET",
    });

    return resp;
}

export const createTodo = async (body) => {
    const resp = await fetchClientWithToken("/v1/todos/create", {
        method: "POST",
        body,
    });

    return resp;
}

export const updateTodo = async (body) => {
    const resp = await fetchClientWithToken(`/v1/todos/update/${body.todoId}`, {
        method: "PUT",
        body,
    });

    return resp;
}

export const getTodoById = async (todoId) => {
    const resp = await fetchClientWithToken(`/v1/todos/getAll/${todoId}`, {
        method: "GET",
    });

    return resp;
}

export const deleteTodo = async (todoId) => {
    const resp = await fetchClientWithToken(`/v1/todos/delete/${todoId}`, {
        method: "DELETE",
    });

    return resp;
}

export const deleteTodos = async (body) => {
    const resp = await fetchClientWithToken("/v1/todos/multiple/delete", {
        method: "DELETE",
        body,
    });

    return resp;
}

export const getTodosByStatus = async (statusId) => {
    const resp = await fetchClientWithToken(`/v1/todos/status/${statusId}`, {
        method: "GET",
    });

    return resp;
}