<script lang='ts' setup>
type ILoader = 'Forge' | 'Fabric' | 'All'

const loader = useState<ILoader>('loader', () => useRoute().query.loader as ILoader || 'All')

const items = [{
  label: 'All',
}, {
  label: 'Forge',
}, {
  label: 'Fabric',
}, {
  label: 'NeoForge',
}, {
  label: 'Quilt',
}]

const currentIndex = computed(() => items.findIndex(el => el.label === loader.value))

function setLoader(event: number) {
  loader.value = items[event].label as ILoader

  if (loader.value === 'All') {
    useRouter().push({ query: {
      ...useRoute().query,
      loader: null,
    } })
    return
  }

  setQuery('loader', items[event].label)
}
</script>

<template>
  <div class="flex gap-2 my-2">
    <UTabs :items="items" :default-index="currentIndex" :ui="{ base: 'w-80 md:w-100', list: { tab: { base: 'p-3 font-semibold' } } }" @change="setLoader($event)" />
  </div>
</template>
