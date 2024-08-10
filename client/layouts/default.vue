<script lang='ts' setup>
defineOgImage({
  url: '/og-image.png',
})
</script>

<template>
  <main>
    <Head>
      <Link rel="icon" type="image/png" href="/logo.png" />
    </Head>

    <LazyUNotifications class="md:w-120" />

    <NuxtPage />
  </main>
</template>
