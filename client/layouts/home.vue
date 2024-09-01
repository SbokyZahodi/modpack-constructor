<script lang='ts' setup>
import { ModInfo } from '~/widgets/ModInfo'
import { useModpackSync } from '~/widgets/ModPack'

useModpackSync()
</script>

<template>
  <NuxtLayout name="default">
    <ModInfo />
    <NuxtPage />
  </NuxtLayout>
</template>
