import { Button } from "@/ui/button"
import { ArrowLeftIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

const BackBtn = () => {

    const [clicked, setClicked] = useState(false)
    const router = useRouter()

    const handleClick = () => {
        setClicked(prev => !prev)
        router.back()
    }

    return (
        <>
            <Button
                onClick={handleClick}
            >
                <ArrowLeftIcon className="size-5" />
            </Button>
        </>
    )
}

export default BackBtn
