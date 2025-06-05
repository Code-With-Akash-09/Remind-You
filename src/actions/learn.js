"use server"

import { fetchClientWithoutToken, fetchClientWithToken } from "@/services/fetch";

export const getAllLearns = async ({ parentId = null, page = 1, limit = 12 }) => {
    const resp = await fetchClientWithToken(`/v1/learn/getAll/private?parentId=${parentId}&page=${page}&limit=${limit}`, {
        method: "GET",
    });

    return resp;
}

export const createLearn = async (body) => {
    const resp = await fetchClientWithToken("/v1/learn/create", {
        method: "POST",
        body,
    });

    return resp;
}

export const updateLearn = async (body) => {
    const resp = await fetchClientWithToken(`/v1/learn/update/${body.learnId}`, {
        method: "PUT",
        body,
    });

    return resp;
}

export const getLearnById = async (learnId) => {
    const resp = await fetchClientWithoutToken(`/v1/learn/getAll/${learnId}`, {
        method: "GET",
    });

    return resp;
}

export const deleteLearn = async (learnId) => {
    const resp = await fetchClientWithToken(`/v1/learn/delete/${learnId}`, {
        method: "DELETE",
    });

    return resp;
}

export const getAllLearnsPublic = async ({ parentId = null, page = 1, limit = 12 }) => {
    const resp = await fetchClientWithoutToken(`/v1/learn/getAll/public?parentId=${parentId}&page=${page}&limit=${limit}`, {
        method: "GET",
    });

    return resp;
}