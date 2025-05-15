"use client"

import InputWithLabel from "@/atoms/InputWithLabel"
import EditProfile from "@/molecules/EditProfile"
import useRemindYouStore from "@/store"

const Profile = () => {

    const user = useRemindYouStore(store => store.user)

    return (
        <div className="size-full flex flex-col gap-6 divide-y bg-gradient-to-r from-blue-50 to-amber-50 dark:from-blue-600/10 dark:to-amber-600/10">
            <div className="flex flex-col gap-4 md:gap-6 max-w-sm mx-auto my-auto border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-950 p-4 md:p-6 rounded-lg w-full">

                <span className="text-lg md:text-xl lg:text-2xl font-bold text-neutral-700 dark:text-neutral-200">
                    Profile
                </span>

                <div className="flex flex-col gap-4 w-full">
                    <InputWithLabel
                        id={"Name"}
                        label={"Name"}
                        disabled
                        placeholder={"Name"}
                        value={user?.name ?? ""}
                    />
                    <InputWithLabel
                        id={"Mobile Number"}
                        label={"Mobile Number"}
                        disabled
                        placeholder={"Mobile Number"}
                        value={user?.mobile ?? ""}
                    />
                    <InputWithLabel
                        id={"Email"}
                        label={"Email"}
                        disabled
                        placeholder={"Email"}
                        value={user?.email ?? ""}
                    />
                </div>
                <EditProfile user={user} />
            </div>
        </div>
    )
}

export default Profile
