<script lang='ts' setup>
const items = [{ label: 'Mods', raw: 'mod' }, { label: 'Shaders', raw: 'shader' }, { label: 'Resourse packs', raw: 'resourcepack' }, { label: 'Data packs', raw: 'datapack' }]

function selectType(index: number) {
  setQuery('project_type', items[index].raw)
}
</script>

<template>
  <UTabs :items="items" class="mt-4" :default-index="items.findIndex((el) => el.raw === getQuery('project_type', 'mod'))" @change="selectType($event)" />
</template>
