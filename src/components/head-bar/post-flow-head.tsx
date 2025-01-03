import { cn } from "@/lib/utils"
import { useArticleStore } from "@/stores/use-article-store"
import { useState } from "react"
import { useHeadBarContext } from "../layouts/HeadBarContext"

const PostFlowHead = () => {
    const { feedList, setFeedList } = useArticleStore()
    const context = useHeadBarContext()
    const { setFollow } = context
    const navList = [
        {
            title: 'Discover',
            id: 1,
            follow: false,
        },
        {
            title: 'Following',
            id: 2,
            follow: true,
        },
    ]
    const [isActive, setIsActive] = useState(1)

    const tap = (id: number) => {
        setFeedList([])
        setFollow(id == 1 ? false : true)
        setIsActive(id)
    }
    const [isBlurred, setIsBlurred] = useState(false)

    return (
        <div className="flex">
            {navList.map((item) => (
                <div
                    key={item.id}
                    onClick={() => tap(item.id)}
                    className={cn(
                        'flex-1 h-[53px] cursor-pointer hover:bg-[#e6e6e8]',
                        'flex flex-col justify-between'
                    )}
                >
                    <div className="flex-1 flex items-center justify-center">
                        <span className={cn(
                            'text-[15px]',
                            isActive == item.id ? 'text-black' : 'text-gray-500'
                        )}>
                            {item.title}
                        </span>
                    </div>
                    <div className="flex justify-center">
                        <div
                            className={cn(
                                ' h-[4px] min-w-[68px] rounded-full',
                                isActive == item.id ? 'bg-[#3b82f6]' : null
                            )}
                        ></div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default PostFlowHead;