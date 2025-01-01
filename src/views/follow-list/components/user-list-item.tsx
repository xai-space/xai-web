import { Avatar } from "@/components/ui/avatar"

interface UserListItemProps {
    avatar?: string
    name?: string
    description?: string
    onFollow: () => void
    isFollowing: boolean
}

export const UserListItem = ({ avatar, name, description, onFollow, isFollowing = false }: UserListItemProps) => {
    return (
        <div className="flex  px-4 py-3 hover:bg-gray-50">
            <Avatar src={avatar} className="h-[40px] w-[40px] transition-all duration-200 group-hover:brightness-75" />
            <div className="ml-3 flex-1">
                <div className="flex  justify-between">
                    <div>
                        <div className="font-bold hover:underline cursor-pointer">{name}</div>
                    </div>
                    <button
                        onClick={onFollow}
                        className="px-4 py-1 bg-[#0f1419] text-white rounded-full font-bold "
                    >
                        {true ? 'follow' : 'unfollow'}
                    </button>
                </div>
                <div className="mt-1 text-sm text-gray-600 line-clamp-2">{description}</div>
            </div>
        </div>
    )
} 