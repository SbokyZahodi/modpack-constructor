<template>
  <div class="flex items-center dark:text-true-gray-5 h-full text-gray-5 flex-col justify-center">
    <UIcon :name="ICONS.CUBE" class="size-40" />
    <h2 class="text-center text-xl">
      <slot />
    </h2>
  </div>
</template>
