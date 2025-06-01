"use client";

import { getTodosCount } from "@/actions/dashboard";
import useRemindYouStore from "@/store";
import { Skeleton } from "@/ui/skeleton";
import { useEffect, useState } from "react";

const TotalTodoCount = () => {

    const [result, setResult] = useState({})
    const [loading, setLoading] = useState(false)
    const isAuthenticated = useRemindYouStore(state => state.isAuthenticated)

    const getResult = async () => {
        setLoading(true)
        const { data = [] } = await getTodosCount()
        setResult(data?.result)
        setLoading(false)
    }

    useEffect(() => {
        isAuthenticated ? getResult() : setResult({})
    }, [isAuthenticated])

    return (
        <>
            <div className="w-full grid grid-cols-2 xl:grid-cols-3 gap-4">
                {stats.map((stat) => (
                    <StatCard
                        key={stat.key}
                        label={stat.label}
                        value={result?.[stat.key]}
                        loading={loading}
                    />
                ))}
            </div>
        </>
    )
}

export default TotalTodoCount


const StatCard = ({ label, value, loading }) => (
    <div className="flex flex-col w-full border border-neutral-200 dark:border-neutral-700 p-4 rounded-md gap-2 shadow-sm">
        <span className="text-sm md:text-base font-normal text-neutral-700 dark:text-neutral-100">
            {label}
        </span>
        <span className="text-lg md:text-xl font-semibold">
            {loading ? <Skeleton className="h-4 lg:h-6" /> : value ?? 0}
        </span>
    </div>
);

const stats = [
    { key: "total", label: "Total Todos" },
    { key: "notStarted", label: "Not Started" },
    { key: "inProgress", label: "In Progress" },
    { key: "completed", label: "Completed" },
    { key: "cancelled", label: "Cancelled" },
    { key: "backlog", label: "Backlog" },
];