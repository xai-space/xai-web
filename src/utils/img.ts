export const img = {
  async download(imgUrl: string) {
    const img = new Image()
    img.setAttribute('crossOrigin', 'Anonymous')
    img.onload = function () {
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')
      canvas.width = img.width
      canvas.height = img.height
      context?.drawImage(img, 0, 0, img.width, img.height)
      const url = canvas.toDataURL('images/png')
      const a = document.createElement('a')
      const event = new MouseEvent('click')
      a.download = 'default.png'
      a.href = url
      a.dispatchEvent(event)
    }
    img.src = imgUrl
  },
}
