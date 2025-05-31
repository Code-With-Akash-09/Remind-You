import { getTodosByPriority } from "@/actions/dashboard";
import PriorityChart from "@/atoms/PriorityChart";

const TodoPriority = async () => {

    const resp = await getTodosByPriority();
    const result = resp?.data?.result

    return (
        <>
            <PriorityChart data={result} />
        </>
    )
}

export default TodoPriority
