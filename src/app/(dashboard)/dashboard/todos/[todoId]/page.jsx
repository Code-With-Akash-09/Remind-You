"use client"

import { getAllTodos } from "@/actions/todo"
import DeleteTodo from "@/molecules/DeleteTodo"
import TodoDragNDrop from "@/organisms/TodoDragNDrop"
import TodoLists from "@/organisms/TodoLists"
import useRemindYouStore from "@/store"
import { Button } from "@/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/ui/dropdown-menu"
import { Label } from "@/ui/label"
import { RadioGroup, RadioGroupItem } from "@/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/tabs"
import { CheckIcon, CheckSquare2, FilterIcon, Grid2X2, List, Square } from "lucide-react"
import { useParams } from "next/navigation"
import { useEffect, useMemo, useState } from "react"

const TodoId = () => {

    const { todoId } = useParams()
    const [todos, setTodos] = useState([])
    const [loading, setLoading] = useState(false)
    const [selectedIds, setSelectedIds] = useState([])
    const dispatch = useRemindYouStore((state) => state.dispatch)
    const todoCreated = useRemindYouStore((state) => state.todoCreated)
    const todoDeleted = useRemindYouStore((state) => state.todoDeleted)
    const [filter, setFilter] = useState()

    const handleFilterChange = (value) => {
        setFilter(value)
    }

    const handleCardSelect = (todoId) => {
        setSelectedIds(prev =>
            prev.includes(todoId)
                ? prev.filter(item => item !== todoId)
                : [...prev, todoId]
        );
    };

    const handleToggleSelect = () => {
        if (selectedIds.length === todos.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(todos.map(todo => todo.todoId));
        }
    };


    const sortedTodos = useMemo(() => {
        if (filter === "az") {
            return [...todos].sort((a, b) => a.label.localeCompare(b.label))
        }
        else if (filter === "za") {
            return [...todos].sort((a, b) => b.label.localeCompare(a.label))
        }
        else if (filter === "none") {
            return [...todos]
        }
    }, [todos, filter])

    const getTodos = async () => {
        setLoading(true)
        const { data = [] } = await getAllTodos({
            parentId: todoId,
            page: 1,
            limit: 100,
        })

        if (data) {
            setTodos(data.result)
            setFilter("none")
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

    useEffect(() => {
        const down = (e) => {
            if (e.key === "a" && (e.metaKey || e.ctrlKey)) {
                if (
                    (e.target instanceof HTMLElement && e.target.isContentEditable) ||
                    e.target instanceof HTMLInputElement ||
                    e.target instanceof HTMLTextAreaElement ||
                    e.target instanceof HTMLSelectElement
                ) {
                    return
                }
                e.preventDefault()
                handleToggleSelect()
            }
        }

        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [selectedIds])

    return (
        <div className="size-full flex">
            <div className="hidden lg:flex w-full">
                <Tabs defaultValue="grid" className={"flex-1 w-full justify-between flex"}>
                    <div className="flex w-full justify-between items-center">
                        <TabsList className={"w-fit !h-10"}>
                            <TabsTrigger value="grid">
                                <List />
                            </TabsTrigger>
                            <TabsTrigger value="table">
                                <Grid2X2 />
                            </TabsTrigger>
                        </TabsList>
                        <div className="flex w-fit gap-2">
                            {
                                selectedIds?.length > 0 && (
                                    <DeleteTodo
                                        todoIds={selectedIds}
                                        variant="destructive"
                                        type={"file"}
                                        multiple={true}
                                    />
                                )
                            }
                            <Button
                                variant={selectedIds?.length >= 5 ? "default" : "outline"}
                                size={"icon"}
                                onClick={() => handleToggleSelect()}
                            >
                                {
                                    selectedIds?.length >= 5 ? <CheckSquare2 className="!size-4" /> : <Square className="!size-4" />
                                }
                            </Button>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button size={"icon"} className={"!px-1 !py-1"}>
                                        <FilterIcon className="!size-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className={"w-32"}>
                                    <RadioGroup
                                        value={filter}
                                        onValueChange={handleFilterChange}
                                        className="p-2 space-y-2"
                                    >
                                        {
                                            FilterOptions.map((option, i) =>
                                                <div key={i} className="flex items-center justify-between gap-4">
                                                    <RadioGroupItem
                                                        value={option.value}
                                                        id={option.value}
                                                        className={"sr-only"}
                                                    />
                                                    <Label htmlFor={option.value}>
                                                        {option.label}
                                                    </Label>
                                                    {
                                                        filter === option.value && <CheckIcon className="size-3.5" />
                                                    }
                                                </div>
                                            )
                                        }
                                    </RadioGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                    <TabsContent value="grid">
                        <div className="flex flex-1 w-full">
                            <TodoLists
                                todos={sortedTodos}
                                loading={loading}
                                selectedIds={selectedIds}
                                handleCardSelect={handleCardSelect}
                            />
                        </div>
                    </TabsContent>
                    <TabsContent value="table">
                        <div className="flex flex-1 w-full">
                            <TodoDragNDrop
                                todos={sortedTodos}
                                loading={loading}
                            />
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
            <div className="flex lg:hidden w-full h-full">
                <TodoLists
                    todos={sortedTodos}
                    loading={loading}
                    handleCardSelect={handleCardSelect}
                />
            </div>
        </div>
    )
}

export default TodoId

const FilterOptions = [
    { value: "none", label: "Default" },
    { value: "az", label: "A - Z" },
    { value: "za", label: "Z - A" },
]