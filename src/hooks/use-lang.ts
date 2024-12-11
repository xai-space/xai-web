import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import dayjs from 'dayjs'
import dayjsZh from 'dayjs/locale/zh-cn'
import dayjsEn from 'dayjs/locale/en'

import { useLocalStorage } from './use-storage'
import { utilTime } from '@/utils/day'
import { useDynamicContext } from '@dynamic-labs/sdk-react-core'

export const useLang = () => {
  const { i18n } = useTranslation()
  const { locale } = useDynamicContext()
  const { getStorage, setStorage } = useLocalStorage()

  const setLang = (code: string) => {
    i18n.changeLanguage(code)
    locale.changeLanguage(code)
    setStorage('lang', code)
  }

  useEffect(() => {
    const lang = getStorage('lang')

    if (!!lang) {
      locale.changeLanguage('zh')
      return setLang(lang)
    }

    if (utilTime.isUtcOffset8()) {
      locale.changeLanguage('zh')
      setLang('zh')
    }
  }, [])

  useEffect(() => {
    dayjs.locale(i18n.language === 'zh' ? dayjsZh : dayjsEn)
  }, [i18n.language])

  return {
    getLang: () => getStorage('lang'),
    setLang,
  }
}
