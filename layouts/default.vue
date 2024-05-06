<script lang='ts' setup>
import { ModPack } from '~/widgets/ModPack'
import { ShowModInfo } from '~/features/ShowModInfo'
import { Header } from '~/widgets/Header'
</script>

<template>
  <main class="">
    <Head>
      <Link rel="icon" type="image/png" href="/logo.png" />
    </Head>

    <ModPack />
    <Header />
    <ShowModInfo />
    <UNotifications class="md:w-120" />
    <slot />
  </main>
</template>
