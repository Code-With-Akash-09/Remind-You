import HomeNavbar from "@/organisms/navbar/HomeNavbar"

const HomeLayout = ({ children }) => {
    return (
        <div className="flex flex-col size-full">
            <HomeNavbar />
            {children}
        </div>
    )
}

export default HomeLayout
