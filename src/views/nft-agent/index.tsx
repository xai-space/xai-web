import PrimaryLayout from "@/components/layouts/primary"
import { ReactNode } from "react"

const NftAgent = () => {
    return <div>NftAgent</div>
}

NftAgent.getLayout = (page: ReactNode) => <PrimaryLayout>{page}</PrimaryLayout>

export default NftAgent