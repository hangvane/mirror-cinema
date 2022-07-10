<template>
  <a-page-header
    :title="currentVideoItem?.title || '-'"
    :sub-title="t('mainPanel.playing')"
  />
  <a-space direction="vertical">
    <VideoBox @on-change="videoOnChange" ref="videoBox" />
    <a-tabs>
      <a-tab-pane key="1" :tab="t('mainPanel.videos')">
        <VideoListPanel
          v-model:video-list="sysInfo.videoList"
          @on-play="playVideoItem"
        />
      </a-tab-pane>
      <a-tab-pane key="2" :tab="t('mainPanel.users')">
        <UserPanel />
      </a-tab-pane>
      <a-tab-pane key="3" :tab="t('mainPanel.logs')">
        <LogPanel />
      </a-tab-pane>
      <a-tab-pane key="4" :tab="t('mainPanel.system')">
        <SysInfoPanel />
      </a-tab-pane>
    </a-tabs>
  </a-space>
</template>

<script lang="ts" setup>
import VideoBox from '/@/components/VideoBox.vue';
import VideoListPanel from '/@/components/VideoListPanel.vue';
import UserPanel from '/@/components/UserPanel.vue';
import LogPanel from '/@/components/LogPanel.vue';
import SysInfoPanel from '/@/components/SysInfoPanel.vue';
import {
  IMOptions,
  Msg,
  UrlTypeEnum,
  VideoItem,
  VideoParam,
} from '/@/api/types';
import { h, onMounted, ref } from 'vue';
import { Descriptions, DescriptionsItem, Modal } from 'ant-design-vue/es';
import { Logger } from '/@/utils/Logger';
import { optionsEqual } from '/@/utils/IM';
import { sysInfoStore } from '/@/stores/SysInfo';
import UrlParse from 'url-parse';
import { message } from 'ant-design-vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const log = Logger.getLogger('MainPanel');

const videoBox = ref();

const abc = ref();

const currentVideoItem = ref<VideoItem>();

const sysInfo = sysInfoStore();

const urlParam = new UrlParse(window.location.href, true).query;
//对url的检测
onMounted(() => {
  if (urlParam.url) {
    playVideoItem({
      url: new URL(urlParam.url),
      title: urlParam.url,
      urlType: UrlTypeEnum.NETWORK,
    });
    message.success('已自动载入分享视频');
  }
  console.log(abc);
  console.log(abc);
});
//对imOptions的检测
if (
  urlParam.appId &&
  urlParam.appKey &&
  urlParam.server &&
  !optionsEqual(
    urlParam as unknown as IMOptions,
    sysInfo.im.options,
    'necessary'
  )
) {
  Modal.confirm({
    width: 500,
    title: '检测到新版连接配置，是否替换已有配置？',
    icon: null,
    content: h(Descriptions, { bordered: true, size: 'small' }, () => [
      h(
        DescriptionsItem,
        { label: 'AppId', span: 3 },
        { default: () => urlParam.appId }
      ),
      h(
        DescriptionsItem,
        { label: 'AppKey', span: 3 },
        { default: () => urlParam.appKey }
      ),
      h(
        DescriptionsItem,
        { label: 'Server', span: 3 },
        { default: () => urlParam.server }
      ),
      h(
        DescriptionsItem,
        { label: '房间ID', span: 3 },
        { default: () => urlParam.conversationId }
      ),
    ]),
    okType: 'danger',
    onOk() {
      console.log('OK');
      [
        sysInfo.im.options.appId,
        sysInfo.im.options.appKey,
        sysInfo.im.options.server,
        sysInfo.im.options.conversationId,
      ] = [
        urlParam.appId as string,
        urlParam.appKey as string,
        urlParam.server as string,
        urlParam.conversationId || '',
      ];
      log.log('URL', t('log.imOptionsUpdated'));
      sysInfo.im.initInstance();
      sysInfo.im.register();
    },
    onCancel() {
      log.log('URL', t('log.imOptionsUpdateCanceled'));
      sysInfo.im.initInstance();
      sysInfo.im.register();
    },
  });
} else {
  sysInfo.im.initInstance();
  sysInfo.im.register();
}

sysInfo.im.addMsgHandler((msg: Msg) => {
  videoBox.value.setVideoParam(msg.videoParam);
});

async function videoOnChange(videoParam: VideoParam) {
  log.debug('IM', t('log.sendSyncMsg'));
  await sysInfo.im.send({
    videoParam,
    userId: sysInfo.im.options.userId as string,
  });
}

function playVideoItem(videoItem: VideoItem) {
  videoBox.value.setVideoSrc(videoItem.url);
  currentVideoItem.value = videoItem;
  window.scrollTo(0, 0);
  log.info('VideoList', t('log.videoOnPlay'));
}
</script>

<style scoped lang="less">
.ant-space {
  width: 100%;
}
.ant-page-header {
  border: 1px solid rgb(235, 237, 240);
}
</style>
<style lang="less">
.ant-page-header-heading-left {
  flex-direction: row-reverse;
}
.ant-page-header-heading-sub-title {
  overflow: unset;
  word-break: keep-all;
}
</style>
