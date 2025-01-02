import dayjs from 'dayjs'

import { utilLang } from './lang'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

export const utilTime = {
  wait: (time: number = 1500) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(null)
      }, time)
    })
  },
  isPast: (ts: number, duration: number) => {
    const remainTime = dayjs().unix() - ts
    return remainTime >= duration
  },
  isUtcOffset8: () => dayjs().utcOffset() / 60,
}

export const simplifyFromNow = (date: string | undefined) => {
  const day = dayjs(date).fromNow(true)

  if (utilLang.isZh()) return day

  return day
    .replace('an ', '1')
    .replace('day', 'd')
    .replace('ds', 'd')
    .replace('hour', 'h')
    .replace('hs', 'h')
    .replace('minute', 'm')
    .replace('ms', 'm')
    .replace('second', 's')
    .replace('ss', 's')
}

export const formatFromTz = (ts: number) => {
  const date = dayjs(ts)
  return utilLang.isEn()
    ? date.utc().format('YYYY-MM-DD HH:mm:ss')
    : date.format('YYYY-MM-DD HH:mm:ss')
}


export const formatTime = (timestamp: number) => {
  const now = dayjs()
  const postTime = dayjs(timestamp * 1000)
  const diffInSeconds = now.diff(postTime, 'second')
  const diffInMinutes = now.diff(postTime, 'minute')
  const diffInHours = now.diff(postTime, 'hour')
  const diffInDays = now.diff(postTime, 'day')

  if (diffInSeconds < 60) {
    return `${diffInSeconds}s`
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes}m`
  } else if (diffInHours < 24) {
    return `${diffInHours}h`
  } else if (diffInDays < 7) {
    return `${diffInDays}d`
  } else {
    return postTime.format('MMM D')
  }
}