"use client"

import { logout } from "@/actions/auth"
import UserAvatar from "@/atoms/userAvatar"
import { toastMessager } from "@/lib/utils"
import EditProfile from "@/molecules/EditProfile"
import useRemindYouStore from "@/store"
import { Button } from "@/ui/button"
import { LogOut } from "lucide-react"
import { useRouter } from "next/navigation"

const Profile = () => {

    const user = useRemindYouStore(store => store.user)
    const router = useRouter()

    const handleLogout = () => {
        logout()
            .then(() => {
                toastMessager("Logged Out", 200)
                router.push("/dashboard")
            })
            .catch(err => {
                toastMessager("Failed to logout", 500)
            })
    }

    return (
        <div className="size-full flex flex-col gap-6 divide-y">
            <div className="flex flex-col gap-4 w-full">
                <div className="flex flex-col gap-6 w-full max-w-3xl mx-auto">
                    <div className="flex rounded-xl md:p-4 items-center justify-center w-full">
                        <div className="flex h-28 w-28 border-2 border-neutral-200 dark:border-neutral-800 rounded-full">
                            <UserAvatar
                                alt={user?.name ?? "John Doe"}
                                unoptimized={false}
                                priority
                                className={"w-full h-full rounded-full"}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 max-w-xs mx-auto gap-2 w-full">
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
                    <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-4 p-4 md:p-0">
                        <div className="flex w-full flex-col">
                            <span className="text-sm md:text-base font-medium pl-3 text-neutral-500">
                                Name
                            </span>
                            <span className="text-sm md:text-base border border-neutral-200 px-4 py-3 bg-white dark:bg-neutral-800/50 rounded-lg">
                                {user?.name ?? "John doe"}
                            </span>
                        </div>
                        <div className="flex w-full flex-col">
                            <span className="text-sm md:text-base font-medium pl-3 text-neutral-500">
                                Designation
                            </span>
                            <span className="text-sm md:text-base border border-neutral-200 px-4 py-3 bg-white dark:bg-neutral-800/50 rounded-lg">
                                {user?.designation ?? "Software Engineer"}
                            </span>
                        </div>
                        <div className="flex w-full flex-col">
                            <span className="text-sm md:text-base font-medium pl-3 text-neutral-500">
                                Email
                            </span>
                            <span className="text-sm md:text-base border border-neutral-200 px-4 py-3 bg-white dark:bg-neutral-800/50 rounded-lg">
                                {user?.email ?? "abc@gmail.com"}
                            </span>
                        </div>
                        <div className="flex w-full flex-col">
                            <span className="text-sm md:text-base font-medium pl-3 text-neutral-500">
                                Mobile
                            </span>
                            <span className="text-sm md:text-base border border-neutral-200 px-4 py-3 bg-white dark:bg-neutral-800/50 rounded-lg">
                                {user?.mobile ?? "9988776655"}
                            </span>
                        </div>
                        <div className="flex w-full flex-col md:col-span-2">
                            <span className="text-sm md:text-base font-medium pl-3 text-neutral-500">
                                About
                            </span>
                            <span className="text-sm md:text-base border border-neutral-200 p-4 bg-white dark:bg-neutral-800/50 rounded-lg">
                                {user?.description ?? "Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui odio natus magnam odit iste nostrum repellat asperiores beatae, enim magni, quos explicabo quisquam aut quas vel at. Facilis, odit dignissimos."}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
