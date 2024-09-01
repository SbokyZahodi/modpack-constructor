export default () => {
  const { modpack } = useModpack()

  watch(modpack, () => {
    sessionStorage.setItem('modpack', JSON.stringify(modpack.value))
  }, { deep: true, immediate: false })
}
