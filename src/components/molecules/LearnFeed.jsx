import { getAllLearnsPublic } from "@/actions/learn"
import LearnCard from "./LearnCard"

const LearnFeed = async () => {

    const resp = await getAllLearnsPublic({
        parentId: "root",
        page: 1,
        limit: 5,
    })

    const learns = resp?.data?.result

    return (
        <div className="flex w-full overflow-x-auto pb-3 scrollbar xl:overflow-x-hidden xl:scrollbar-hide">
            <div className="flex w-fit xl:grid xl:grid-cols-5 xl:w-full gap-4">
                {
                    learns?.map((learn, i) => (
                        <LearnCard
                            key={i}
                            learn={learn}
                            global
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default LearnFeed
