import { getTodosByStatus } from "@/actions/todo";
import TodoCard from "@/molecules/TodoCard";
import Image from "next/image";

const StatusId = async ({ params }) => {
    const { statusId } = await params;
    let todos = await getTodosByStatus(statusId)
    todos = todos?.data?.result || []

    return (
        <div className="size-full flex">
            {
                todos?.length <= 0 ? (
                    <div className="size-full flex items-center bg-gradient-to-r from-blue-50 to-amber-50 dark:from-blue-600/10 dark:to-amber-600/10 justify-center rounded-md">
                        <div className="flex flex-col gap-4 w-full max-w-sm items-center justify-center">
                            <div className="flex w-full aspect-square max-w-xs relative">
                                <Image
                                    src={"/assets/banner-img/empty-todo.avif"}
                                    alt="empty-todo"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <div className="flex w-full items-center justify-center">
                                <span className="text-lg md:text-xl lg:text-2xl xl:text-3xl text-neutral-700 dark:text-neutral-400 font-bold">
                                    You have Empty Todos
                                </span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 w-full h-full md:h-full overflow-y-auto scrollbar-hide">
                        <div className="grid grid-cols-2 h-fit sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-full gap-2 md:gap-4">
                            {
                                todos?.map((todo, i) => (
                                    <TodoCard key={i} todo={todo} />
                                ))
                            }
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default StatusId