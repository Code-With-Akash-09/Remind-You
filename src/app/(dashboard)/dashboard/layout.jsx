import SidebarProvider from "@/molecules/sidebar/SidebarProvider"
import AuthProvider from "@/providers/auth"

const DashboardLayout = ({ children }) => {
    return (
        <>
            <AuthProvider>
                <SidebarProvider>
                    {children}
                </SidebarProvider>
            </AuthProvider>
        </>
    )
}

export default DashboardLayout
