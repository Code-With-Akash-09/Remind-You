"use client"

import { getTodosByPriority } from "@/actions/dashboard";
import PriorityChart from "@/atoms/PriorityChart";
import useRemindYouStore from "@/store";
import { Skeleton } from "@/ui/skeleton";
import { useEffect, useState } from "react";

const TodoPriority = () => {

    const [priority, setPriority] = useState({})
    const [loading, setLoading] = useState(false)
    const isAuthenticated = useRemindYouStore(state => state.isAuthenticated)

    const getPriority = async () => {
        setLoading(true)
        const { data = [] } = await getTodosByPriority()
        setPriority(data?.result)
        setLoading(false)
    }

    useEffect(() => {
        isAuthenticated ? getPriority() : setPriority({})
    }, [isAuthenticated])

    return (
        <>
            {
                loading ? (
                    <div className="grid grid-cols-4 gap-4 items-end h-full">
                        <Skeleton className="w-full h-2/4 rounded-md" />
                        <Skeleton className="w-full h-1/4 rounded-md" />
                        <Skeleton className="w-full h-full rounded-md" />
                        <Skeleton className="w-full h-3/4 rounded-md" />
                    </div>
                ) : (
                    <PriorityChart data={priority} />
                )
            }
        </>
    )
}

export default TodoPriority
