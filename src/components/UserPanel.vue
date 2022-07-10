<template>
  <a-table :dataSource="dataSource" :columns="columns" bordered />
</template>

<script lang="ts" setup>
import { reactive } from 'vue';

const dataSource = reactive([
  { key: '1', name: '胡彦斌', age: 32, address: '西湖区湖底公园1号' },
  { key: '2', name: '胡彦祖', age: 42, address: '西湖区湖底公园1号' },
]);

const columns = reactive([
  { title: '姓名', dataIndex: 'name', key: 'name' },
  { title: '年龄', dataIndex: 'age', key: 'age' },
  { title: '住址', dataIndex: 'address', key: 'address' },
]);
</script>

<style scoped lang="less"></style>
