<template>
  <a-config-provider :locale="LocaleMapping[sysInfo.locale]">
    <a-layout class="layout">
      <a-layout-header>
        <a-space align="center" size="middle">
          <img alt="Mirror-Cinema logo" src="../assets/logo_b.png" />
          <div>Mirror Cinema</div>
        </a-space>
        <a-menu theme="dark" mode="horizontal" :selected-keys="null">
          <a-menu-item key="1" @click="showHelp = !showHelp">
            <template #icon>
              <question-circle-outlined />
            </template>
            {{ t('menu.help') }}
          </a-menu-item>
          <a-sub-menu key="sub2">
            <template #icon>
              <translation-outlined />
            </template>
            <template #title>{{ LocaleTextMapping[sysInfo.locale] }}</template>
            <a-menu-item
              v-for="loc in LocaleEnum"
              :key="loc"
              @click="sysInfo.locale = loc"
            >
              {{ LocaleTextMapping[loc] }}
            </a-menu-item>
          </a-sub-menu>
          <a-menu-item key="3" @click="showAbout = !showAbout">
            <template #icon>
              <menu-outlined />
            </template>
            {{ t('menu.about') }}
          </a-menu-item>
          <a-menu-item key="4">
            <template #icon>
              <github-outlined />
            </template>
            <a href="https://github.com/hangvane/mirror-cinema/" target="_blank">
              Github
            </a>
          </a-menu-item>
        </a-menu>
      </a-layout-header>
      <a-row justify="center">
        <a-col
          :xs="23"
          :sm="22"
          :md="21"
          :lg="20"
          :xl="19"
          :xxl="18"
          :xxxl="17"
        >
          <a-layout-content>
            <a-row justify="center">
              <a-col :span="22">
                <MainPanel />
              </a-col>
            </a-row>
          </a-layout-content>
        </a-col>
      </a-row>
      <a-layout-footer>
        Mirror Cinema &copy;2022 Created by HangVane
      </a-layout-footer>
    </a-layout>
    <a-modal
      style="top: 20px"
      wrap-class-name="helpDiv"
      v-model:visible="showHelp"
      width="850px"
      :title="t('menu.helpTitle')"
      :footer="null"
    >
      <HelpContent_zh_CN v-if="sysInfo.locale === LocaleEnum.ZH_CN" />
      <HelpContent_en_US v-if="sysInfo.locale === LocaleEnum.EN_US" />
    </a-modal>
    <a-modal
      v-model:visible="showAbout"
      width="390px"
      :closable="false"
      :footer="null"
      centered
      :mask="false"
    >
      <AboutPanel />
    </a-modal>
  </a-config-provider>
</template>

<script lang="ts" setup>
import {
  GithubOutlined,
  TranslationOutlined,
  MenuOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons-vue';
import { ref } from 'vue';
import MainPanel from '/@/components/MainPanel.vue';
import HelpContent_zh_CN from '/@/articles/HelpContent_zh_CN.md';
import HelpContent_en_US from '/@/articles/HelpContent_en_US.md';
import { sysInfoStore } from '/@/stores/SysInfo';
import AboutPanel from '/@/components/AboutPanel.vue';
import { useI18n } from 'vue-i18n';
import { LocaleEnum, LocaleMapping, LocaleTextMapping } from '/@/languages';

const { t } = useI18n();

const sysInfo = sysInfoStore();
const showHelp = ref(false);
const showAbout = ref(false);
</script>

<style scoped lang="less">
img {
  height: 30px;
}

.ant-layout-header > .ant-space {
  float: left;
  color: aliceblue;
}

.ant-menu-root {
  justify-content: flex-end;
}

.ant-layout-content > .ant-row {
  background: #fff;
  padding-top: 10px;
  padding-bottom: 24px;
}

.ant-layout-footer {
  text-align: center;
}
.ant-layout-header {
  position: sticky;
  top: 0;
  z-index: 10;
}
</style>
