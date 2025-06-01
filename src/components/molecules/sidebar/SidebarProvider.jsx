"use client"

import { logout } from "@/actions/auth"
import BackBtn from "@/atoms/BackBtn"
import Logo from "@/atoms/logo"
import ThemeSwitcher from "@/atoms/themeSwitcher"
import UserAvatar from "@/atoms/userAvatar"
import useMediaQuery from "@/hooks/useMediaQuery"
import { toastMessager } from "@/lib/utils"
import useRemindYouStore from "@/store"
import { Button } from "@/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuShortcut, DropdownMenuTrigger } from "@/ui/dropdown-menu"
import { Separator } from "@/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/ui/tooltip"
import { AnimatePresence, motion } from "framer-motion"
import { HomeIcon, ListTodo, LogOut, MenuIcon, UserIcon, UserRound } from "lucide-react"
import { useTheme } from "next-themes"
import Link from "next/link"
import { useParams, usePathname } from "next/navigation"
import { useState } from "react"
import CreateFileForm from "../CreateFileForm"
import CreateFolderForm from "../CreateFolderForm"
import SearchBar from "../SearchBar"

const SidebarProvider = ({ children }) => {

    const pathname = usePathname()
    const [isToggle, setIsToggle] = useState(false)
    const { todoId } = useParams()
    const isMD = useMediaQuery("(max-width: 768px)");
    const isActive = (url) => url === pathname


    const getSectionTitle = (pathname) => {
        return SidebarNavList.find(item => item.url === pathname)?.name || ""
    }

    const toggleSidebar = () => {
        setIsToggle(prev => !prev)
    }

    return (
        <div className="size-full flex divide-x divide-neutral-200 dark:divide-neutral-700">
            {
                isMD ? (
                    <div className="flex p-2 border border-neutral-200 dark:border-neutral-800 fixed z-10 bottom-2 rounded-xl inset-x-0 w-fit max-w-lg mx-auto bg-neutral-200 dark:bg-neutral-950">
                        <BottomNav isActive={isActive} />
                    </div>
                ) : (
                    <motion.div
                        animate={{ width: isToggle ? 248 : 70 }}
                        initial={{ width: 248 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className={`flex p-3`}
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
                            <SidebarItems toggle={isToggle} isActive={isActive} />
                        </div>
                    </motion.div>
                )
            }
            <div className="flex flex-col flex-grow">
                <div className="flex w-full justify-between p-3 border-b
                 border-neutral-200 dark:border-neutral-700">
                    <div className="flex w-fit gap-2 md:gap-4 items-center">
                        {todoId && <BackBtn />}
                        {!isToggle && <Logo isMobile={true} />}
                        <span className="font-bold text-xl lg:text-2xl">{getSectionTitle(pathname)}</span>
                    </div>
                    <div className="flex w-fit gap-2 md:gap-4 items-center">
                        <SearchBar icon />
                        {
                            pathname !== `/dashboard/todos/todo/${todoId}` && (
                                <>
                                    <CreateFolderForm parentId={todoId ?? null} />
                                    <CreateFileForm parentId={todoId ?? null} />
                                </>
                            )
                        }
                    </div>
                </div>
                <div className="flex flex-1 w-full p-3 items-start overflow-y-auto">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default SidebarProvider

const BottomNav = ({ isActive }) => {

    return (
        <div className="flex gap-4 w-fit">
            {BottomNavList.map((item, i) => (
                <TooltipProvider key={i}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link
                                href={item.url}
                                className={`
                                    px-3 py-2 rounded-md transition-colors ${isActive(item.url) ?
                                        "bg-blue-500 text-white dark:bg-blue-800" : ""
                                    }`
                                }
                            >
                                <item.icon className="size-4" />
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent className="w-fit">
                            {item.name}
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            ))
            }
        </div >
    )
}

const SidebarItems = ({ toggle, isActive }) => {
    const user = useRemindYouStore(store => store.user)
    const { theme } = useTheme()

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
        <>
            <div className="flex flex-col flex-1 gap-4 justify-between w-full">
                <ul className="flex flex-col flex-1 gap-4 w-full">
                    {
                        SidebarNavList.map((item, i) => (
                            <li key={i} className="flex h-10 w-full">
                                <Link
                                    href={item.url}
                                    className="flex gap-4 items-center w-full"
                                >
                                    <div className="flex h-full w-fit border border-neutral-200 dark:border-neutral-700 bg-amber-400 text-white rounded-md items-center justify-center">
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
                                                <span className={`text-base font-medium whitespace-nowrap ${isActive(item.url) ?
                                                    "text-blue-500 dark:text-amber-500" : ""
                                                    }`}>
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
                <Separator />
                <div className="flex w-full gap-4">
                    <ThemeSwitcher size="default" className="!px-3" />
                    <AnimatePresence>
                        {toggle && (
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                transition={{ duration: 0.4, ease: "easeInOut" }}
                                className="flex w-fit items-center"
                            >
                                <span className="text-base font-medium whitespace-nowrap text-start w-fit">
                                    {theme === "dark" ? (
                                        "Dark"
                                    ) : (
                                        "Light"
                                    )}
                                </span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <div
                            className={"flex items-center gap-4 justify-start"}
                        >
                            <div className="flex h-10 w-[46px]">
                                <UserAvatar
                                    alt={user ? user.name : "John Doe"}
                                    unoptimized={false}
                                    priority
                                    className={"w-full"}
                                />
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
                                        <span className="text-base font-medium whitespace-nowrap text-start w-fit">
                                            {user ? user.name : "John Doe"}
                                        </span>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className={"min-w-44"}>
                        <DropdownMenuGroup>
                            <DropdownMenuItem asChild>
                                <Link
                                    href={`/dashboard/user/profile`}
                                    className="cursor-pointer"
                                >
                                    User Profile
                                    <DropdownMenuShortcut>
                                        <UserRound />
                                    </DropdownMenuShortcut>
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Button
                                    variant="custom"
                                    className={"h-[unset] w-full"}
                                    onClick={handleLogout}
                                >
                                    Log Out
                                    <DropdownMenuShortcut>
                                        <LogOut />
                                    </DropdownMenuShortcut>
                                </Button>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </>
    )
}

const SidebarNavList = [
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
]

const BottomNavList = [
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
        name: "User Profile",
        url: "/dashboard/user/profile",
        icon: UserIcon,
    },
]