"use server"

import { getAllTodosByState } from "@/actions/dashboard";
import TodoStatusBadge from "@/atoms/TodoStatusBadge";
import { Skeleton } from "@/ui/skeleton";
import { FileClockIcon } from "lucide-react";
import Link from "next/link";

const TodayTaskList = async () => {

    const { data: { result = null } = null } = await getAllTodosByState("current")

    const cards = Array.from({ length: 4 }, (_, i) => i + 1);

    return (
        <>
            <div className="w-full flex flex-col gap-4">
                {
                    result?.length <= 0 ? (
                        cards.map(card => (
                            <div key={card} className="flex w-full">
                                <Skeleton className="w-full h-10 rounded-md" />
                            </div>
                        ))
                    ) : (
                        result?.map(todo => (
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
