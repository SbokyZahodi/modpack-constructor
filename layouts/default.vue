<script lang='ts' setup>
import { SelectedModList } from '~/widgets/SelectedModList'
import { ShowModInfo } from '~/features/ShowModInfo'
import { Header } from '~/widgets/Header'
</script>

<template>
  <main class="">
    <canvas id="canvas" class="fixed -z-10" />
    <SelectedModList />

    <Header />
    <ShowModInfo />

    <slot />
  </main>
</template>
