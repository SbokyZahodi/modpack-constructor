export default (key: string, defaultValue: any = null) => {
  const value = useRoute().query[key]

  if (!value)
    return defaultValue

  return value
}
