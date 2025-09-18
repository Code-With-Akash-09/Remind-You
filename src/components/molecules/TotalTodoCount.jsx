"use client";

import { getTodosCount } from "@/actions/dashboard";
import useRemindYouStore from "@/store";
import { Skeleton } from "@/ui/skeleton";
import Link from "next/link";
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
            <div className="w-full grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                {stats.map((stat) => (
                    <StatCard
                        key={stat.key}
                        label={stat.label}
                        status={stat.status}
                        value={result?.[stat.key]}
                        loading={loading}
                    />
                ))}
            </div>
        </>
    )
}

export default TotalTodoCount


const StatCard = ({ label, value, status, loading }) => (
    <Link href={`/dashboard/todos/status/${status}`} className="flex flex-col w-full border border-neutral-200 dark:border-neutral-700 p-4 rounded-md gap-2 shadow-sm">
        <span className="text-sm md:text-base font-normal text-neutral-700 dark:text-neutral-100">
            {label}
        </span>
        <span className="text-lg font-semibold">
            {loading ? <Skeleton className="h-4 lg:h-6" /> : value ?? 0}
        </span>
    </Link>
);

const stats = [
    { key: "total", label: "Total Todos", status: "all" },
    { key: "notStarted", label: "Not Started", status: "not-started" },
    { key: "inProgress", label: "In Progress", status: "in-progress" },
    { key: "completed", label: "Completed", status: "completed" },
    { key: "cancelled", label: "Cancelled", status: "cancelled" },
    { key: "backlog", label: "Backlog", status: "backlog" },
];