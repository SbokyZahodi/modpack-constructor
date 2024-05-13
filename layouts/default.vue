<script lang='ts' setup>
defineOgImage({
  url: '/og-image.png',
})
</script>

<template>
  <main class="">
    <Head>
      <Link rel="icon" type="image/png" href="/logo.png" />
    </Head>

    <UNotifications class="md:w-120" />

    <slot />
  </main>
</template>
