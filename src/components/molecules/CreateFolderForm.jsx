"use client"

import { createTodo } from "@/actions/todo"
import Loading from "@/atoms/loading"
import useRemindYouStore from "@/store"
import { Button } from "@/ui/button"
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle } from "@/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/ui/form"
import { Input } from "@/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { FolderPlusIcon } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

const CreateFolderForm = ({ parentId }) => {

    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const dispatch = useRemindYouStore((state) => state.dispatch)

    const form = useForm({
        resolver: zodResolver(FolderSchema),
    })

    const onSubmit = async (values) => {
        setLoading(true)

        const body = {
            ...values,
            parentId: parentId,
            type: "folder",
        }

        const { data = [] } = await createTodo(body)

        if (data) {
            form.reset()
            dispatch({
                type: "SET_STATE",
                payload: {
                    todoCreated: true,
                }
            })
            setOpen(false)
            setLoading(false)
            toast.success("Folder Created Successfully")
        }
        else {
            setLoading(false)
            toast.error("Failed to create Folder")
        }

    }

    return (
        <>
            <Button onClick={() => setOpen(true)}>
                <FolderPlusIcon />
                Create Folders
            </Button>
            <Dialog open={open} onOpenChange={() => setOpen(false)}>
                <DialogContent className={"!max-w-sm dark:!border-neutral-700"}>
                    <DialogHeader>
                        <DialogTitle>Create Folder</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col gap-4 !py-4">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
                                <FormField
                                    control={form.control}
                                    name="label"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Folder Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter Folder Name"
                                                    {...field}
                                                    value={field.value || ""}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="grid grid-cols-2 gap-4 w-full">
                                    <DialogClose asChild>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            className="w-full"
                                            onClick={() => form.reset()}
                                        >
                                            Close
                                        </Button>
                                    </DialogClose>
                                    <Button
                                        type="submit"
                                        disabled={loading}
                                        className={"w-full"}
                                    >
                                        {loading ? <Loading /> : "Create"}
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default CreateFolderForm

const FolderSchema = z.object({
    label: z.string()
        .min(2, { message: "Folder Name is required" })
        .regex(/^[a-zA-Z0-9 ]+$/, "Only letters, digits, and spaces are allowed.")
        .trim(),
})
