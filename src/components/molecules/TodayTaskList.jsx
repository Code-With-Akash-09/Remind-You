import { Skeleton } from "@/ui/skeleton";

const TodayTaskList = () => {
    const cards = Array.from({ length: 10 }, (_, i) => i + 1);
    return (
        <>
            <ul className="w-full flex flex-col gap-4">
                {
                    cards.map(card => (
                        <li key={card} className="flex w-full">
                            <Skeleton className="w-full h-10 rounded-md" />
                        </li>
                    ))
                }
            </ul>
        </>
    )
}

export default TodayTaskList
