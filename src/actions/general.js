
import cookieService from "@/services/cookie";

const token = cookieService.getToken("access")

export const uploadFile = async ({ body }) => {
    const resp = await fetch(`http://localhost:8000/v1/learn/upload/file`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body,
    }).then(res => res.json())

    return resp
}