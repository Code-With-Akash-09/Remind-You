import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { GripHorizontal } from 'lucide-react'
import { useRouter } from 'next/navigation'
import CreateFolderForm from './CreateFolderForm'
import DeleteTodo from './DeleteTodo'

const DragCard = ({ todo, handleDragStart }) => {
    return (
        <>
            {
                todo.type === "folder" ? (
                    <DragFolderCard todo={todo} />
                ) : (
                    <DragFileCard
                        todo={todo}
                        handleDragStart={handleDragStart}
                    />
                )
            }
        </>
    )
}

export default DragCard

const DragFolderCard = ({ todo }) => {

    const router = useRouter()

    const handleRedirect = () => {
        router.push(`/dashboard/todos/${todo.todoId}?parentId=${todo.parentId}`)
    }

    return (
        <div
            className="flex flex-col aspect-[3/1.8] md:aspect-video cursor-pointer w-full border relative rounded-md bg-[url('/assets/banner-img/folder-bg.avif')] group bg-contain md:bg-cover bg-right md:bg-center bg-no-repeat hover:shadow-md border-amber-400 dark:border-amber-400/60 transition-all">
            <div
                onClick={handleRedirect}
                className="flex flex-col justify-between flex-grow flex-1 border-b border-neutral-200 dark:border-neutral-700 w-full p-2 md:p-4 gap-1 md:gap-2">
                <div className="flex w-full">
                    <span className="font-semibold text-xs md:text-sm lg:text-base text-neutral-800 dark:text-neutral-200 line-clamp-1">
                        {todo.label}
                    </span>
                </div>
                <div className="flex flex-col gap-0 sm:gap-1 w-full">
                    <span className="text-[8px] md:text-xs font-normal text-neutral-700 dark:text-neutral-200">
                        <b>Folder:</b> {todo.count?.folder}
                    </span>
                    <span className="text-[8px] md:text-xs font-normal text-neutral-700 dark:text-neutral-200">
                        <b>File:</b> {todo.count?.file}
                    </span>
                </div>
            </div>
            <div className="flex flex-grow-0 w-full px-2 sm:px-4 py-1 sm:py-2">
                <span className="text-[8px] md:text-[9px] lg:text-[10px] text-neutral-500 dark:text-neutral-200">
                    {format(todo.createdAt, "P")}
                </span>
                <span className="text-[8px] md:text-[9px] lg:text-[10px] text-neutral-500 dark:text-neutral-200">
                </span>
            </div>
            <div className="flex absolute z-10 right-2 bottom-2 md:top-2 gap-2 h-fit w-fit items-start justify-end md:opacity-0 md:group-hover:opacity-100  ease-in-out transition-all">
                <CreateFolderForm
                    parentId={todo.parentId}
                    initialData={todo}
                    className={"size-6 md:size-8"}
                    iconClassName={"!size-3"}
                />
                <DeleteTodo
                    todoId={todo.todoId}
                    type="folder"
                    className={"size-6 md:size-8"}
                    iconClassName={"!size-3"}
                />
            </div>
        </div>
    )
}

const DragFileCard = ({ todo, handleDragStart }) => {

    const router = useRouter()

    const handleRedirect = () => {
        router.push(`/dashboard/todos/todo/${todo.todoId}`)
    }

    return (
        <div
            draggable
            onClick={handleRedirect}
            onDragStart={(e) => handleDragStart(e, todo)}
            className={cn(`flex flex-col relative justify-between border rounded-lg border-blue-400 dark:border-blue-400/60 dark:border-neutral-700 w-full py-2 sm:py-3 gap-2 bg-[url('/assets/banner-img/file-bg.avif')] group bg-contain bg-right bg-no-repeat hover:shadow-md transition-all ${handleDragStart ? "cursor-grab" : "cursor-pointer"}`)}
        >

            <div className="flex group-hover:visible invisible group-hover:opacity-65 transition-all ease-in-out opacity-0 absolute bottom-0 left-0 right-0 items-center justify-center flex-col w-full">
                <GripHorizontal />
            </div>
            <div className="flex flex-col w-full px-2 md:px-4">
                <span className="font-semibold text-xs md:text-sm lg:text-base text-neutral-800 dark:text-neutral-200 line-clamp-1">
                    {todo.label}
                </span>
            </div>
            <div className="flex flex-grow-0 justify-between w-full px-2 sm:px-4">
                <span className="text-[8px] md:text-[9px] lg:text-[10px] text-neutral-500  dark:text-neutral-200">
                    {format(todo.createdAt, "P")}
                </span>
                <span className="text-[8px] md:text-[9px] lg:text-[10px] text-neutral-500  dark:text-neutral-200">
                    {format(todo.startDate, "P")}
                </span>
            </div>
        </div>
    )
}