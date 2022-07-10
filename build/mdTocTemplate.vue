<template>
  <a-row type="flex" class="reverseFlex" :gutter="8">
    <a-col :xs="24" :sm="6">
      <a-anchor :get-container="() => modalWrapper" :affix="sm">
        <a-anchor-link
          v-for="tocAst1 in tocAsts"
          :key="tocAst1.href"
          :title="tocAst1.title"
          :href="tocAst1.href"
        >
          <a-anchor-link
            v-for="tocAst2 in tocAst1.children"
            :key="tocAst2.href"
            :title="tocAst2.title"
            :href="tocAst2.href"
          >
            <a-anchor-link
              v-for="tocAst3 in tocAst2.children"
              :key="tocAst3.href"
              :title="tocAst3.title"
              :href="tocAst3.href"
            >
              <a-anchor-link
                v-for="tocAst4 in tocAst3.children"
                :key="tocAst4.href"
                :title="tocAst4.title"
                :href="tocAst4.href"
              >
                <a-anchor-link
                  v-for="tocAst5 in tocAst4.children"
                  :key="tocAst5.href"
                  :title="tocAst5.title"
                  :href="tocAst5.href"
                >
                </a-anchor-link>
              </a-anchor-link>
            </a-anchor-link>
          </a-anchor-link>
        </a-anchor-link>
      </a-anchor>
    </a-col>
    <a-col :xs="24" :sm="18">
      <md-body-placeholder />
    </a-col>
  </a-row>
</template>

<script lang="ts" setup>
//TODO:复用
interface TocAst {
  href: string;
  title: string;
  children: TocAst[];
}

import { onMounted, ref } from 'vue';
import {
  Row as ARow,
  Col as ACol,
  Anchor as AAnchor,
  AnchorLink as AAnchorLink,
  TypographyParagraph as ATypographyParagraph,
  TypographyTitle as ATypographyTitle,
  Table as ATable,
} from 'ant-design-vue/es';
import { breakpointsAntDesign, useBreakpoints } from '@vueuse/core';
import 'ant-design-vue/es/anchor/style/css';

const sm = useBreakpoints(breakpointsAntDesign).sm;
const modalWrapper = ref();

const tocAsts: TocAst[] = [
  /* tocAstPlaceHolder */
];

onMounted(() => {
  modalWrapper.value = document.getElementsByClassName('helpDiv')[0];
});
</script>

<style lang="less">
.reverseFlex {
  flex-direction: row-reverse;
}
.ant-table-cell {
  padding-left: 8px !important;
  padding-right: 8px !important;
}
</style>
