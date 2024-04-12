<template>
  <UCard :ui="{body: {base: 'h-full'}}">
    <div class="dark:text-true-gray-5 h-full text-gray-5 flex flex-col justify-center items-center">
      <UIcon name="clarity:block-solid" class="size-40" />
      <h2 class="text-center text-xl">
        <slot />
      </h2>
    </div>
  </UCard>
</template>
