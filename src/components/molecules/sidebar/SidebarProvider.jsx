"use client"

import Logo from "@/atoms/logo"
import { Button } from "@/ui/button"
import { AnimatePresence, motion } from "framer-motion"
import { FolderPlusIcon, HomeIcon, ListTodo, MenuIcon, SettingsIcon } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const SidebarProvider = ({ children }) => {

    const [isToggle, setIsToggle] = useState(true)

    const toggleSidebar = () => {
        setIsToggle(prev => !prev)
    }

    return (
        <div className="size-full flex divide-x">
            <motion.div
                animate={{ width: isToggle ? 288 : 78 }}
                initial={{ width: 288 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className={`flex p-2 md:p-4`}
            >
                <div className="flex flex-col gap-4 w-full">
                    <div className="flex gap-4 w-full">
                        <Button
                            onClick={() => toggleSidebar()}
                            className={"w-fit !px-3"}
                        >
                            <MenuIcon className="size-5" />
                        </Button>
                        <AnimatePresence>
                            {isToggle && (
                                <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    transition={{ duration: 0.4, ease: "easeInOut" }}
                                >
                                    <Logo />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                    <SidebarItems toggle={isToggle} />
                </div>
            </motion.div>
            <div className="flex flex-col flex-grow">
                <div className="flex w-full justify-between p-2 md:p-4 border-b border-neutral-200">
                    <div className="flex w-fit items-center font-bold text-2xl">
                        Hey
                    </div>
                    <div className="flex w-fit gap-4">
                        <Button>
                            <FolderPlusIcon />
                            Create Folder
                        </Button>
                        <Button
                            variant={"outline"}
                        >
                            <FolderPlusIcon />
                            Create Todo
                        </Button>
                    </div>
                </div>
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
                        <li key={i} className="flex h-10 w-full">
                            <Link
                                href={item.url}
                                className="flex gap-4 items-center w-full"
                            >
                                <div className="flex h-full w-fit border border-neutral-200 bg-amber-400 text-white rounded-md items-center justify-center">
                                    <span className="px-3 py-2">
                                        <item.icon className="size-5" />
                                    </span>
                                </div>
                                <AnimatePresence>
                                    {toggle && (
                                        <motion.div
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -10 }}
                                            transition={{ duration: 0.4, ease: "easeInOut" }}
                                            className="flex w-fit"
                                        >
                                            <span className="text-base font-medium whitespace-nowrap">
                                                {item.name}
                                            </span>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </Link>
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