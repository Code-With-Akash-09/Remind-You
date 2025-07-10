import Loading from "@/atoms/loading";
import TodoCard from "@/molecules/TodoCard";
import Image from "next/image";

const TodoLists = ({ todos, loading, selectedIds = [], handleCardSelect }) => {
    return (
        <>
            {
                todos?.length <= 0 ? (
                    <div className="w-full h-[calc(100vh-140px)] flex items-center bg-gradient-to-r from-blue-50 to-amber-50 dark:from-blue-600/10 dark:to-amber-600/10 justify-center rounded-md">
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
                                                You have no todos
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
                                todos?.map((todo, i) => (
                                    <TodoCard
                                        key={i}
                                        todo={todo}
                                        isTodoChecked={
                                            selectedIds.length > 0 ? selectedIds.includes(todo.todoId) : false
                                        }
                                        handleCardSelect={handleCardSelect}
                                    />
                                ))
                            }
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default TodoLists
