<template>
  <div>
    <h1>Hello World</h1>
  </div>
</template>

<script setup lang="ts">
console.log(import.meta.env)
console.log(__APP_INFO__)
</script>

<style lang="scss" scoped>
h1 {
  color: red;
}
</style>
