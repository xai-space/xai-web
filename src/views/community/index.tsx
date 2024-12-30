import PrimaryLayout from "@/components/layouts/primary"
import { ReactNode } from "react"

const CommunityPage = () => {
    return <div className="w-full h-full text-[#0f1419] font-semibold flex justify-center items-center">Coming soom</div>
}

CommunityPage.getLayout = (page: ReactNode) => <PrimaryLayout>{page}</PrimaryLayout>
export default CommunityPage