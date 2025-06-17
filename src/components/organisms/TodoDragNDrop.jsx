"use client"

import { updateTodo } from "@/actions/todo";
import { toastMessager } from "@/lib/utils";
import DragCard from "@/molecules/DragCard";
import useRemindYouStore from "@/store";
import { Skeleton } from "@/ui/skeleton";
import { GhostIcon, GripIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const TodoDragNDrop = ({ todos, loading }) => {

    const [draggedTodo, setDraggedTodo] = useState(null);
    const dispatch = useRemindYouStore((state) => state.dispatch)

    const handleDragStart = (e, todo) => {
        setDraggedTodo(todo);
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };

    const handleDrop = async (e, newStatus) => {

        e.preventDefault();

        if (draggedTodo && draggedTodo.status !== newStatus) {
            const body = {
                ...draggedTodo,
                status: newStatus,
                todoId: draggedTodo.todoId,
            }
            const { data = [] } = await updateTodo(body)

            if (data) {
                dispatch({
                    type: "SET_STATE",
                    payload: {
                        todoCreated: true,
                    }
                })
                toastMessager(data?.message, data?.code)
            }
            else {
                toast.error("Failed to Update Todo Status")
            }
        }
        setDraggedTodo(null);
    };

    console.log(todos.filter(todo => todo.type === "folder").length);


    const status = ["not-started", "in-progress", "completed", "cancelled", "backlog"]

    return (
        <>
            <div className="h-full flex gap-2 flex-col">
                <div className="w-full gap-2 flex flex-col">
                    <span className="text-sm font-medium">Todo Folders</span>
                    {
                        todos.filter(todo => todo.type === "folder").length > 0 ? (
                            <div className="flex w-full h-40 flex-none overflow-x-auto overflow-y-hidden scrollbar pb-2">
                                <div className={`flex w-fit gap-4 ${todos.filter(todo => todo.type === "folder").length <= 5 ? "lg:grid lg:grid-cols-5 lg:w-full" : "lg:flex"}`}>
                                    {
                                        todos.filter(todo => todo.type === "folder").map((todo, i) => (
                                            <DragCard
                                                key={i}
                                                todo={todo}
                                            />
                                        ))
                                    }
                                </div>
                            </div>
                        ) : (
                            <div className="flex w-full h-40 pb-2">
                                <div className="flex w-full flex-1 items-center justify-center">
                                    <div className="flex flex-col w-full gap-4 items-center justify-center">
                                        <GhostIcon className="size-16 text-yellow-500" />
                                        <span className="text-lg text-center text-neutral-700 font-medium">
                                            You have no Folders
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
                <div className="w-full gap-2 flex h-full flex-col">
                    <span className="text-sm font-medium flex-grow-0">Todo File</span>
                    <div className="grid grid-cols-5 gap-4 h-full w-full">
                        {
                            status.map((status) => (
                                <TodoListByStatus
                                    key={status}
                                    status={status}
                                    todos={todos.filter(todo => todo.type === "file")}
                                    draggedTodo={draggedTodo}
                                    loading={loading}
                                    handleDragStart={handleDragStart}
                                    handleDragOver={handleDragOver}
                                    handleDrop={handleDrop}
                                />
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default TodoDragNDrop


const TodoListByStatus = ({
    status,
    todos,
    loading,
    draggedTodo,
    handleDragStart,
    handleDragOver,
    handleDrop
}) => {

    const todoStatus = TodoState.find(item => item.value === status)

    return (
        <div
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, status)}
            className={`w-full flex flex-col h-full border rounded-lg ${todoStatus?.cardStyle}`}>
            <div className={`flex w-full items-center rounded-md gap-2 py-3 font-semibold px-4 ${todoStatus?.className}`}>
                <span>
                    {todoStatus?.label}
                </span>
                <span>
                    {todos.filter((todo) => todo.status === status)?.length}
                </span>
            </div>
            <div className={`flex flex-col gap-4 p-4 w-full h-full`}>
                {
                    todos?.length <= 0 ? (
                        loading ? (
                            <div className="flex w-full relative h-[73px] border border-neutral-200 dark:border-neutral-700 rounded-md">
                                <Skeleton className={"w-full h-full"} />
                            </div>
                        ) : (
                            <div className="flex w-full flex-1 items-center justify-center">
                                <div className="flex flex-col w-full gap-4 items-center justify-center">
                                    <GhostIcon className="size-16 text-yellow-500" />
                                    <span className="text-lg text-center text-neutral-700 font-medium">
                                        You have no {todoStatus?.label}
                                    </span>
                                </div>
                            </div>
                        )
                    ) : (
                        todos.filter((todo) => todo.status === status)?.map((todo, i) => (
                            <DragCard
                                key={i}
                                todo={todo}
                                handleDragStart={handleDragStart}
                            />
                        ))
                    )
                }
                {
                    draggedTodo ? (
                        <div className={`flex flex-col w-full p-4 items-center justify-center border rounded-md gap-2 backdrop-blur-sm ${todoStatus?.cardStyle}`}>
                            <GripIcon className="text-neutral-700 dark:text-neutral-300" />
                            <span className="text-sm text-neutral-700 dark:text-neutral-300">
                                Drop Here
                            </span>
                        </div>
                    ) : null
                }
            </div>
        </div>
    )
}

const TodoState = [
    {
        label: "Backlog",
        value: "backlog",
        className: "bg-red-500 text-white",
        cardStyle: "bg-red-50 dark:bg-red-600/5 border-red-200 dark:border-red-600/40"
    },
    {
        label: "Cancelled",
        value: "cancelled",
        className: "bg-neutral-500 text-white",
        cardStyle: "bg-neutral-50 dark:bg-neutral-600/5 border-neutral-200 dark:border-neutral-600/40"
    },
    {
        label: "Not Started",
        value: "not-started",
        className: "bg-gray-400 text-white",
        cardStyle: "bg-gray-50 dark:bg-gray-600/5 border-gray-200 dark:border-gray-600/40"
    },
    {
        label: "In Progress",
        value: "in-progress",
        className: "bg-blue-500 text-white",
        cardStyle: "bg-blue-50 dark:bg-blue-600/5 border-blue-200 dark:border-blue-600/40"
    },
    {
        label: "Completed",
        value: "completed",
        className: "bg-green-500 text-white",
        cardStyle: "bg-green-50 dark:bg-green-600/5 border-green-200 dark:border-green-600/40"
    }
]