import PrimaryLayout from "@/components/layouts/primary"
import { ReactNode } from "react"

const CommunityPage = () => {
    return <div>CommunityPage</div>
}

CommunityPage.getLayout = (page: ReactNode) => <PrimaryLayout>{page}</PrimaryLayout>
export default CommunityPage