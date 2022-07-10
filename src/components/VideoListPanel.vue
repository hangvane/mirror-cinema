<template>
  <a-space direction="vertical">
    <a-upload-dragger
      name="file"
      :multiple="true"
      :before-upload="beforeUpload"
      :capture="null"
    >
      <p class="ant-upload-hint">{{ t('videoListPanel.fileSelect') }}</p>
    </a-upload-dragger>

    <a-row :gutter="[6, 2]">
      <a-col :xs="18" :sm="20" :md="21" :lg="22" :xl="22" :xxl="22" :xxxl="22">
        <a-input
          :addon-before="t('videoListPanel.videoUrl')"
          placeholder="https://abc.com/def.mp4"
          v-model:value="videoSrc"
        >
          <template #suffix>
            <a-tooltip :title="t('videoListPanel.videoUrlTip')">
              <info-circle-outlined />
            </a-tooltip>
          </template>
        </a-input>
      </a-col>
      <a-col :xs="6" :sm="4" :md="3" :lg="2" :xl="2" :xxl="2" :xxxl="2">
        <a-button type="primary" @click="addVideoItem(videoSrc)" block>
          {{ t('videoListPanel.add') }}
        </a-button>
      </a-col>
    </a-row>

    <a-table
      :dataSource="videoList"
      :columns="columns"
      :show-header="false"
      :pagination="false"
      :scroll="{ x: 'max-content' }"
    >
      <template #bodyCell="{ column, index, record: videoItem }">
        <template v-if="column.key === 'main'">
          <a-tag
            v-show="videoItem.urlType === UrlTypeEnum.LOCAL"
            color="purple"
          >
            {{ t('videoListPanel.local') }}
          </a-tag>
          <a-tag
            v-show="videoItem.urlType === UrlTypeEnum.NETWORK"
            color="blue"
          >
            {{ t('videoListPanel.network') }}
          </a-tag>
          <a-typography-text
            :copyable="videoItem.urlType === UrlTypeEnum.NETWORK"
          >
            {{ videoItem.title }}
          </a-typography-text>
          <a-popover
            :title="t('videoListPanel.videoSharingUrl')"
            placement="topRight"
            trigger="click"
            @visibleChange="sharingVideoItem = videoItem"
          >
            <template #content>
              <a-typography-text copyable>
                {{ sharingUrl }}
              </a-typography-text>
            </template>
            <a-button
              v-if="videoItem.urlType === UrlTypeEnum.NETWORK"
              type="link"
              primary
            >
              <share-alt-outlined />
            </a-button>
          </a-popover>
        </template>
        <template v-else-if="column.key === 'action'">
          <a-button type="link" @click="$emit('on-play', videoItem)">
            {{ t('videoListPanel.play') }}
          </a-button>
          <a-divider type="vertical" />
          <a-button type="link" @click="deleteVideoItem(index)" danger>
            {{ t('videoListPanel.delete') }}
          </a-button>
        </template>
      </template>
    </a-table>
  </a-space>
</template>

<script lang="ts" setup>
import { UrlTypeEnum, VideoItem } from '/@/api/types';
import { computed, reactive, ref, unref } from 'vue';
import { InfoCircleOutlined, ShareAltOutlined } from '@ant-design/icons-vue';
import { ColumnProps } from 'ant-design-vue/es/table';
import { Upload, UploadProps } from 'ant-design-vue/es';
import UrlParse from 'url-parse';
import { sysInfoStore } from '/@/stores/SysInfo';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const props = defineProps<{
  videoList: VideoItem[];
}>();

defineEmits<{
  (event: 'on-play', videoItem: VideoItem): void;
}>();

const sysInfo = sysInfoStore();

const videoList = reactive(props.videoList);

const videoSrc = ref();

const columns = reactive<ColumnProps[]>([
  { title: 'main', key: 'main' },
  {
    title: 'action',
    key: 'action',
    align: 'center',
    fixed: 'right',
    width: 120,
  },
]);

const sharingUrl = computed(() => {
  const u = new UrlParse(window.location.href, true);
  u.set('query', {
    appId: sysInfo.im.options.appId,
    appKey: sysInfo.im.options.appKey,
    server: sysInfo.im.options.server,
    conversationId: sysInfo.im.options.conversationId,
    url: sharingVideoItem.value?.url,
  });
  return u.toString();
});

const sharingVideoItem = ref<VideoItem>();

const beforeUpload: UploadProps['beforeUpload'] = (file) => {
  videoList.push({
    url: new URL(URL.createObjectURL(file)),
    title: file.name,
    urlType: UrlTypeEnum.LOCAL,
  });
  return Upload.LIST_IGNORE;
};

function addVideoItem(url: string) {
  videoList.push({
    url: new URL(unref(url)),
    title: unref(url),
    urlType: UrlTypeEnum.NETWORK,
  });
}

function deleteVideoItem(index: number) {
  videoList.splice(index, 1);
}
</script>

<style scoped lang="less">
.ant-btn-link {
  padding: unset;
}
.ant-popover-inner-content {
  max-width: 60vw;
  word-break: break-all;
}
</style>
