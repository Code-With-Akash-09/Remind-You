import { getTodosCount } from "@/actions/dashboard";

const TotalTodoCount = async () => {

    const resp = await getTodosCount();
    const result = resp?.data?.result

    return (
        <>
            <div className="w-full grid grid-cols-2 xl:grid-cols-3 gap-4">
                <div className="flex flex-col w-full border border-neutral-200 dark:border-neutral-700 p-4 rounded-md gap-2 shadow-sm">
                    <span className="text-sm md:text-base font-normal text-neutral-700">
                        Total Todos
                    </span>
                    <span className="text-lg md:text-xl font-semibold">{result?.total ?? 0}</span>
                </div>
                <div className="flex flex-col w-full border border-neutral-200 dark:border-neutral-700 p-4 rounded-md gap-2 shadow-sm">
                    <span className="text-sm md:text-base font-normal text-neutral-700">
                        Not Started
                    </span>
                    <span className="text-lg md:text-xl font-semibold">{result?.notStarted ?? 0}</span>
                </div>
                <div className="flex flex-col w-full border border-neutral-200 dark:border-neutral-700 p-4 rounded-md gap-2 shadow-sm">
                    <span className="text-sm md:text-base font-normal text-neutral-700">
                        In Progress
                    </span>
                    <span className="text-lg md:text-xl font-semibold">{result?.inProgress ?? 0}</span>
                </div>
                <div className="flex flex-col w-full border border-neutral-200 dark:border-neutral-700 p-4 rounded-md gap-2 shadow-sm">
                    <span className="text-sm md:text-base font-normal text-neutral-700">
                        Completed
                    </span>
                    <span className="text-lg md:text-xl font-semibold">{result?.completed ?? 0}</span>
                </div>
                <div className="flex flex-col w-full border border-neutral-200 dark:border-neutral-700 p-4 rounded-md gap-2 shadow-sm">
                    <span className="text-sm md:text-base font-normal text-neutral-700">
                        Cancelled
                    </span>
                    <span className="text-lg md:text-xl font-semibold">{result?.cancelled ?? 0}</span>
                </div>
                <div className="flex flex-col w-full border border-neutral-200 dark:border-neutral-700 p-4 rounded-md gap-2 shadow-sm">
                    <span className="text-sm md:text-base font-normal text-neutral-700">
                        Backlog
                    </span>
                    <span className="text-lg md:text-xl font-semibold">{result?.backlog ?? 0}</span>
                </div>
            </div>
        </>
    )
}

export default TotalTodoCount
