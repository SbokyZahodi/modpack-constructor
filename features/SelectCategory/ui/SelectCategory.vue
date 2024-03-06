<script lang='ts' setup>
import type { ICategory } from '~/shared/types/ICategory'

const { data } = await useAPI<ICategory[]>('tag/category')

const modCategories = computed(() => data.value.filter(el => el.project_type === 'mod'))

const categoriesQuery = computed(() => useRoute().query.categories?.toString().split(','))

const selectedCategories = ref<string[]>(categoriesQuery.value || [])

function addCategory(category: string) {
  if (selectedCategories.value.includes(category))
    selectedCategories.value = selectedCategories.value.filter(item => item !== category)

  else selectedCategories.value.push(category)
}

watch(() => selectedCategories.value, () => {
  const cats = selectedCategories.value.length ? selectedCategories.value.join(',') : null

  useRouter().push({ query: { ...useRoute().query, categories: cats } })
}, { deep: true })
</script>

<template>
  <UPopover>
    <UButton class="font-semibold">
      Categories {{ selectedCategories.length > 0 ? `(${selectedCategories.length})` : '' }}
    </UButton>

    <template #panel>
      <div class="gap-5 grid grid-cols-3 p-2">
        <UButton v-for="category in modCategories" :key="category.name" class="p-2 gap-2 center" :variant="selectedCategories.includes(category.name) ? 'solid' : 'outline'" @click="addCategory(category.name)">
          <div alt="" class="size-5" v-html="category.icon" />
          {{ category.name }}
        </UButton>
      </div>
    </template>
  </UPopover>
</template>
