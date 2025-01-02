import { useDynamicContext } from "@dynamic-labs/sdk-react-core"
import { useConnection } from "@solana/wallet-adapter-react"
import { useEffect } from "react"
import { Raydium } from "@raydium-io/raydium-sdk-v2"
import { toast } from "sonner"
import { useTranslation } from "react-i18next"
import { clusterApiUrl } from "@solana/web3.js"
import { PublicKey } from "@solana/web3.js"
import { isSolanaWallet } from "@dynamic-labs/solana"
import { programIds } from "@/program"

let raydium: Raydium | undefined
export const useInitRaydium = () => {
    const { t } = useTranslation()
    const { primaryWallet } = useDynamicContext()
    const { connection } = useConnection()

    const signAllTransactions = async (transactions: any[]) => {
        if (primaryWallet && isSolanaWallet(primaryWallet)) {
            const signer = await primaryWallet?.getSigner()
            const signed = await signer.signAllTransactions(transactions)
            return signed
        }
        return transactions
    }

    const initRaydiumSDK = async () => {
        if (raydium) return
        if (!primaryWallet) return
        if (primaryWallet.chain !== 'solana') return
        if (connection.rpcEndpoint === clusterApiUrl('mainnet-beta'))
            console.warn('using free rpc node might cause unexpected error, strongly suggest uses paid rpc node')
        console.log(`connect to rpc ${connection.rpcEndpoint} in ${programIds.network}`)
        raydium = await Raydium.load({
            owner: new PublicKey(primaryWallet!.address),
            signAllTransactions,
            connection,
            cluster: programIds.network,
            disableFeatureCheck: true,
            blockhashCommitment: 'finalized',
        })
        return raydium
    }

    useEffect(() => {
        initRaydiumSDK()
    }, [connection, primaryWallet])

    return {
        raydium
    }
}