import { apiUrl } from '@/config/url'
import { useFetch } from '@/hooks/use-fetch'
export const api = useFetch(apiUrl.xai)

// export {userApi.getUnreadNotices as getUnreadNotices} from '@/api/user'
