<script lang='ts' setup>
defineProps<{
  downloads: number
}>()
</script>

<template>
  <div class="flex gap-2 items-center">
    {{ toSplitNumber(downloads ?? 0) }} <UIcon name="ic:sharp-download" class="size-5 text-cyan" />
  </div>
</template>
