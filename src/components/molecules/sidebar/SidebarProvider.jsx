"use client"

import Logo from "@/atoms/logo"
import { Button } from "@/ui/button"
import { HomeIcon, ListTodo, MenuIcon, SettingsIcon } from "lucide-react"
import { useState } from "react"

const SidebarProvider = ({ children }) => {

    const [isToggle, setIsToggle] = useState(true)

    const toggleSidebar = () => {
        setIsToggle(prev => !prev)
    }

    return (
        <div className="size-full flex">
            <div className={`flex p-2 md:p-4 border ${isToggle ? "w-72" : "w-fit"}`}>
                <div className="flex flex-col gap-4 w-full">
                    <div className="flex gap-4 w-full">
                        <Button
                            onClick={() => toggleSidebar()}
                            className={"w-fit !px-4"}
                        >
                            <MenuIcon className="size-5" />
                        </Button>
                        {isToggle && <Logo />}
                    </div>
                    <SidebarItems toggle={isToggle} />
                </div>
            </div>
            <div className="flex flex-grow bg-red-500 p-2 md:p-4">
                {children}
            </div>
        </div>
    )
}

export default SidebarProvider


const SidebarItems = ({ toggle }) => {
    return (
        <>
            <ul className="flex flex-col gap-4 w-full">
                {
                    NavList.map((item, i) => (
                        <li key={i} className="flex gap-4 items-center h-10 w-full">
                            <div className="flex h-full w-fit border border-neutral-200 rounded-md items-center justify-center">
                                <span className="px-4 py-2">
                                    <item.icon className="size-5" />
                                </span>
                            </div>
                            {
                                toggle && (
                                    <div className="flex w-fit">
                                        <span className="text-base font-medium">
                                            {item.name}
                                        </span>
                                    </div>
                                )
                            }
                        </li>
                    ))
                }
            </ul>
        </>
    )
}

const NavList = [
    {
        name: "Dashboard",
        url: "/dashboard",
        icon: HomeIcon,
    },
    {
        name: "All Todos",
        url: "/dashboard/todos",
        icon: ListTodo,
    },
    {
        name: "Setting",
        url: "/setting",
        icon: SettingsIcon,
    }
]