import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"

const EmptyData = () => {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true)
        }, 250)

        return () => clearTimeout(timer)
    }, [])

    return (
        <div className={cn(
            "flex flex-1 h-[89vh] flex-col pt-10 w-full items-center justify-center",
            "transition-all duration-300 ease-out",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}>
            <img src="/images/no-data.png" alt="" />
            <div className="text-center text-gray-400 text-l font-semibold mt-4">NO Data</div>
        </div>
    )
}

export default EmptyData