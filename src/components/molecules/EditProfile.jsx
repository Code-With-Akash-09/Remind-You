"use client"

import { setProfile } from "@/actions/auth"
import Loading from "@/atoms/loading"
import { toastMessager } from "@/lib/utils"
import useRemindYouStore from "@/store"
import { Button } from "@/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/ui/form"
import { Input } from "@/ui/input"
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle } from "@/ui/sheet"
import { Textarea } from "@/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { UserPenIcon } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

const EditProfile = ({ user = null }) => {

    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const dispatch = useRemindYouStore((state) => state.dispatch)

    const form = useForm({
        resolver: zodResolver(EditProfileSchema),
        defaultValues: user
    })

    const onSubmit = async (values) => {
        setLoading(true)

        await setProfile(values)
            .then(result => {
                const { data: { code, message, error } = null } = result

                if (error) {
                    toastMessager(message, code)
                    setLoading(false)
                    setOpen(true)
                }
                dispatch({
                    type: "SET_STATE",
                    payload: {
                        userUpdated: true,
                    }
                })
                toastMessager(message, code)
                setLoading(false)
                setOpen(false)
                form.reset()
            })
            .catch(err => {
                setLoading(false)
                setOpen(true)
            })
    }

    return (
        <>
            <Button
                onClick={() => setOpen(true)}
                className={"w-full"}
            >
                <UserPenIcon />
                Edit Profile
            </Button>
            <Sheet open={open} onOpenChange={() => setOpen(false)}>
                <SheetContent>
                    <SheetHeader className={"border border-neutral-200 dark:border-neutral-800"}>
                        <SheetTitle>Edit Profile</SheetTitle>
                    </SheetHeader>
                    <div className="flex w-full px-6">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4 py-4">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter Your Name"
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
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter Your Email"
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
                                    name="mobile"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Mobile</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder="Enter Your Mobile"
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
                                    name="designation"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Designation</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter Your Designation"
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
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Description</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Enter Your Description"
                                                    {...field}
                                                    value={field.value || ""}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="grid grid-cols-2 gap-4">
                                    <SheetClose asChild>
                                        <Button
                                            variant={"outline"}
                                        >
                                            Close
                                        </Button>
                                    </SheetClose>
                                    <Button
                                        type="submit"
                                        disabled={loading}
                                        className={"w-full"}
                                    >
                                        {loading ? <Loading /> : "Update Profile"}
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </div>
                </SheetContent>
            </Sheet>
        </>
    )
}

export default EditProfile


const EditProfileSchema = z.object({
    name: z
        .string()
        .min(2, { message: "Name is required" })
        .regex(/^[a-zA-Z ]+$/, "Only letters and spaces are allowed.")
        .trim(),
    email: z
        .string()
        .email({ message: "Invalid email address" })
        .trim(),
    mobile: z
        .string()
        .min(10, { message: "Mobile number is required" })
        .max(10, { message: "Mobile number is too long" })
        .regex(/^[0-9]+$/, "Only numbers are allowed.")
        .trim(),
    designation: z
        .string()
        .trim()
        .optional(),
    description: z
        .string()
        .trim()
        .optional(),
})