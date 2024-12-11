import { utilLang } from '@/utils/lang'
import { t } from 'i18next'
import { toast } from 'sonner'

export const WALLET_ERR = {
  walletNotFound: () => toast.error(t('wallet.err.connect')),
  errorChain: (chainName: string) =>
    toast.warning(utilLang.replace(t('switch_wallet'), [chainName])),
}
