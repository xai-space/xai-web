import { userApi } from "@/api/user"
import { FollowItem, UserCategory } from "@/api/user/types"
import PrimaryLayout from "@/components/layouts/primary"
import { Avatar } from "@/components/ui/avatar"
import { defaultUserLogo } from "@/config/link"
import { staticUrl } from "@/config/url"

import { useUserStore } from "@/stores/use-user-store"
import router from "next/router"
import { ReactNode, useEffect, useState } from "react"
import { IoArrowBackSharp } from "react-icons/io5"
import { UserListItem } from './components/user-list-item'
import { ListLoading } from "@/components/loading"
import { useRouter } from "next/router"
import EmptyData from "@/components/empty-data"


const FollowList = () => {
    const { userInfo, otherUserInfo, agentInfo } = useUserStore()

    const [activeTab, setActiveTab] = useState(0)
    const [followList, setFollowList] = useState<FollowItem[]>([])
    const [loading, setLoading] = useState(false)
    const { query } = useRouter()
    console.log('query-follow-list:', query);


    const fetchFollowList = async (tabIndex: number) => {
        try {
            setLoading(true)
            let data

            if (tabIndex === 2) {
                // Follower tab
                const res = await userApi.getFollowers({ user_id: query?.user_id as string })
                data = res.data?.list
            } else {
                // Following tabs (agent or user)
                const res = await userApi.getFollows({
                    user_id: query?.user_id as string,
                    category: tabIndex === 0 ? UserCategory.Agent : UserCategory.User,
                })
                data = res.data?.list
            }

            if (data) {
                setFollowList(data)
            }
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchFollowList(activeTab)
    }, [activeTab, query?.user_id])

    return (
        <div className="relative flex flex-col">
            <div className="flex items-center pl-4 pt-4 border-b border-gray-200 pb-2">
                <IoArrowBackSharp size={20} onClick={() => router.back()} className="cursor-pointer" />
                <div className="ml-10 text-[#0f1419] text-[20px] font-bold">{otherUserInfo?.name && agentInfo?.name}</div>
            </div>

            <div className="flex border-b border-gray-200">
                {['Following agent', 'Following user', 'Follower'].map((tab, index) => (
                    <div
                        key={index}
                        onClick={() => setActiveTab(index)}
                        className={`flex-auto py-4 text-center font-medium cursor-pointer hover:bg-gray-50 relative
                            ${activeTab === index ? 'text-black after:absolute after:bottom-0 after:left-[15%] after:w-[70%] after:rounded-full after:h-1 after:bg-[#1d9bf0]' : 'text-gray-500'}`}
                    >
                        {tab}
                    </div>
                ))}
            </div>

            <div>
                {loading && <ListLoading />}

                {!loading && followList.length > 0 && followList.map((item, index) => (
                    <UserListItem
                        key={index}
                        avatar={item.logo ? `${staticUrl}${item.logo}` : defaultUserLogo}
                        name={item.name}
                        description={item.description}
                        onFollow={() => { }}
                        isFollowing={false}
                    />
                ))}

                {!loading && followList.length === 0 && <EmptyData />}
            </div>
        </div>
    )
}
FollowList.getLayout = (page: ReactNode) => (
    <PrimaryLayout disablePadding={true}>{page}</PrimaryLayout>
)
export default FollowList