<script lang='ts' setup>
const colorMode = useColorMode()
</script>

<template>
  <UButton :icon="colorMode.value === 'dark' ? 'uil:sun' : 'uil:moon'" @click="colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'" />
</template>
