<script lang='ts' setup>
import type { ICategory } from '~/shared/api/ICategory'

const { data, pending } = await useAPI<ICategory[]>('tag/category')

const modCategories = computed(() => data.value?.filter(el => el.project_type === 'mod'))

const categoriesQuery = computed(() => useRoute().query.categories?.toString().split(','))

const selectedCategories = ref<string[]>(categoriesQuery.value || [])

function addCategory(category: string) {
  if (selectedCategories.value.includes(category))
    selectedCategories.value = selectedCategories.value.filter(item => item !== category)

  else selectedCategories.value.push(category)
}

watch(() => selectedCategories.value, () => {
  const categories = selectedCategories.value.length ? selectedCategories.value.join(',') : []

  HSetQuery('categories', categories)
}, { deep: true })

const items = computed(() => {
  return modCategories.value?.map(el => ({ name: el.name, icon: el.icon }))
})
</script>

<template>
  <UCarousel
    v-if="items?.length && !pending"
    v-slot="{ item }" :items="items"
    arrows
    :ui="{
      arrows: {
        wrapper: 'absolute -top-1 left-0 w-full p-2',
      },
    }"
    class="center h-10 px-15"
    :prev-button="{
      color: 'gray',
      icon: 'mingcute:left-fill',
      class: '',
    }"
    :next-button="{
      color: 'gray',
      icon: 'mingcute:right-fill',
      class: '',
    }"
  >
    <UButton class="gap-2 p-2 center mx-2" :variant="selectedCategories.includes(item.name) ? 'solid' : 'outline'" @click="addCategory(item.name)">
      <div alt="" class="size-5" v-html="item.icon" />
      {{ item.name }}
    </UButton>
  </UCarousel>
</template>
