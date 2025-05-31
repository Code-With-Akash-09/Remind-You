"use client"

import { getTodosByPriority } from "@/actions/dashboard";
import PriorityChart from "@/atoms/PriorityChart";
import useRemindYouStore from "@/store";
import { useEffect, useState } from "react";

const TodoPriority = () => {

    const [priority, setPriority] = useState({})
    const isAuthenticated = useRemindYouStore(state => state.isAuthenticated)

    const getPriority = async () => {
        const { data = [] } = await getTodosByPriority()
        setPriority(data?.result)
    }

    useEffect(() => {
        isAuthenticated ? getPriority() : setPriority({})
    }, [isAuthenticated])

    return (
        <>
            <PriorityChart data={priority} />
        </>
    )
}

export default TodoPriority
