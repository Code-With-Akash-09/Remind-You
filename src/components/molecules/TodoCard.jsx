import { format } from "date-fns"

const TodoCard = ({ todo }) => {
    return (
        <>
            {
                todo.type === "folder" ? (
                    <FolderCard todo={todo} />
                ) : (
                    <FileCard todo={todo} />
                )
            }
        </>
    )
}

export default TodoCard


const FolderCard = ({ todo }) => {
    return (
        <div className="flex flex-col aspect-video w-full border relative rounded-md bg-[url('/assets/banner-img/folder-bg.avif')] bg-cover bg-center hover:shadow-md hover:border-amber-400 transition-all">
            <div className="flex flex-col justify-between flex-grow flex-1 border-b border-neutral-200 w-full p-4 ">
                <div className="flex w-full">
                    <span className="font-bold text-lg text-neutral-800">
                        {todo.label}
                    </span>
                </div>
                <div className="flex flex-col gap-1 w-full">
                    <span className="text-sm text-neutral-800">
                        <b>Folder:</b> 12
                    </span>
                    <span className="text-sm text-neutral-800">
                        <b>File:</b> 12
                    </span>
                </div>
            </div>
            <div className="flex flex-grow-0 w-full px-4 py-2">
                <span className="text-[10px] text-neutral-500">
                    {format(todo.createdAt, "Pp")}
                </span>
            </div>
        </div>
    )
}

const FileCard = ({ todo }) => {
    return (
        <div className="flex flex-col aspect-video w-full border relative rounded-md bg-[url('/assets/banner-img/file-bg.avif')] bg-cover bg-center hover:shadow-md hover:border-blue-400 transition-all">
            <div className="flex flex-col justify-between flex-grow flex-1 border-b border-neutral-200 w-full p-4 ">
                <div className="flex w-full">
                    <span className="font-bold text-lg text-neutral-800">
                        {todo.label}
                    </span>
                </div>
                <div className="flex flex-col gap-1 w-full">
                    <span className="text-sm text-neutral-800">
                        <b>Status:</b> In Progress
                    </span>
                    <span className="bg-neutral-300 rounded-full h-2 w-2/4"></span>
                </div>
            </div>
            <div className="flex flex-grow-0 w-full px-4 py-2">
                <span className="text-[10px] text-neutral-500">
                    {format(todo.createdAt, "Pp")}
                </span>
            </div>
        </div>
    )
}