"use client"

import { getAllTodosByState } from "@/actions/dashboard";
import TodoStatusBadge from "@/atoms/TodoStatusBadge";
import useRemindYouStore from "@/store";
import { Skeleton } from "@/ui/skeleton";
import { FileClockIcon, GhostIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const TodayTaskList = ({ taskState }) => {

    const [loading, setLoading] = useState(false)
    const [todos, setTodos] = useState([])
    const isAuthenticated = useRemindYouStore(state => state.isAuthenticated)
    const todoCreated = useRemindYouStore(state => state.todoCreated)
    const todoDeleted = useRemindYouStore(state => state.todoDeleted)

    const getTodos = async () => {
        setLoading(true)
        const { data = [], error } = await getAllTodosByState(taskState)

        if (error) {
            setLoading(false)
        }

        setTodos(data?.result)
        setLoading(false)
    }

    const cards = Array.from({ length: 4 }, (_, i) => i + 1);

    useEffect(() => {
        isAuthenticated ? getTodos() : setTodos([])
    }, [isAuthenticated])

    useEffect(() => {
        isAuthenticated ? getTodos() : setTodos([])
    }, [todoCreated, todoDeleted])

    return (
        <>
            <div className="w-full flex h-full overflow-y-auto scrollbar pr-2">
                <div className="flex flex-col gap-4 w-full h-fit">
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
                                        Your Todo list is empty
                                    </span>
                                </div>
                            )
                        ) : (
                            todos?.map(todo => (
                                <Link
                                    key={todo?.todoId}
                                    href={`/dashboard/todos/todo/${todo?.todoId}`}
                                    className="grid grid-cols-5 flex-col p-2 gap-2 rounded-md group w-full border border-neutral-200 transition-all hover:border-neutral-300 dark:border-neutral-600"
                                >
                                    <div className="flex w-full bg-amber-400 rounded-md items-center justify-center">
                                        <FileClockIcon className="text-white !size-5" />
                                    </div>
                                    <div className="flex flex-col w-full gap-1 col-span-4">
                                        <TodoStatusBadge
                                            status={todo?.status}
                                        />
                                        <span className="text-sm line-clamp-1 font-medium text-neutral-700 dark:text-neutral-300">
                                            {todo?.label}
                                        </span>
                                    </div>
                                </Link>
                            ))
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default TodayTaskList