"use client"

import { createTodo, updateTodo } from "@/actions/todo"
import Loading from "@/atoms/loading"
import { cn, formatDateOnly, toastMessager } from "@/lib/utils"
import useRemindYouStore from "@/store"
import { Button } from "@/ui/button"
import { Calendar } from "@/ui/calendar"
import { DialogClose } from "@/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/ui/dropdown-menu"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/ui/form"
import { Input } from "@/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/ui/select"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/ui/sheet"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/ui/tooltip"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { CalendarIcon, EditIcon, FilePlusIcon } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import Editor from "./editor"

const CreateFileForm = ({ parentId, initialData = null }) => {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const dispatch = useRemindYouStore((state) => state.dispatch)

    const form = useForm({
        resolver: zodResolver(CreateFileSchema),
        defaultValues: {
            ...initialData,
        }
    });

    const handleEdit = (e) => {
        e.stopPropagation()
        setOpen(true)
    }

    const content = form.watch("content")

    const onSubmit = async (values) => {

        setLoading(true)

        const body = {
            ...values,
            todoId: initialData?.todoId,
            parentId: parentId,
            status: values.status || "not-started",
            priority: values.priority || "no",
            startDate: values.startDate ? formatDateOnly(values.startDate) : new Date().setUTCHours(0, 0, 0, 0),
            endDate: values.endDate ? formatDateOnly(values.endDate) : new Date().setUTCHours(23, 59, 59, 59),
            type: "file",
        }

        const fn = initialData ? updateTodo : createTodo

        const { data = [] } = await fn(body)

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
            toastMessager(data?.message, data?.code)
        }
        else {
            setLoading(false)
            toast.error("Failed to create File")
        }

    }

    return (
        <>
            {
                initialData ? (
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    onClick={(e) => handleEdit(e)}
                                >
                                    <EditIcon /> Edit
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent className="w-fit">
                                Edit
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                ) : (
                    <Button
                        variant={"outline"}
                        onClick={() => setOpen(true)}
                    >
                        <FilePlusIcon />
                        <span className="hidden md:flex">
                            Create File
                        </span>
                    </Button>
                )
            }
            <Sheet open={open} onOpenChange={() => setOpen(false)}>
                <SheetContent className={"!max-w-3xl"}>
                    <SheetHeader>
                        <SheetTitle>Create Todo</SheetTitle>
                    </SheetHeader>
                    <div className="flex flex-col gap-4 w-full px-6 overflow-y-auto ">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full h-fit pb-4 space-y-4">
                                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                                    <FormField
                                        control={form.control}
                                        name="label"
                                        render={({ field }) => (
                                            <FormItem className={"w-full col-span-2"}>
                                                <FormLabel>File Name</FormLabel>
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
                                    <FormField
                                        control={form.control}
                                        name="status"
                                        render={({ field }) => (
                                            <FormItem className={"w-full col-span-1"}>
                                                <FormLabel>
                                                    Status
                                                </FormLabel>
                                                <Select
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    defaultValue={field.value}
                                                >
                                                    <FormControl className="w-full">
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select Status" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent className="max-h-40">
                                                        {TodoState.map(
                                                            (item, i) => (
                                                                <SelectItem
                                                                    key={i}
                                                                    value={
                                                                        item.value
                                                                    }
                                                                >
                                                                    {item.label}
                                                                </SelectItem>
                                                            )
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="priority"
                                        render={({ field }) => (
                                            <FormItem className={"w-full col-span-1"}>
                                                <FormLabel>
                                                    Priority
                                                </FormLabel>
                                                <Select
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    defaultValue={field.value}
                                                >
                                                    <FormControl className="w-full">
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select Priority" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent className="max-h-40">
                                                        {Priority.map(
                                                            (item, i) => (
                                                                <SelectItem
                                                                    key={i}
                                                                    value={
                                                                        item.value
                                                                    }
                                                                >
                                                                    {item.label}
                                                                </SelectItem>
                                                            )
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="startDate"
                                        render={({ field }) => (
                                            <FormItem className={"w-full"}>
                                                <FormLabel> Start Date</FormLabel>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <FormControl>
                                                            <Button
                                                                variant={"outline"}
                                                                className={cn(
                                                                    "w-full pl-3 text-left font-normal",
                                                                    !field.value &&
                                                                    "text-muted-foreground"
                                                                )}
                                                            >
                                                                {field.value ? (
                                                                    format(field.value, "PP")
                                                                ) : (
                                                                    <span>Select Date</span>
                                                                )}
                                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                            </Button>
                                                        </FormControl>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent
                                                        className="w-auto p-0"
                                                        align="start"
                                                    >
                                                        <Calendar
                                                            mode="single"
                                                            selected={field.value}
                                                            onSelect={field.onChange}
                                                            initialFocus
                                                        />
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="endDate"
                                        render={({ field }) => (
                                            <FormItem className={"w-full"}>
                                                <FormLabel> End Date</FormLabel>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <FormControl>
                                                            <Button
                                                                variant={"outline"}
                                                                className={cn(
                                                                    "w-full pl-3 text-left font-normal",
                                                                    !field.value &&
                                                                    "text-muted-foreground"
                                                                )}
                                                            >
                                                                {field.value ? (
                                                                    format(field.value, "PP")
                                                                ) : (
                                                                    <span>Select Date</span>
                                                                )}
                                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                            </Button>
                                                        </FormControl>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent
                                                        className="w-auto p-0"
                                                        align="end"
                                                    >
                                                        <Calendar
                                                            mode="single"
                                                            selected={field.value}
                                                            onSelect={field.onChange}
                                                            initialFocus
                                                        />
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="content"
                                        render={({ field }) => (
                                            <FormItem className={"w-full col-span-2 lg:col-span-3"}>
                                                <FormLabel>Content</FormLabel>
                                                <FormControl>
                                                    <Editor
                                                        defaultValue={content}
                                                        onChange={field.onChange}
                                                        className="w-full flex-grow !h-[calc(100vh-320px)]"
                                                        output="html"
                                                        placeholder="Enter your content here"
                                                        editable
                                                        editorClassName="focus:outline-none !h-[calc(100vh-400px)]"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4 w-full">
                                    <Button
                                        type="submit"
                                        disabled={loading}
                                        className={"w-full"}
                                    >
                                        {
                                            loading ? (
                                                <Loading />
                                            ) : (
                                                initialData ? "Update" : "Create"
                                            )
                                        }
                                    </Button>
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
                                </div>
                            </form>
                        </Form >
                    </div >
                </SheetContent >
            </Sheet >

        </>
    )
}

export default CreateFileForm

const CreateFileSchema = z.object({
    label: z
        .string()
        .min(2, { message: "Folder Name is required" })
        .regex(/^[a-zA-Z0-9 ]+$/, "Only letters, digits, and spaces are allowed.")
        .trim(),
    status: z.string().trim().optional(),
    priority: z.string().trim().optional(),
    startDate: z.coerce.date().optional().nullish(),
    endDate: z.coerce.date().optional().nullish(),
    content: z.string().optional().nullish(),
})

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