<script lang='ts' setup>
import ModInfoSkeleton from './ModInfoSkeleton.vue'
import AddModButton from './AddModButton.vue'

const mod = computed(() => HGetQuery('mod', null))

const isModExist = computed({
  get() {
    return Boolean(mod.value)
  },
  set(value: boolean) {
    if (!value)
      HSetQuery('mod', null)
  },
})

const { data: modInfo, pending, execute: fetchModInfo } = await useAsyncData<IModInfo | void>(async () => {
  if (!mod.value)
    return

  return $api(`project/${mod.value}`)
}, {
  watch: [mod],
})

const latestVersion = computed(() => modInfo.value?.game_versions.at(-1))

onMounted(() => {
  if (mod.value)
    fetchModInfo()
})
</script>

<template>
  <USlideover v-model="isModExist" :ui="{ base: 'px-5' }">
    <div v-if="!pending && modInfo" class="overflow-auto hide-scrollbar h-90% px-2">
      <UCloseButton class="absolute left-4 mt4" @click="isModExist = false" />
      <UTooltip text="Open in Modrinth" class="absolute mt4 right-4">
        <NuxtLink :to="`https://modrinth.com/mod/${modInfo.slug}`" target="_blank">
          <UButton :icon="ICONS.SHARE" size="xl" variant="soft" />
        </NuxtLink>
      </UTooltip>

      <div class="center">
        <img :src="modInfo?.icon_url" class="rounded-xl size-40 m-5">
      </div>

      <div class="mt-4 text-center font-bold text-3xl">
        {{ modInfo?.title }}
      </div>

      <div class="flex flex-col justify-end items-end">
        <UDownloads v-if="modInfo?.downloads" class="center justify-end mt-5 float-right" :downloads="modInfo.downloads" />

        <div class="mt2">
          latest version {{ latestVersion }}
        </div>

        <div class="mt-2">
          <UBadge v-for="loader in modInfo?.loaders" :key="loader" variant="soft" size="lg" class="font-semibold m1 rounded-full">
            {{ loader }}
          </UBadge>
        </div>
      </div>

      <UCard class="mt-5 text-sm">
        {{ modInfo?.description }}
      </UCard>

      <UCarousel
        v-if="modInfo?.gallery.length"
        v-slot="{ item }" :items="modInfo?.gallery.map((item) => item.url).slice(0, 10)"

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

        :ui="{ item: 'snap-end' }" arrows indicators class="mt-4 rounded-xl h-70 overflow-hidden"
      >
        <NuxtImg :src="item" placeholder class="h-70 w-100" draggable="false" />
      </UCarousel>

      <div class="absolute bottom-0 left-0 w-full p-2">
        <AddModButton :mod="modInfo" />
      </div>
    </div>

    <template v-else>
      <ModInfoSkeleton />
    </template>
  </USlideover>
</template>
