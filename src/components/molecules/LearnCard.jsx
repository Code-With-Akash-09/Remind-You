import { format } from "date-fns"
import { useRouter } from "next/navigation"
import CreateLearnFileForm from "./CreateLearnFileForm"
import CreateLearnFolderForm from "./CreateLearnFolderForm"
import DeleteLearn from "./DeleteLearn"

const LearnCard = ({ learn }) => {
    return (
        <>
            {
                learn.type === "folder" ? (
                    <FolderCard learn={learn} />
                ) : (
                    <FileCard learn={learn} />
                )
            }
        </>
    )
}

export default LearnCard


const FolderCard = ({ learn }) => {

    const router = useRouter()

    const handleRedirect = () => {
        router.push(`/dashboard/learns/${learn.learnId}?parentId=${learn.parentId}`)
    }

    return (
        <div
            className="flex flex-col aspect-[3/1.8] md:aspect-video cursor-pointer w-full border relative rounded-md bg-[url('/assets/banner-img/video-folder-bg.avif')] group bg-contain md:bg-cover bg-right md:bg-center bg-no-repeat hover:shadow-md border-amber-400 dark:border-amber-400/60 transition-all">
            <div
                onClick={handleRedirect}
                className="flex flex-col justify-between flex-grow flex-1 border-b border-neutral-200 dark:border-neutral-700 w-full p-2 md:p-4 gap-1 md:gap-2">
                <div className="flex w-full">
                    <span className="font-semibold text-xs md:text-sm lg:text-base text-neutral-800 dark:text-neutral-200 line-clamp-1">
                        {learn.label}
                    </span>
                </div>
                <div className="flex flex-col gap-0 sm:gap-1 w-full">
                    <span className="text-[8px] md:text-xs font-normal text-neutral-700 dark:text-neutral-200">
                        <b>Folder:</b> {learn.count?.folder}
                    </span>
                    <span className="text-[8px] md:text-xs font-normal text-neutral-700 dark:text-neutral-200">
                        <b>Videos:</b> {learn.count?.file}
                    </span>
                </div>
            </div>
            <div className="flex flex-grow-0 w-full px-2 sm:px-4 py-1 sm:py-2">
                <span className="text-[8px] md:text-[9px] lg:text-[10px] text-neutral-500 dark:text-neutral-200">
                    {format(learn.createdAt, "P")}
                </span>
                <span className="text-[8px] md:text-[9px] lg:text-[10px] text-neutral-500 dark:text-neutral-200">
                </span>
            </div>
            <div className="flex absolute z-10 right-2 bottom-2 md:top-2 gap-2 h-fit w-fit items-start justify-end md:opacity-0 md:group-hover:opacity-100  ease-in-out transition-all">
                <CreateLearnFolderForm
                    parentId={learn.parentId}
                    initialData={learn}
                    className={"size-6 md:size-8"}
                    iconClassName={"!size-3"}
                />
                <DeleteLearn
                    learnId={learn.learnId}
                    type="folder"
                    className={"size-6 md:size-8"}
                    iconClassName={"!size-3"}
                />
            </div>
        </div>
    )
}

const FileCard = ({ learn }) => {

    const router = useRouter()

    const handleRedirect = () => {
        router.push(`/dashboard/learns/learn/${learn.learnId}`)
    }

    return (
        <div className="flex flex-col aspect-[3/1.8] h-full md:aspect-video cursor-pointer w-full border relative rounded-md bg-[url('/assets/banner-img/video-file-bg.avif')] group bg-contain md:bg-cover bg-right md:bg-center bg-no-repeat hover:shadow-md border-blue-400 dark:border-blue-400/60 transition-all">
            <div
                onClick={handleRedirect}
                className="flex flex-col justify-between flex-grow flex-1 border-b border-neutral-200 dark:border-neutral-700 w-full p-2 md:p-4 gap-1 md:gap-2">
                <div className="flex w-full">
                    <span className="font-semibold text-xs md:text-sm lg:text-base text-neutral-800 dark:text-neutral-200 line-clamp-1">
                        {learn.label}
                    </span>
                </div>
            </div>
            <div className="flex flex-grow-0 justify-between w-full px-2 sm:px-4 py-1 sm:py-2">
                <span className="text-[8px] md:text-[9px] lg:text-[10px] text-neutral-500  dark:text-neutral-200">
                    {format(learn.createdAt, "P")}
                </span>
            </div>
            <div className="flex absolute z-10 right-2 bottom-2 md:top-2 gap-2 h-fit w-fit items-start justify-end md:opacity-0 md:group-hover:opacity-100 ease-in-out transition-all">
                <CreateLearnFileForm
                    parentId={learn.parentId}
                    initialData={learn}
                    className={"size-6 md:size-8"}
                    iconClassName={"!size-3"}
                />
                <DeleteLearn
                    learnId={learn.learnId}
                    type="file"
                    className={"size-6 md:size-8"}
                    iconClassName={"!size-3"}
                />
            </div>
        </div>
    )
}