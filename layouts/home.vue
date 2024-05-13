<script lang='ts' setup>
import { ModPack } from '~/widgets/ModPack'
import { ModInfo } from '~/widgets/ModInfo'
import { Header } from '~/widgets/Header'
</script>

<template>
  <NuxtLayout name="default">
    <ModPack />
    <Header />
    <ModInfo />
    <slot />
  </NuxtLayout>
</template>
