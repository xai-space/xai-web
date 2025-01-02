import PrimaryLayout from "@/components/layouts/primary"
import { ReactNode } from "react"
import { useUserStore } from "@/stores/use-user-store"
const profile = () => {
    const { userInfo } = useUserStore()
    console.log('userInfo...:', userInfo)
    return <div className="w-full h-full text-[#0f1419] font-semibold flex justify-center items-center">
        Coming soon
    </div>
}
profile.getLayout = (page: ReactNode) => <PrimaryLayout>{page}</PrimaryLayout>

export default profile