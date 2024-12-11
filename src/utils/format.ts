export const formatAddress = (
  addr: string,
  { prefixLen = 4, suffixLen = 4, separator = '...' } = {}
) => {
  if (!addr || !addr.trim()) return ''
  const prefix = addr.slice(0, prefixLen)
  const suffix = addr.slice(-suffixLen)

  return `${prefix}${separator}${suffix}`
}
