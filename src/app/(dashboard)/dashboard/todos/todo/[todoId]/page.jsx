"use client"

import { getTodoById } from "@/actions/todo";
import InputWithLabel from "@/atoms/InputWithLabel";
import Loading from "@/atoms/loading";
import CreateFileForm from "@/molecules/CreateFileForm";
import DeleteTodo from "@/molecules/DeleteTodo";
import useRemindYouStore from "@/store";
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
                    <div className="flex flex-1 items-center justify-center w-full">
                        <Loading />
                    </div>
                ) : (
                    <div className="lg:grid lg:grid-cols-4 gap-4 md:divide-x w-full">
                        <div className="flex flex-1 overflow-x-auto w-full lg:col-span-3 bg-white border rounded-md p-4">
                            <div className="flex flex-col w-full gap-4 h-fit">
                                <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-extrabold">
                                    {todo?.label}
                                </h1>
                                <hr />
                                <div
                                    className="prose !max-w-full"
                                    dangerouslySetInnerHTML={{ __html: todo?.content }}
                                />
                            </div>
                        </div>
                        <div className="hidden lg:flex flex-col w-full p-4 gap-4 bg-white border rounded-md">
                            <InputWithLabel
                                id="Status"
                                label={"Status"}
                                value={getStatus(todo?.status)}
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
                                id="Start Date"
                                label={"Start Date"}
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