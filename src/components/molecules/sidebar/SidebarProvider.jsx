"use client"

import BackBtn from "@/atoms/BackBtn"
import Logo from "@/atoms/logo"
import { Button } from "@/ui/button"
import { AnimatePresence, motion } from "framer-motion"
import { FilePlusIcon, HomeIcon, ListTodo, MenuIcon, SettingsIcon } from "lucide-react"
import Link from "next/link"
import { useParams, usePathname } from "next/navigation"
import { useState } from "react"
import CreateFolderForm from "../CreateFolderForm"

const SidebarProvider = ({ children }) => {

    const pathname = usePathname()
    const [isToggle, setIsToggle] = useState(true)
    const { todoId } = useParams()

    const getSectionTitle = (pathname) => {
        return NavList.find(item => item.url === pathname)?.name || ""
    }

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
                    <div className="flex w-fit gap-4 items-center font-bold text-2xl">
                        {todoId && <BackBtn />}
                        {getSectionTitle(pathname)}
                    </div>
                    <div className="flex w-fit gap-4">
                        <CreateFolderForm parentId={todoId ?? null} />
                        <Button
                            variant={"outline"}
                        >
                            <FilePlusIcon />
                            Create Todo
                        </Button>
                    </div>
                </div>
                <div className="flex flex-1 w-full p-2 md:p-4">
                    {children}
                </div>
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