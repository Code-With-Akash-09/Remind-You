import TodayTaskList from "@/molecules/TodayTaskList"
import TodoChart from "@/molecules/TodoChart"
import TodoPriority from "@/molecules/TodoPriority"
import TotalTodoCount from "@/molecules/TotalTodoCount"
import { Skeleton } from "@/ui/skeleton"

const Dashboard = () => {
	return (
		<>
			<div className="flex h-full w-full">
				<div className="grid grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 h-full w-full gap-4">
					<div className="flex flex-col w-full h-full gap-4 col-span-4 md:col-span-2 xl:col-span-3">
						<div className="flex flex-col w-full h-fit border border-neutral-200 dark:border-neutral-700 p-4 gap-2 md:gap-4 rounded-md">
							<span className="text-lg md:text-xl lg:text-2xl font-medium">
								Welcome 👋
							</span>
							<p className="text-sm md:text-base">
								We’re glad to see you back! Ready to tackle your tasks and crush your goals? Stay focused, stay productive — we’re here to help you organize your day, one task at a time. Let’s get things done!
							</p>
						</div>
						<div className="flex md:hidden flex-col w-full h-fit border border-neutral-200 dark:border-neutral-700 p-4 gap-2 md:gap-4 rounded-md">
							<span className="text-sm font-medium">Todays Tasks</span>
							<TodayTaskList />
						</div>
						<div className="flex flex-col w-full h-fit">
							<TotalTodoCount />
						</div>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-fit w-full">
							<div className="flex flex-col w-full flex-grow border border-neutral-200 dark:border-neutral-700 p-4 gap-2 md:gap-4 rounded-md md:col-span-2">
								<span className="text-sm font-medium">Progress Chart</span>
								<TodoChart />
							</div>
							<div className="flex flex-col w-full flex-grow border border-neutral-200 justify-between dark:border-neutral-700 p-4 gap-2 md:gap-4 rounded-md">
								<span className="text-sm font-medium">Priority Todos</span>
								<TodoPriority />
							</div>
						</div>
						<div className="flex flex-col w-full h-full border border-neutral-200 dark:border-neutral-700 p-4 gap-2 md:gap-4 rounded-md">
							<span className="text-sm font-medium">Todays Tasks</span>
							<Skeleton className={"w-full h-full"} />
						</div>
					</div>
					<div className="hidden sm:flex flex-col w-full h-full border border-neutral-200 dark:border-neutral-700 p-4 gap-4 rounded-md md:col-span-2 lg:col-span-1">
						<span className="text-sm font-medium">Todays Tasks</span>
						<TodayTaskList />
					</div>
				</div >
			</div >
		</>
	)
}

export default Dashboard