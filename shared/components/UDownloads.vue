<script lang='ts' setup>
defineProps<{
  downloads: number
}>()
</script>

<template>
  <div class="flex items-center gap-2">
    {{ toSplitNumber(downloads ?? 0) }} <UIcon name="ic:sharp-download" class="size-5 text-cyan" />
  </div>
</template>
