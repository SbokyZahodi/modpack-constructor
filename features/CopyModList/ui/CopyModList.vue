<script lang='ts' setup>
import saveAs from 'file-saver'

const props = defineProps<{
  modlist: IShortModInfo[]
}>()

const pending = ref(false)

async function saveModlistAsTxt() {
  if (!props.modlist.length) {
    useToast().add({ title: 'No mods installed', color: 'red' })
    return
  }

  const modlist = await $api<IModInfo[]>('projects', {
    params: {
      ids: JSON.stringify(props.modlist.map(mod => mod.slug)),
    },
    onRequest() {
      pending.value = true
    },
    onResponse() {
      pending.value = false
    },
    onRequestError({ error }) {
      useToast().add({ title: error.message, color: 'red' })
      pending.value = false
    },
  })

  const title = `Total mods: ${modlist.length}`
  const mods = modlist.map(mod => `* (${mod.title}) - ${mod.description} | https://modrinth.com/mod/${mod.slug}`).join('\n\n')

  const file = `${title}\n \n${mods}`

  const blob = new Blob([file], { type: 'text/plain;charset=utf-8' })

  saveAs(blob, 'modlist.txt')
}
</script>

<template>
  <UButton :loading="pending" @click="saveModlistAsTxt">
    Mods installed: {{ modlist.length }}
  </UButton>
</template>
