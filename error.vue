<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps({
  error: Object as () => NuxtError,
})

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <UCard class="center h-90vh m-10 light:bg-blue-1">
    <UNotFound class="">
      <template v-if="error.statusCode === 404">
        <h2 class="text-3xl">
          {{ error.statusCode }}
        </h2>
        <UButton class="mt-4 w-50 center" size="xl" @click="handleError">
          Back to home
        </UButton>
      </template>
      <template v-else>
        <h2 class="text-3xl">
          {{ error.statusCode }}
        </h2>
        <NuxtLink to="https://github.com/SbokyZahodi/modpack-constructor/issues">
          <UButton class="mt-4 w-50 center" size="xl">
            Create issue
          </UButton>
        </NuxtLink>
      </template>
    </UNotFound>
  </UCard>
</template>
