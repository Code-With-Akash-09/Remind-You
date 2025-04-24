import Logo from "@/atoms/logo"
import ThemeSwitcher from "@/atoms/themeSwitcher"
import { Button } from "@/ui/button"
import Link from "next/link"

const HomeNavbar = () => {
    return (
        <div className="flex w-full">
            <div className="flex w-full max-w-7xl mx-auto items-center justify-between px-4 py-2">
                <div className="flex w-fit">
                    <Logo />
                </div>
                <div className="flex w-fit gap-4">
                    <ThemeSwitcher />
                    <Button
                        asChild
                    >
                        <Link href={"/auth"}>
                            Get Started
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default HomeNavbar
