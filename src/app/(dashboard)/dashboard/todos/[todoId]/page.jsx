"use client"

import { getAllTodos } from "@/actions/todo"
import TodoDragNDrop from "@/organisms/TodoDragNDrop"
import TodoLists from "@/organisms/TodoLists"
import useRemindYouStore from "@/store"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/tabs"
import { Grid2X2, List } from "lucide-react"
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
            <div className="hidden lg:flex flex-1 h-full w-full">
                <Tabs defaultValue="grid" className={"flex-1 h-full w-full"}>
                    <TabsList className={"w-full !h-10"}>
                        <TabsTrigger value="grid">
                            <List />
                        </TabsTrigger>
                        <TabsTrigger value="table">
                            <Grid2X2 />
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="grid" className={"w-full h-auto"}>
                        <TodoLists  {...{ todos, loading }} />
                    </TabsContent>
                    <TabsContent value="table" className={"w-full h-full py-2"}>
                        <TodoDragNDrop  {...{ todos, loading }} />
                    </TabsContent>
                </Tabs>
            </div>
            <div className="flex lg:hidden w-full h-full">
                <TodoLists  {...{ todos, loading }} />
            </div>
        </div>
    )
}

export default TodoId