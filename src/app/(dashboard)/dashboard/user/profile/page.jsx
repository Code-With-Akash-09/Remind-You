"use client"

import { logout } from "@/actions/auth"
import UserAvatar from "@/atoms/userAvatar"
import { toastMessager } from "@/lib/utils"
import EditProfile from "@/molecules/EditProfile"
import useRemindYouStore from "@/store"
import { Button } from "@/ui/button"
import { LogOut } from "lucide-react"

const Profile = () => {

    const user = useRemindYouStore(store => store.user)

    const handleLogout = () => {
        logout()
            .then(() => {
                toastMessager("Logged Out", 200)
            })
            .catch(err => {
                toastMessager("Failed to logout", 500)
            })
    }

    return (
        <div className="size-full flex flex-col gap-6 divide-y">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full h-fit md:h-full md:divide-x md:divide-neutral-200 dark:md:divide-neutral-800">
                <div className="flex flex-col gap-4 w-full md:col-span-2 lg:col-span-1">
                    <div className="flex flex-col w-full">
                        <div className="flex gap-4 rounded-xl md:p-4 w-full">
                            <div className="flex h-20 w-20 border-2 border-neutral-200 dark:border-neutral-800 rounded-full">
                                <UserAvatar
                                    alt={user?.name ?? "John Doe"}
                                    unoptimized={false}
                                    priority
                                    className={"w-full h-full rounded-full"}
                                />
                            </div>
                            <div className="flex flex-col w-fit items-center justify-center">
                                <span className="text-2xl font-semibold text-neutral-700">
                                    {user?.name ?? "John Doe"}
                                </span>
                                <span>
                                    {user?.designation ?? "-"}
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-col w-full p-4">
                            <div className="flex flex-col gap-4 w-full">
                                <div className="flex w-full flex-col">
                                    <span className="text-sm md:text-base font-semibold text-blue-500">
                                        Name
                                    </span>
                                    <span>
                                        {user?.name ?? "John doe"}
                                    </span>
                                </div>
                                <div className="flex w-full flex-col">
                                    <span className="text-sm md:text-base font-semibold text-blue-500">
                                        Email
                                    </span>
                                    <span>
                                        {user?.email ?? "abc@gmail.com"}
                                    </span>
                                </div>
                                <div className="flex w-full flex-col">
                                    <span className="text-sm md:text-base font-semibold text-blue-500">
                                        Mobile
                                    </span>
                                    <span>
                                        {user?.mobile ?? "9988776655"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <EditProfile user={user} />
                        <Button
                            variant="outline"
                            className={"h-[unset] w-full"}
                            onClick={handleLogout}
                        >
                            <LogOut />
                            Log Out
                        </Button>
                    </div>
                </div>
                <div className="flex flex-col w-full md:col-span-2 lg:col-span-3 md:p-4 lg:p-6 gap-4 md:gap-6">
                    <div className="flex flex-col w-full rounded-xl items-start justify-end h-40 p-4 bg-gradient-to-r from-blue-400/40 to-amber-400/40">
                        <span className="text-2xl md:text-3xl lg:text-4xl font-bold">
                            Welcome back, {user?.name ?? "John"} 👋
                        </span>
                        <p className="text-sm md:text-base">
                            Here's your latest activity and account overview
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 w-full">
                        <div className="flex flex-col w-full p-4 gap-2 border border-neutral-200 dark:border-neutral-800 rounded-xl col-span-2">
                            <span className="text-sm md:text-base font-semibold text-blue-500">
                                About
                            </span>
                            <p className="text-sm md:text-base text-neutral-700 dark:text-neutral-400">
                                {user?.description ?? "Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui odio natus magnam odit iste nostrum repellat asperiores beatae, enim magni, quos explicabo quisquam aut quas vel at. Facilis, odit dignissimos."}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
