"use client"

import BackBtn from "@/atoms/BackBtn"
import HomeNavbar from "@/organisms/navbar/HomeNavbar"
import { useParams, usePathname } from "next/navigation"

const UserLayout = ({ children }) => {

    const { learnId } = useParams()
    const pathname = usePathname()

    return (
        <div className="flex flex-col gap-4 size-full pb-4">
            <HomeNavbar />
            <div className="flex flex-col flex-1 gap-4 w-full">
                <div className="flex flex-grow-0 h-fit items-center gap-4 max-w-7xl mx-auto px-4 w-full">
                    <BackBtn />
                    <span className="font-bold text-xl lg:text-2xl">
                        {
                            pathname === "/learning" ?
                                "All Learning Modules" :
                                pathname === `/learning/learn/${learnId}` ?
                                    "Video" : "Videos"
                        }
                    </span>
                </div>
                <div className="flex flex-grow w-full">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default UserLayout
