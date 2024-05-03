export default (value: number): number => {
  return Number((value / 1024 / 1024).toFixed(2))
}
