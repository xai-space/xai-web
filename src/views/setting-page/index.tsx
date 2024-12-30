import PrimaryLayout from "@/components/layouts/primary"
import { ReactNode } from "react"

const SettingPage = () => {
    return (
        <div>
            Setting
        </div>
    )
}
SettingPage.getLayout = (page: ReactNode) => {
    return (
        <PrimaryLayout>
            {page}
        </PrimaryLayout>
    )
}
export default SettingPage


