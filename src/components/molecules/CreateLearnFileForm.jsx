"use client"

import DragNDrop from "@/atoms/DragNDrop"
import Loading from "@/atoms/loading"
import useTusUpload from "@/hooks/useTusUpload"
import { cn, toastMessager } from "@/lib/utils"
import useRemindYouStore from "@/store"
import { Button } from "@/ui/button"
import { DialogClose } from "@/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/ui/form"
import { Input } from "@/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/ui/select"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/ui/sheet"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/ui/tooltip"
import { zodResolver } from "@hookform/resolvers/zod"
import { EditIcon, FilePlusIcon } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

const CreateLearnFileForm = ({ parentId, initialData = null, className, iconClassName }) => {

    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const dispatch = useRemindYouStore((state) => state.dispatch)

    const { handleFileForTus, startOrResumeUpload, pauseOrAbortUpload, toggleUpload, resetUpload, progress, uploadState } = useTusUpload()

    const form = useForm({
        resolver: zodResolver(CreateVideoFileSchema),
        defaultValues: {
            ...initialData,
        },
        mode: "onChange"
    });

    const handleEdit = (e) => {
        e.stopPropagation()
        setOpen(true)
    }

    const handleInputChange = (e, props) => {
        let { id: key, value, type, files } = e.target ? e.target : e
        if (type === "file") {
            if (files.length > 0) {
                handleFileForTus(files[0])
            }
            return
        }
    }

    const onSubmit = async (values) => {

        console.log(values);

        setLoading(true)

        const body = {
            ...values,
            learnId: initialData?.learnId,
            parentId: parentId,
            type: "file",
        }

        const fn = ""
        // const fn = initialData ? updateLearn : createLearn 

        const { data = [] } = await fn(body)

        if (data) {
            form.reset()
            dispatch({
                type: "SET_STATE",
                payload: {
                    learnCreated: true,
                }
            })
            setOpen(false)
            setLoading(false)
            toastMessager(data?.message, data?.code)
        }
        else {
            setLoading(false)
            toast.error("Failed to create Learn")
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
                                    variant={"outline"}
                                    size={"icon"}
                                    onClick={(e) => handleEdit(e)}
                                    className={cn("dark:backdrop-blur-sm", className)}
                                >
                                    <EditIcon className={cn(iconClassName)} />
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
                            Create Video
                        </span>
                    </Button>
                )
            }
            <Sheet open={open} onOpenChange={() => setOpen(false)}>
                <SheetContent className={"!max-w-sm"}>
                    <SheetHeader>
                        <SheetTitle>Create Video</SheetTitle>
                    </SheetHeader>
                    <div className="flex flex-col gap-4 w-full px-6 overflow-y-auto ">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full h-fit pb-4 space-y-4">
                                <div className="grid grid-cols-1 gap-4 w-full">
                                    <FormField
                                        control={form.control}
                                        name="label"
                                        render={({ field }) => (
                                            <FormItem className={"w-full"}>
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
                                        name="access"
                                        render={({ field }) => (
                                            <FormItem className={"w-full"}>
                                                <FormLabel>
                                                    Access
                                                </FormLabel>
                                                <Select
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    defaultValue={field.value}
                                                >
                                                    <FormControl className="w-full">
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select Access" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent className="max-h-40">
                                                        {VideoVisibility.map(
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
                                    {/* <FormField
                                        control={form.control}
                                        name="videoUrl"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Upload Video</FormLabel>
                                                <FormControl>
                                                    <FileUpload
                                                        value={field.value}
                                                        onChange={field.onChange}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    /> */}
                                    <FormField
                                        control={form.control}
                                        name="videoUrl"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Upload Video</FormLabel>
                                                <FormControl>
                                                    <DragNDrop
                                                        largeFileProtocol
                                                        startUpload={startOrResumeUpload}
                                                        progress={progress}
                                                        cancelUpload={pauseOrAbortUpload}
                                                        uploadState={uploadState}
                                                        resetUpload={resetUpload}
                                                        src={file}
                                                        accept={field.types.recorded.accept}
                                                        formats={field.types.recorded.formats}
                                                        formatType={field.types.recorded.formatType}
                                                        maxSize={0}
                                                        onFileChange={handleInputChange}
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

export default CreateLearnFileForm

const fileSchema = z.object({
    // id: z.number(),
    // file: typeof window !== 'undefined' ? z.instanceof(File) : z.any(),
    // name: z.string(),
    // size: z.number(),
    // type: z.string(),
    // fileType: z.enum(['image', 'video', 'pdf']),
    // preview: z.string().nullable(),
    uploadedUrl: z.string().nullable(),
});

const CreateVideoFileSchema = z.object({
    label: z
        .string()
        .min(2, { message: "Folder Name is required" })
        .regex(/^[a-zA-Z0-9 ]+$/, "Only letters, digits, and spaces are allowed.")
        .trim(),
    access: z.string().trim(),
    videoUrl: z
        .union([fileSchema, z.null()])
        .refine((file) => file !== null, {
            message: "A file is required.",
        })
})

const VideoVisibility = [
    {
        label: "Public",
        value: "public"
    },
    {
        label: "Private",
        value: "private"
    },
]