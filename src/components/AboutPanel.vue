<template>
  <a-space direction="vertical" size="large">
    <a-row align="bottom" :gutter="16">
      <a-col :span="9">
        <img alt="Mirror-Cinema logo" src="../assets/logo.png" />
      </a-col>
      <a-col :span="15">
        <a-row :gutter="[0, 4]">
          <a-col :span="24">
            <a-typography-title :level="3">Mirror Cinema</a-typography-title>
          </a-col>
          <a-col :span="24">
            <a-typography-text type="secondary">
              &copy;2022 Created by HangVane
            </a-typography-text>
          </a-col>
          <a-col :span="24">
            <a-typography-text>{{ t('about.intro') }}</a-typography-text>
          </a-col>
        </a-row>
      </a-col>
    </a-row>
    <a-row :gutter="8">
      <a-col :span="6">
        <a-button
          size="small"
          block
          href="https://github.com/hangvane/sync-player/"
          target="_blank"
        >
          Github
        </a-button>
      </a-col>
      <a-col :span="9">
        <a-popover
          :title="t('about.contributors')"
          placement="bottomLeft"
          trigger="click"
        >
          <template #content>
            <a-descriptions
              bordered
              size="small"
              :label-style="{ textAlign: 'right' }"
            >
              <a-descriptions-item :span="3" :label="t('about.principal')">
                HangVane
              </a-descriptions-item>
              <a-descriptions-item :span="3" :label="t('about.translation')">
                HangVane
              </a-descriptions-item>
              <a-descriptions-item :span="3" :label="t('about.inspiration')">
                <a
                  type="link"
                  href="https://github.com/liyang5945/sync-player/"
                  target="_blank"
                >
                  liyang5945
                </a>
              </a-descriptions-item>
            </a-descriptions>
          </template>
          <a-button size="small" block>
            {{ t('about.contributors') }}
          </a-button>
        </a-popover>
      </a-col>
      <a-col :span="9">
        <a-button
          size="small"
          block
          href="https://github.com/hangvane/"
          target="_blank"
        >
          {{ t('about.homepage') }}
        </a-button>
      </a-col>
    </a-row>
  </a-space>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<style scoped lang="less">
.ant-typography {
  margin-bottom: unset;
}
.ant-descriptions-item-label {
  text-align: right;
}
img {
  width: 100%;
}
.ant-typography-secondary {
  font-size: 12px;
}
</style>
