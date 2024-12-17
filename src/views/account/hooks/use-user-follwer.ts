import { userApi } from '@/api/user'
import { UserFollowersRes } from '@/api/user/types'
import { useUserStore } from '@/stores/use-user-store'
import { useEffect, useState } from 'react'

export const useUserFollow = () => {
    const { userInfo } = useUserStore()
    const [followers, setFollowers] = useState<UserFollowersRes>()

    const getFollowers = async () => {
        const { data } = await userApi.getFollowers()
        setFollowers(data)
    }


    useEffect(() => {
        getFollowers()
    }, [userInfo])

    return {
        followers,
    }
}
