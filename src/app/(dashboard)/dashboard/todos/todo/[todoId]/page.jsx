"use client"

import { getTodoById } from "@/actions/todo";
import InputWithLabel from "@/atoms/InputWithLabel";
import Loading from "@/atoms/loading";
import TodoStatusBadge from "@/atoms/TodoStatusBadge";
import CreateFileForm from "@/molecules/CreateFileForm";
import DeleteTodo from "@/molecules/DeleteTodo";
import useRemindYouStore from "@/store";
import { Separator } from "@/ui/separator";
import { format } from "date-fns";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const TodoId = () => {

    const { todoId } = useParams()
    const [todo, setTodo] = useState(null)
    const [loading, setLoading] = useState(false)
    const dispatch = useRemindYouStore((state) => state.dispatch)
    const todoCreated = useRemindYouStore((state) => state.todoCreated)
    const todoDeleted = useRemindYouStore((state) => state.todoDeleted)

    const getStatus = (status) => {
        const label = TodoState.find(item => item.value === status)?.label
        return label
    }

    const getPriority = (priority) => {
        const label = Priority.find(item => item.value === priority)?.label
        return label
    }

    const getTodo = async () => {
        setLoading(true)
        const { data = [] } = await getTodoById(todoId)

        if (data) {
            setTodo(data.result)
            setLoading(false)
            dispatch({
                type: "SET_STATE",
                payload: {
                    todoCreated: false,
                    todoDeleted: false,
                }
            })
        }
        setLoading(false)
    }

    useEffect(() => {
        getTodo()
    }, [todoId])

    useEffect(() => {
        getTodo()
    }, [todoCreated, todoDeleted])

    return (
        <div className="size-full flex">
            {
                loading ? (
                    <div className="flex flex-1 items-center justify-center w-full bg-gradient-to-r from-blue-50 to-amber-50 dark:from-blue-600/10 dark:to-amber-600/10">
                        <Loading />
                    </div>
                ) : (
                    <div className="lg:grid lg:grid-cols-4 gap-4 md:divide-x md:divide-neutral-200  dark:md:divide-neutral-800 w-full">
                        <div className="flex flex-1 overflow-x-auto w-full lg:col-span-3 rounded-md p-4">
                            <div className="flex flex-col w-full gap-4 h-fit">
                                <div className="flex w-full col-span-2">
                                    <TodoStatusBadge status={todo?.status} />
                                </div>
                                <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-extrabold">
                                    {todo?.label}
                                </h1>
                                <div className="flex flex-wrap lg:hidden gap-4 w-full">
                                    <div className="flex w-full gap-4">
                                        <span className="text-sm md:text-base font-medium text-neutral-500 dark:text-neutral-200">
                                            <b>Start:</b> {todo?.startDate ?
                                                format(todo?.startDate, "PP") : "-"}
                                        </span>
                                        <span className="text-sm md:text-base font-medium text-neutral-500 dark:text-neutral-200">
                                            <b>End:</b> {todo?.endDate ?
                                                format(todo?.endDate, "PP") : "-"}
                                        </span>
                                    </div>
                                    <div className="flex gap-4 w-full">
                                        <CreateFileForm
                                            parentId={todo?.parentId ?? null}
                                            initialData={todo}
                                        />
                                        <DeleteTodo
                                            text={"Delete"}
                                            todoId={todo?.todoId}
                                            type="file"
                                        />
                                    </div>
                                </div>
                                <Separator />
                                <div
                                    className="prose !max-w-full dark:prose-invert"
                                    dangerouslySetInnerHTML={{ __html: todo?.content }}
                                />
                            </div>
                        </div>
                        <div className="hidden lg:flex flex-col w-full p-4 gap-4 rounded-md">
                            <InputWithLabel
                                id="Status"
                                label={"Status"}
                                value={getStatus(todo?.status)}
                                disabled
                            />
                            <InputWithLabel
                                id="Priority"
                                label={"Priority"}
                                value={getPriority(todo?.priority)}
                                disabled
                            />
                            <InputWithLabel
                                id="Start Date"
                                label={"Start Date"}
                                value={
                                    todo?.startDate ?
                                        format(todo?.startDate, "PP") : "-"
                                }
                                disabled
                            />
                            <InputWithLabel
                                id="End Date"
                                label={"End Date"}
                                value={
                                    todo?.endDate ?
                                        format(todo?.endDate, "PP") : "-"
                                }
                                disabled
                            />
                            <CreateFileForm
                                parentId={todo?.parentId ?? null}
                                initialData={todo}
                            />
                            <DeleteTodo
                                text={"Delete"}
                                todoId={todo?.todoId}
                                type="file"
                            />
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default TodoId


const TodoState = [
    {
        label: "Backlog",
        value: "backlog"
    },
    {
        label: "Cancelled",
        value: "cancelled"
    },
    {
        label: "Not Started",
        value: "not-started",
    },
    {
        label: "In Progress",
        value: "in-progress"
    },
    {
        label: "Completed",
        value: "completed"
    }
]

const Priority = [
    {
        label: "No",
        value: "no"
    },
    {
        label: "Low",
        value: "low"
    },
    {
        label: "Medium",
        value: "medium"
    },
    {
        label: "High",
        value: "high"
    }
]