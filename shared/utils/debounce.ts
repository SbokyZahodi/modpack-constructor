export default (callback: () => void, delay: number) => {
  let timeout: any = null

  return () => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      callback()
    }, delay)
  }
}
