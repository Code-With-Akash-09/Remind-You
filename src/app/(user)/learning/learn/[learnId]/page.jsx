import { getLearnById } from "@/actions/learn";

const LearnId = async ({ params }) => {

    const { learnId } = await params
    const resp = await getLearnById(learnId)
    const learn = resp?.data?.result

    return (
        <div className="flex w-full flex-1 max-w-7xl mx-auto">
            <div className="flex w-full px-4">
                <div className="relative flex w-full">
                    <iframe
                        src={`https://www.youtube.com/embed/${learn?.videoUrl}?autoplay=1&mute=1`}
                        title={"YouTube video player"}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                        className="h-full w-full rounded-md"
                    ></iframe>
                </div>
            </div>
        </div>
    )
}

export default LearnId