<template>
  <EntryPoint />
</template>

<script lang="ts" setup>
import { defineAsyncComponent } from 'vue';
const EntryPoint = defineAsyncComponent(
  () => import('/@/components/EntryPoint.vue')
);
</script>

<style scoped lang="less"></style>
