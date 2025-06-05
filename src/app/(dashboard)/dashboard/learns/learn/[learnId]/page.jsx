"use client"

import { getLearnById } from "@/actions/learn";
import Loading from "@/atoms/loading";
import useRemindYouStore from "@/store";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const LearnId = () => {

    const { learnId } = useParams()
    const [learn, setLearn] = useState(null)
    const [loading, setLoading] = useState(false)
    const dispatch = useRemindYouStore((state) => state.dispatch)
    const learnCreated = useRemindYouStore((state) => state.learnCreated)
    const learnDeleted = useRemindYouStore((state) => state.learnDeleted)

    const getLearn = async () => {
        setLoading(true)
        const { data = [] } = await getLearnById(learnId)

        if (data) {
            setLearn(data.result)
            setLoading(false)
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
        getLearn()
    }, [learnId])

    useEffect(() => {
        getLearn()
    }, [learnCreated, learnDeleted])

    return (
        <div className="size-full flex">
            {
                loading ? (
                    <div className="flex flex-1 items-center justify-center w-full bg-gradient-to-r from-blue-50 to-amber-50 dark:from-blue-600/10 dark:to-amber-600/10">
                        <Loading />
                    </div>
                ) : (
                    <div className="flex gap-4 md:divide-x md:divide-neutral-200  dark:md:divide-neutral-800 w-full">
                        <div className="relative rounded-lg lg:rounded-r-none lg:rounded-l-lg aspect-video flex w-full">
                            <iframe
                                src={`https://www.youtube.com/embed/${learn?.videoUrl}?autoplay=1&mute=1`}
                                title={"YouTube video player"}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                                className="absolute inset-0 z-10 h-full w-full rounded-md"
                            ></iframe>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default LearnId