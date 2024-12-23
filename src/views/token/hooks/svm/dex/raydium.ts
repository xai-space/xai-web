import { Raydium, TxVersion, parseTokenAccountResp } from '@raydium-io/raydium-sdk-v2'
import { Connection, Keypair, clusterApiUrl } from '@solana/web3.js'

export const owner: Keypair = Keypair.fromSecretKey(bs58.decode('4Hi8ubQb9ZhT7dhcj93aStoWZzCeowS8TrNKwboW9aRCajUZsxJU3vduhgA1oLa83A8nnCByoqHMNv8pt9S54q4W'))
export const connection = new Connection('https://autumn-quick-silence.solana-devnet.quiknode.pro/62d5619a5eda3f08ee94c2fdcac4e4f5e20885c5') //<YOUR_RPC_URL>
// export const connection = new Connection(clusterApiUrl('devnet')) //<YOUR_RPC_URL>
export const txVersion = TxVersion.V0 // or TxVersion.LEGACY
const cluster = 'devnet' // 'mainnet' | 'devnet'

let raydium: Raydium | undefined
export const initSdk = async (params?: { loadToken?: boolean }) => {

    if (raydium) return raydium
    if (connection.rpcEndpoint === clusterApiUrl('mainnet-beta'))
        console.warn('using free rpc node might cause unexpected error, strongly suggest uses paid rpc node')
    console.log(`connect to rpc ${connection.rpcEndpoint} in ${cluster}`)
    raydium = await Raydium.load({
        owner,
        connection,
        cluster,
        disableFeatureCheck: true,
        disableLoadToken: !params?.loadToken,
        blockhashCommitment: 'finalized',
        // urlConfigs: {
        //   BASE_HOST: '<API_HOST>', // api url configs, currently api doesn't support devnet
        // },
    })

    /**
     * By default: sdk will automatically fetch token account data when need it or any sol balace changed.
     * if you want to handle token account by yourself, set token account data after init sdk
     * code below shows how to do it.
     * note: after call raydium.account.updateTokenAccount, raydium will not automatically fetch token account
     */

    /*  
    raydium.account.updateTokenAccount(await fetchTokenAccountData())
    connection.onAccountChange(owner.publicKey, async () => {
      raydium!.account.updateTokenAccount(await fetchTokenAccountData())
    })
    */

    return raydium
}
