<script lang='ts' setup>
import { ModPack } from '~/widgets/ModPack'
import { ShowModInfo } from '~/features/ShowModInfo'
import { Header } from '~/widgets/Header'
</script>

<template>
  <main class="">
    <Head>
      <Link rel="icon" type="image/png" href="/heart.png" />
    </Head>

    <ModPack />
    <Header />
    <ShowModInfo />
    <UNotifications class="md:w-100" />
    <slot />
  </main>
</template>
