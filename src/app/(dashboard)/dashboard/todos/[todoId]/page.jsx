"use client"

import { getAllTodos } from "@/actions/todo"
import Loading from "@/atoms/loading"
import TodoCard from "@/molecules/TodoCard"
import useRemindYouStore from "@/store"
import Image from "next/image"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

const TodoId = () => {

    const { todoId } = useParams()
    const [todos, setTodos] = useState([])
    const [loading, setLoading] = useState(false)
    const dispatch = useRemindYouStore((state) => state.dispatch)
    const todoCreated = useRemindYouStore((state) => state.todoCreated)
    const todoDeleted = useRemindYouStore((state) => state.todoDeleted)

    const getTodos = async () => {
        setLoading(true)
        const { data = [] } = await getAllTodos({
            parentId: todoId,
            page: 1,
            limit: 100,
        })

        if (data) {
            setTodos(data.result)
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
        getTodos()
    }, [todoCreated, todoDeleted])

    return (
        <div className="size-full flex">
            {
                todos.length <= 0 ? (
                    <div className="size-full flex items-center bg-gradient-to-r from-blue-50 to-amber-50 justify-center rounded-md">
                        <div className="flex flex-col gap-4 w-full max-w-sm items-center justify-center">
                            {
                                loading ? <Loading /> : (
                                    <>
                                        <div className="flex w-full aspect-square max-w-xs relative">
                                            <Image
                                                src={"/assets/banner-img/empty-todo.avif"}
                                                alt="empty-todo"
                                                fill
                                                className="object-contain"
                                            />
                                        </div>
                                        <div className="flex w-full items-center justify-center">
                                            <span className="text-lg md:text-xl lg:text-2xl xl:text-3xl text-neutral-800 font-bold">
                                                You have no todos
                                            </span>
                                        </div>
                                    </>
                                )
                            }
                        </div>
                    </div>
                ) : (
                    <div className="flex w-full h-[calc(100%-140px)] overflow-y-auto scrollbar-hide">
                        <div className="grid grid-cols-1 h-fit sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full gap-4">
                            {
                                todos.map((todo, i) => (
                                    <TodoCard key={i} todo={todo} />
                                ))
                            }
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default TodoId