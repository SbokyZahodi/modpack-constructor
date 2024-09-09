export default () => {
  const { modpack } = useModpack()

  watch(modpack, () => {
    localStorage.setItem('modpack', JSON.stringify(modpack.value))
  }, { deep: true, immediate: false })
}
