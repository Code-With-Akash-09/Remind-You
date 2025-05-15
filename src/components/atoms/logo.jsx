const Logo = ({ isMobile = false }) => {
    return (
        <div className="flex w-fit font-bold text-3xl">
            <span
                className="text-blue-500 dark:text-gray-50">
                {isMobile ? "R" : "Remind"}
            </span>
            <span
                className="text-amber-400 dark:text-amber-500">
                {isMobile ? "Y" : "You"}
            </span>
        </div>
    )
}

export default Logo
