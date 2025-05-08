"use client"

import { deleteTodo } from "@/actions/todo"
import { toastMessager } from "@/lib/utils"
import useRemindYouStore from "@/store"
import { Button } from "@/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider } from "@/ui/tooltip"
import { TooltipTrigger } from "@radix-ui/react-tooltip"
import { TrashIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

const DeleteTodo = ({ todoId, text, type }) => {

    const [open, setOpen] = useState(false)
    const dispatch = useRemindYouStore((state) => state.dispatch)
    const router = useRouter()

    const handleDelete = async () => {
        await deleteTodo(todoId)
            .then(result => {

                const { data: { code, message, error } = null } = result

                if (error) {
                    toastMessager(message, code)
                    setOpen(false)
                }
                toastMessager(message, code)
                dispatch({
                    type: "SET_STATE",
                    payload: {
                        todoDeleted: true,
                    }
                })
                setOpen(false)
                if (type === "file") router.push("/dashboard/todos")
            })
            .catch(err => {
                toastMessager(err.message, 500)
            })
    }

    return (
        <>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant={"outline"}
                            size={text ? "default" : "icon"}
                            onClick={() => setOpen(true)}
                        >
                            <TrashIcon /> {text ?? text}
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent className={"w-fit"}>
                        Delete
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <Dialog open={open} onOpenChange={() => setOpen(false)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirm Deletion</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this todo {type}?
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="sm:justify-between">
                        <DialogClose asChild>
                            <Button type="button" variant="secondary">
                                Close
                            </Button>
                        </DialogClose>
                        <Button
                            type="submit"
                            variant="destructive"
                            onClick={handleDelete}
                        >
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default DeleteTodo
