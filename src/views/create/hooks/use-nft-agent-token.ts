import { CoinType } from "@/config/coin"
import { useCreateTokenContext } from "@/contexts/create-token"
import { useChainInfo } from "@/hooks/use-chain-info"
import { NftInfo } from "@/views/ai/components/nft-agent-dialog"
import { useEffect, useState } from "react"

export const useNftAgentToken = () => {
    const { form } = useCreateTokenContext()
    const [showNftAgentDialog, setShowNftAgentDialog] = useState(false)
    const [nftInfo, setNftInfo] = useState<NftInfo>()




    useEffect(() => {
        console.log(form.getValues('coinType'));

        if (+(form.getValues('coinType')) === CoinType.NFTAgent) {
            setShowNftAgentDialog(true)
        }
    }, [form])

    return {
        nftInfo, setNftInfo,
        showNftAgentDialog, setShowNftAgentDialog
    }
}
