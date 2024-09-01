<script lang='ts' setup>
const { modpack } = useModpack()
const isSharePending = ref(false)

async function shareModpack() {
  const config = useRuntimeConfig()

  if (modpack.value.modlist.length === 0) {
    useToast().add({ title: 'No mods installed', color: 'red' })
    return
  }

  const modpackId = await $fetch('/api/modpack', {
    method: 'POST',
    body: {
      modpack: modpack.value,
    },
    onRequest() {
      isSharePending.value = true
    },
    onResponse() {
      isSharePending.value = false
    },
  })

  window.open(`${config.public.baseUrl}/preview?modpack=${modpackId}`, '_blank')

  useToast().add({ title: 'Opening preview page...', icon: ICONS.SHARE })
}
</script>

<template>
  <UButton :icon="ICONS.SHARE" :loading="isSharePending" @click="shareModpack" />
</template>
