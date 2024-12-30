import { type ReactNode } from 'react'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import duration from 'dayjs/plugin/duration'
import dayjsZh from 'dayjs/locale/zh-cn'
import dayjsEn from 'dayjs/locale/en'
import relativeTime from 'dayjs/plugin/relativeTime'
import { BigNumber } from 'bignumber.js'

import { useLang } from '@/hooks/use-lang'
import { useQueryChains } from '@/hooks/use-query-chains'
import { useMounted } from '@/hooks/use-mounted'
import { Toaster } from '@/components/ui/sonner'
import { BackToTop } from '@/components/back-to-top'
import { MaintainTips } from '../maintain-tips'
import { useRootFontSize } from '@/hooks/use-root-font-size'
import { useKeepScrollPosition } from '@/hooks/use-keep-scroll-position'
import { DynamicUserProfile } from '@dynamic-labs/sdk-react-core'
import { useUserInfo } from '@/hooks/use-user-info'
import { useChartStore } from '@/stores/use-chart-store'

// Extends style css variable for react
declare module 'react' {
  interface CSSProperties {
    [k: `--${string}`]: string | number
  }
}

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(relativeTime)
dayjs.extend(duration)
dayjs.locale(dayjsZh)
dayjs.locale(dayjsEn)

BigNumber.config({ ROUNDING_MODE: BigNumber.ROUND_DOWN })

export const AppLayout = ({ children }: { children: ReactNode }) => {
  const { isNotMounted } = useMounted()
  useChartStore().setNoticeCount()
  useLang() // init lang

  useQueryChains() // init chains

  useUserInfo() // init login

  useRootFontSize()

  useKeepScrollPosition()

  if (isNotMounted) return

  return (
    <>
      <MaintainTips />
      <div className="flex justify-center">{children}</div>

      <Toaster theme="light" richColors />
      <BackToTop />
      <DynamicUserProfile />
    </>
  )
}

export default AppLayout
