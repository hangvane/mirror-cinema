<template>
  <a-spin :spinning="submitting">
    <a-descriptions
      :title="`Mirror Cinema v${env.APP_INFO.version}`"
      bordered
      :label-style="{ wordBreak: 'keep-all' }"
    >
      <template #extra>
        <a-space>
          <a-button v-if="!editing" type="primary" @click="edit">
            {{ t('sysInfoPanel.edit') }}
          </a-button>
          <a-button
            v-else
            :loading="submitting"
            danger
            type="primary"
            @click="submit"
          >
            {{ t('sysInfoPanel.update') }}
          </a-button>
          <a-popover
            :title="t('sysInfoPanel.sharingUrl')"
            placement="bottomRight"
            trigger="click"
            v-model:visible="popoverVisible"
          >
            <template #content>
              <a-typography-text copyable>
                {{ sharingUrl }}
              </a-typography-text>
            </template>
            <a-button type="default" :disabled="editing">
              {{ t('sysInfoPanel.share') }}
            </a-button>
          </a-popover>
        </a-space>
      </template>
      <a-descriptions-item :span="1" :label="t('sysInfoPanel.imModule')">
        {{ `${sysInfo.im.INFO.type}` }}
      </a-descriptions-item>
      <a-descriptions-item :span="2" :label="t('sysInfoPanel.imStatus')">
        <a-badge
          :status="IMStatusColorMapping[sysInfo.im.status]"
          :text="sysInfo.im.status.toUpperCase()"
        />
      </a-descriptions-item>
      <a-descriptions-item :span="3" label="AppId">
        <a-typography-text
          v-if="!editing"
          :copyable="{ text: sysInfo.im.options.appId }"
        >
          {{
            sysInfo.im.options.appId.replace(/(\w{5})\w*(\w{1})/, '$1******$2')
          }}
        </a-typography-text>
        <a-input v-else v-model:value="imOptions.appId" />
      </a-descriptions-item>
      <a-descriptions-item :span="3" label="AppKey">
        <a-typography-text
          v-if="!editing"
          :copyable="{ text: sysInfo.im.options.appKey }"
        >
          {{
            sysInfo.im.options.appKey.replace(/(\w{5})\w*(\w{1})/, '$1******$2')
          }}
        </a-typography-text>
        <a-input v-else v-model:value="imOptions.appKey" />
      </a-descriptions-item>
      <a-descriptions-item :span="3" label="Server">
        <a-typography-text
          v-if="!editing"
          :copyable="{ text: sysInfo.im.options.server }"
        >
          {{
            sysInfo.im.options.server.replace(
              /\/(\w{1})\w*(\w{1})/,
              '/$1******$2'
            )
          }}
        </a-typography-text>
        <a-input v-else v-model:value="imOptions.server" />
      </a-descriptions-item>
      <a-descriptions-item :span="3" :label="t('sysInfoPanel.conversationId')">
        <a-typography-text v-if="!editing" copyable>
          {{ sysInfo.im.options.conversationId }}
        </a-typography-text>
        <a-select v-else v-model:value="imOptions.conversationId">
          <a-select-option
            v-for="conversationId in sysInfo.im.conversationIdList"
            :key="conversationId"
            :value="conversationId"
          >
            {{ conversationId }}
          </a-select-option>
        </a-select>
      </a-descriptions-item>
      <a-descriptions-item :span="3" :label="t('sysInfoPanel.userId')">
        <a-typography-text v-if="!editing" copyable>
          {{ sysInfo.im.options.userId }}
        </a-typography-text>
        <a-input v-else v-model:value="imOptions.userId">
          <template #suffix>
            <a-tooltip :title="t('sysInfoPanel.random')">
              <sync-outlined @click="reGenerateUserId" />
            </a-tooltip>
          </template>
        </a-input>
      </a-descriptions-item>
      <a-descriptions-item :span="3" :label="t('sysInfoPanel.logLevel')">
        <a-tag v-if="!editing" :color="LogLevelColorMapping[sysInfo.logLevel]">
          {{ sysInfo.logLevel.toUpperCase() }}
        </a-tag>
        <a-select v-else v-model:value="logLevel">
          <a-select-option
            v-for="level in availableLogLevels"
            :key="level"
            :value="level"
          >
            {{ level.toUpperCase() }}
          </a-select-option>
        </a-select>
      </a-descriptions-item>
    </a-descriptions>
  </a-spin>
</template>

<script lang="ts" setup>
import { computed, reactive, ref, watch } from 'vue';
import { message } from 'ant-design-vue';
import cryptoRandomString from 'crypto-random-string';
import randomWords from 'random-words';
import { SyncOutlined } from '@ant-design/icons-vue';
import { env } from '/@/stores/Env';
import { sysInfoStore } from '/@/stores/SysInfo';
import { availableLogLevels } from '/@/utils/Logger';
import {
  IMOptions,
  IMRegisterEnum,
  IMStatusColorMapping,
  LogLevelColorMapping,
  LogLevelEnum,
} from '/@/api/types';
import UrlParse from 'url-parse';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const sysInfo = sysInfoStore();

const editing = ref(false);

const submitting = ref(false);

const popoverVisible = ref(false);

watch(popoverVisible, () => {
  if (editing.value) {
    popoverVisible.value = false;
  }
});

const sharingUrl = computed(() => {
  const u = new UrlParse(window.location.href, true);
  u.set('query', {
    appId: sysInfo.im.options.appId,
    appKey: sysInfo.im.options.appKey,
    server: sysInfo.im.options.server,
    conversationId: sysInfo.im.options.conversationId,
  });
  return u.toString();
});

const imOptions: IMOptions = reactive({
  appId: '',
  appKey: '',
  server: '',
  conversationId: '',
  userId: '',
});

const logLevel = ref<LogLevelEnum>(LogLevelEnum.DEBUG);

function edit() {
  ({
    appId: imOptions.appId,
    appKey: imOptions.appKey,
    server: imOptions.server,
    conversationId: imOptions.conversationId,
    userId: imOptions.userId,
  } = sysInfo.im.options);

  logLevel.value = sysInfo.logLevel;

  editing.value = true;
}

async function submit() {
  submitting.value = true;

  sysInfo.logLevel = logLevel.value;

  const result = await sysInfo.im.updateOptions({
    appId: imOptions.appId,
    appKey: imOptions.appKey,
    server: imOptions.server,
    conversationId: imOptions.conversationId,
    userId: imOptions.userId,
  });
  switch (result) {
    case IMRegisterEnum.APP_ID_DUPLICATE:
      await message.error('AppId已被实例化，页面将自动刷新');
      location.reload();
      break;
    case IMRegisterEnum.APP_ID_NOT_EXIST:
      message.error('AppId不存在');
      submitting.value = false;
      break;
    case IMRegisterEnum.SUCCESS:
    case IMRegisterEnum.UPDATE_CANCELED:
      editing.value = false;
      submitting.value = false;
  }
}

async function reGenerateUserId() {
  imOptions.userId = `${randomWords({
    maxLength: 5,
    exactly: 1,
    join: '',
  })}-${cryptoRandomString({
    length: 4,
    type: 'numeric',
  })}`;
}
</script>

<style lang="less">
.ant-descriptions-item-content {
  padding-top: 1px !important;
  padding-bottom: 1px !important;
}

.ant-popover-inner-content {
  max-width: 60vw;
  word-break: break-all;
}

.ant-select-selection-item {
  white-space: unset;
}
</style>

<style lang="less" scoped>
.ant-btn-icon-only.ant-btn-sm {
  width: 20px;
  height: 20px;
}

.ant-select {
  width: 100%;
}
.ant-typography {
  word-break: break-all;
}
</style>
