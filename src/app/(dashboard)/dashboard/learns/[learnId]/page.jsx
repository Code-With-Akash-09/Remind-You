"use client"

import { getAllLearns } from "@/actions/learn"
import Loading from "@/atoms/loading"
import LearnCard from "@/molecules/LearnCard"
import useRemindYouStore from "@/store"
import Image from "next/image"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

const LearnId = () => {

    const { learnId } = useParams()
    const [learns, setLearns] = useState([])
    const [loading, setLoading] = useState(false)
    const dispatch = useRemindYouStore((state) => state.dispatch)
    const learnCreated = useRemindYouStore((state) => state.learnCreated)
    const learnDeleted = useRemindYouStore((state) => state.learnDeleted)

    const getLearns = async () => {
        setLoading(true)
        const { data = [] } = await getAllLearns({
            parentId: learnId,
            page: 1,
            limit: 100,
        })

        if (data) {
            setLearns(data.result)
            dispatch({
                type: "SET_STATE",
                payload: {
                    learnCreated: false,
                    learnDeleted: false,
                }
            })
        }
        setLoading(false)
    }

    useEffect(() => {
        getLearns()
    }, [learnCreated, learnDeleted])

    return (
        <div className="size-full flex">
            {
                learns?.length <= 0 ? (
                    <div className="size-full flex items-center bg-gradient-to-r from-blue-50 to-amber-50 dark:from-blue-600/10 dark:to-amber-600/10 justify-center rounded-md">
                        <div className="flex flex-col gap-4 w-full max-w-sm items-center justify-center">
                            {
                                loading ? <Loading /> : (
                                    <>
                                        <div className="flex w-full aspect-square max-w-xs relative">
                                            <Image
                                                src={"/assets/banner-img/empty-todo.avif"}
                                                alt="empty-todo"
                                                fill
                                                className="object-contain"
                                            />
                                        </div>
                                        <div className="flex w-full items-center justify-center">
                                            <span className="text-lg md:text-xl lg:text-2xl xl:text-3xl text-neutral-800 dark:text-neutral-400 font-bold">
                                                You have no learns
                                            </span>
                                        </div>
                                    </>
                                )
                            }
                        </div>
                    </div>
                ) : (
                    <div className="flex w-full h-full md:h-[calc(100%-140px)] overflow-y-auto scrollbar-hide">
                        <div className="grid grid-cols-2 h-fit sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-full gap-2 md:gap-4">
                            {
                                learns?.map((learn, i) => (
                                    <LearnCard key={i} learn={learn} />
                                ))
                            }
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default LearnId