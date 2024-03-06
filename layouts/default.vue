<script lang='ts' setup>
import { SelectedModList } from '~/widgets/SelectedModList'
import { ShowModInfo } from '~/features/ShowModInfo'
import { Header } from '~/widgets/Header'
</script>

<template>
  <main class="">
    <SelectedModList />

    <Header />
    <ShowModInfo />

    <slot />
  </main>
</template>
