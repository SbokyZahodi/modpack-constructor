<script lang='ts' setup>
import { SelectColorTheme } from '~/features/SelectColorTheme'

defineOgImage({
  url: '/og-image.png',
})
</script>

<template>
  <main>
    <div class="gap-2 fixed top-2 left-2 hidden md:flex">
      <SelectColorTheme size="lg" color="gray" />
      <NuxtLink to="https://github.com/SbokyZahodi/modpack-constructor">
        <UButton icon="mdi:github" size="lg" color="gray" />
      </NuxtLink>
    </div>

    <Head>
      <Link rel="icon" type="image/png" href="/logo.png" />
    </Head>

    <LazyUNotifications class="md:w-120" />

    <NuxtPage />
  </main>
</template>
