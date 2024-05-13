<script lang='ts' setup>
import { useModpack } from '~/widgets/ModPack'

const { modpack } = useModpack()
const isSharePending = ref(false)

async function shareModpack() {
  const config = useRuntimeConfig()

  if (modpack.value.modlist.length === 0) {
    useToast().add({ title: 'No mods installed', color: 'red' })
    return
  }

  const response = await $fetch('/api/modpack', {
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

  HCopyToClipboard(`(modpack) - ${config.public.baseUrl}/?modpack=${response}\n(preview) - ${config.public.baseUrl}/preview?modpack=${response}`)

  useToast().add({ title: 'Modpack links are copied!', icon: ICONS.SHARE })
}
</script>

<template>
  <UButton :icon="ICONS.SHARE" variant="ghost" :loading="isSharePending" @click="shareModpack">
    Share
  </UButton>
</template>
