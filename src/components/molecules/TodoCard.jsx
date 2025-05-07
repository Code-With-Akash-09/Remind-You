import { format } from "date-fns"
import { useRouter } from "next/navigation"
import CreateFolderForm from "./CreateFolderForm"
import DeleteTodo from "./DeleteTodo"

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

    const router = useRouter()

    return (
        <div
            className="flex flex-col aspect-video cursor-pointer w-full border relative rounded-md bg-[url('/assets/banner-img/folder-bg.avif')] group bg-cover bg-center hover:shadow-md border-amber-400 transition-all">
            <div
                onClick={() =>
                    router.push(
                        `/dashboard/todos/${todo.todoId}?parentId=${todo.parentId}`
                    )
                }
                className="flex flex-col justify-between flex-grow flex-1 border-b border-neutral-200 w-full p-4 ">
                <div className="flex w-full">
                    <span className="font-bold text-lg text-neutral-800">
                        {todo.label}
                    </span>
                </div>
                <div className="flex flex-col gap-1 w-full">
                    <span className="text-sm text-neutral-800">
                        <b>Folder:</b> {todo.count?.folder}
                    </span>
                    <span className="text-sm text-neutral-800">
                        <b>File:</b> {todo.count?.file}
                    </span>
                </div>
            </div>
            <div className="flex flex-grow-0 w-full px-4 py-2">
                <span className="text-[10px] text-neutral-500">
                    {format(todo.createdAt, "Pp")}
                </span>
            </div>
            <div className="flex absolute z-10 right-2 top-2 gap-2 h-fit w-fit items-start justify-end opacity-0 group-hover:opacity-100  ease-in-out transition-all">
                <CreateFolderForm
                    parentId={todo.parentId}
                    initialData={todo}
                />
                <DeleteTodo
                    todoId={todo.todoId}
                    type="folder"
                />
            </div>
        </div>
    )
}

const FileCard = ({ todo }) => {

    const router = useRouter()

    return (
        <div className="flex flex-col aspect-video cursor-pointer w-full border relative rounded-md bg-[url('/assets/banner-img/file-bg.avif')] group bg-cover bg-center hover:shadow-md border-blue-400 transition-all">
            <div
                onClick={() =>
                    router.push(
                        `/dashboard/todos/todo/${todo.todoId}`
                    )
                }
                className="flex flex-col justify-between flex-grow flex-1 border-b border-neutral-200 w-full p-4 ">
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
            <div className="flex absolute z-10 right-2 top-2 gap-2 h-fit w-fit items-start justify-end opacity-0 group-hover:opacity-100  ease-in-out transition-all">
                <DeleteTodo
                    todoId={todo.todoId}
                    type="file"
                />
            </div>
        </div>
    )
}