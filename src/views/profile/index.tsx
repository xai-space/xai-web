import PrimaryLayout from "@/components/layouts/primary"
import { ReactNode } from "react"

const profile = () => {
    return (
        <div>
            profile
        </div>
    )
}
profile.getLayout = (page: ReactNode) => <PrimaryLayout>{page}</PrimaryLayout>

export default profile