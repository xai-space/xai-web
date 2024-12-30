import PrimaryLayout from "@/components/layouts/primary"
import { ReactNode } from "react"

const SettingPage = () => {
    return (
        <div className="w-full h-full text-[#0f1419] font-semibold flex justify-center items-center">Coming soom</div>
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


