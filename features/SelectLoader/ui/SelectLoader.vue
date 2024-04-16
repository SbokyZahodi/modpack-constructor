<script lang='ts' setup>
const loader = ref(HGetQuery('loader', 'All')) as Ref<ILoader>

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
  if (items[event].label === 'All') {
    HSetQuery('loader', null)
    return
  }

  HSetQuery('loader', items[event].label)
}
</script>

<template>
  <div>
    <UTabs v-bind="$attrs" :items="items" :default-index="currentIndex" :ui="{ base: 'w-80 md:w-100', list: { tab: { base: 'p-3 font-semibold' } } }" @change="setLoader($event)" />
  </div>
</template>
