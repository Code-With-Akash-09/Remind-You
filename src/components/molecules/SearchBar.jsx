"use client"

import { searchTodos } from "@/actions/dashboard"
import Loading from "@/atoms/loading"
import { Button } from "@/ui/button"
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/ui/command"
import { File, Folder, Search } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useDebouncedCallback } from "use-debounce"

const SearchBar = ({ icon }) => {

    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [query, setQuery] = useState("")
    const [todos, setTodos] = useState([])

    const handleSearch = useDebouncedCallback(async (query) => {
        setQuery(query)
        setLoading(true)
        const { data = [] } = await searchTodos(query)
        setTodos(data?.result);
        setLoading(false)
    }, 500)

    useEffect(() => {
        const down = (e) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                if (
                    (e.target instanceof HTMLElement && e.target.isContentEditable) ||
                    e.target instanceof HTMLInputElement ||
                    e.target instanceof HTMLTextAreaElement ||
                    e.target instanceof HTMLSelectElement
                ) {
                    return
                }
                e.preventDefault()
                setOpen((open) => !open)
            }
        }

        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [query])

    return (
        <>
            {
                icon ?
                    <Button
                        variant="outline"
                        className={"rounded-lg bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-700"}
                        onClick={() => setOpen(true)}
                    >
                        <Search className="!size-4 text-neutral-700 dark:text-neutral-400" />
                        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                            <span className="text-sm">⌘</span> K
                        </kbd>
                    </Button> : null
            }
            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput
                    onValueChange={handleSearch}
                    placeholder="Type to search..."
                    className={"focus-visible:ring-0 focus-visible:outline-none"}
                />
                <CommandList>
                    {
                        todos?.length <= 0 ? (
                            loading ? (
                                <CommandEmpty className="flex items-center justify-center h-14">
                                    <Loading />
                                </CommandEmpty>
                            ) : (
                                <CommandEmpty>No results found.</CommandEmpty>
                            )
                        ) : (
                            <CommandGroup heading="Todo List">
                                {
                                    todos.map((todo, i) =>
                                        todo?.type === "folder" ? (
                                            <CommandItem
                                                key={i}
                                                className={"rounded-md cursor-pointer"}
                                                asChild
                                            >
                                                <Link
                                                    href={
                                                        `/dashboard/todos/${todo?.todoId}`
                                                    }
                                                    className="gap-4 !px-4"
                                                    onClick={() => setOpen(false)}
                                                >
                                                    <Folder />
                                                    <span>{todo?.label}</span>
                                                </Link>
                                            </CommandItem>
                                        ) : (
                                            <CommandItem
                                                key={i}
                                                className={"rounded-md cursor-pointer"}
                                                asChild
                                            >
                                                <Link
                                                    href={
                                                        `/dashboard/todos/todo/${todo?.todoId}`
                                                    }
                                                    className="gap-4 !px-4"
                                                    onClick={() => setOpen(false)}
                                                >
                                                    <File />
                                                    <span>{todo?.label}</span>
                                                </Link>
                                            </CommandItem>
                                        )
                                    )
                                }
                            </CommandGroup>
                        )
                    }
                </CommandList>
            </CommandDialog>
        </>
    )
}

export default SearchBar
