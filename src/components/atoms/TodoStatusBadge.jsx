
const TodoStatusBadge = ({ status }) => {

    const todoStatus = TodoState.find(item => item.value === status)

    return (
        <span
            className={`px-3 py-1 text-xs font-medium rounded-md text-center ${todoStatus?.className}`}
        >
            {todoStatus?.label}
        </span>
    )
}

export default TodoStatusBadge


const TodoState = [
    {
        label: "Backlog",
        value: "backlog",
        className: "bg-red-500 text-white"
    },
    {
        label: "Cancelled",
        value: "cancelled",
        className: "bg-black text-white"
    },
    {
        label: "Not Started",
        value: "not-started",
        className: "bg-gray-400 text-white"
    },
    {
        label: "In Progress",
        value: "in-progress",
        className: "bg-blue-500 text-white"
    },
    {
        label: "Completed",
        value: "completed",
        className: "bg-green-500 text-white"
    }
]