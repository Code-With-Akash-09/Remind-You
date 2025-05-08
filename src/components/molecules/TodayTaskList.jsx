"use client"

import { getAllTodosByState } from "@/actions/dashboard";
import TodoStatusBadge from "@/atoms/TodoStatusBadge";
import { toastMessager } from "@/lib/utils";
import useRemindYouStore from "@/store";
import { Skeleton } from "@/ui/skeleton";
import { FileClockIcon, GhostIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const TodayTaskList = () => {

    const [loading, setLoading] = useState(false)
    const [todos, setTodos] = useState([])
    const isAuthenticated = useRemindYouStore(state => state.isAuthenticated)

    const getTodos = async () => {
        setLoading(true)
        const { data = [], error } = await getAllTodosByState("current")

        if (error) {
            setLoading(false)
            toastMessager("Failed to Load Today Tasks", 500)
        }

        setTodos(data?.result)
        setLoading(false)
    }

    const cards = Array.from({ length: 4 }, (_, i) => i + 1);

    useEffect(() => {
        if (isAuthenticated) getTodos()
    }, [isAuthenticated])

    return (
        <>
            <div className="w-full flex flex-1 flex-col gap-4">
                {
                    todos?.length <= 0 ? (
                        loading ? (
                            cards.map(card => (
                                <div key={card} className="flex w-full">
                                    <Skeleton className="w-full h-10 rounded-md" />
                                </div>
                            ))
                        ) : (
                            <div className="flex flex-col gap-6 flex-1 items-center justify-center py-4 w-full">
                                <GhostIcon className="size-16 text-yellow-500" />
                                <span className="text-lg text-center text-neutral-700 font-medium">
                                    Your Todo list is empty for Today
                                </span>
                            </div>
                        )
                    ) : (
                        todos?.map(todo => (
                            <Link
                                key={todo?.todoId}
                                href={`/dashboard/todos/todo/${todo?.todoId}`}
                                className="flex flex-col py-3 gap-2 rounded-md group w-full border border-neutral-200 transition-all hover:border-neutral-300"
                            >
                                <div className="flex px-3 gap-2 w-full items-center">
                                    <FileClockIcon />
                                    <TodoStatusBadge
                                        status={todo?.status}
                                    />
                                </div>
                                <div className="flex px-3 w-full">
                                    <span className="text-sm line-clamp-1">
                                        {todo?.label} fjdkla hjkda hjkla hjksla jklsa jkla
                                    </span>
                                </div>
                            </Link>
                        ))
                    )
                }
            </div>
        </>
    )
}

export default TodayTaskList
