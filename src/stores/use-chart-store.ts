import { create } from 'zustand'
import { getUnreadNotices } from '@/api/user'
import type { IChartingLibraryWidget } from '../../public/js/charting_library/charting_library'
import { useRequest } from 'ahooks'

interface ChartStore {
  chart: IChartingLibraryWidget | null
  chartEl: HTMLDivElement | null
  noticeCount: number
  setChart: (chart: IChartingLibraryWidget | null) => void
  setChartEl: (chartEl: HTMLDivElement) => void
  setNoticeCount: () => void
  clearNoticeCount: () => void
}

export const useChartStore = create<ChartStore>((set, get) => ({
  chart: null,
  chartEl: null,
  noticeCount: 0,
  setChart: (chart) => set({ chart }),
  setChartEl: (chartEl) => set({ chartEl }),
  setNoticeCount: () => {
    const { data: noticeCount } = useRequest(getUnreadNotices, {
      onSuccess: (res) => {
        set({ noticeCount: Number(res?.data.count) })
      },
    })

  },
  clearNoticeCount: () => set({ noticeCount: 0 }),
}))
