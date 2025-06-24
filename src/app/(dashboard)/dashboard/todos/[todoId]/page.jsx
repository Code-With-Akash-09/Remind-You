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
            <div className="hidden lg:block w-full">
                <Tabs defaultValue="grid" className={"flex-1"}>
                    <TabsList className={"w-fit !h-10"}>
                        <TabsTrigger value="grid">
                            <List />
                        </TabsTrigger>
                        <TabsTrigger value="table">
                            <Grid2X2 />
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="grid">
                        <div className="flex flex-1 w-full">
                            <TodoLists  {...{ todos, loading }} />
                        </div>
                    </TabsContent>
                    <TabsContent value="table">
                        <div className="flex flex-1 w-full">
                            <TodoDragNDrop  {...{ todos, loading }} />
                        </div>
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