<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps({
  error: Object as () => NuxtError,
})

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <UCard class="h-90vh m-10 light:bg-blue-1 center">
    <UNotFound class="">
      <template v-if="error?.statusCode === 404">
        <h2 class="text-3xl">
          {{ error?.statusCode }}
        </h2>
        <UButton class="center mt-4 w-50" size="xl" @click="handleError">
          Back to home
        </UButton>
      </template>
      <template v-else>
        <h2 class="text-3xl">
          {{ error?.statusCode }}
        </h2>

        <LazyDevOnly>
          <p>
            {{ error?.message }}
          </p>
        </LazyDevOnly>
      </template>
    </UNotFound>
  </UCard>
</template>
