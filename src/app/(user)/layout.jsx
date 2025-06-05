import HomeNavbar from "@/organisms/navbar/HomeNavbar"

const UserLayout = ({ children }) => {
    return (
        <div className="flex flex-col gap-4 size-full pb-4">
            <HomeNavbar />
            {children}
        </div>
    )
}

export default UserLayout
