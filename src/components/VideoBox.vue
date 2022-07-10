<template>
  <div class="video-box">
    <h2 class="video-name"></h2>
    <video
      preload="auto"
      controls
      ref="player"
      @play="videoPlay"
      @pause="videoPause"
      @seeking="videoSeeking"
      @ratechange="videoRateChange"
    ></video>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { VideoParam, VideoStatusEnum } from '/@/api/types';
import almostEqual from 'almost-equal';
import { env } from '/@/stores/Env';
import { Logger } from '/@/utils/Logger';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const log = Logger.getLogger('VideoBox');

const emit = defineEmits<{
  (event: 'on-change', videoParam: VideoParam): void;
}>();

const player = ref();

const { SYNC_THRESHOLD } = env;

const videoParam: VideoParam = {
  status: VideoStatusEnum.PAUSED,
  currentTime: 0,
  playbackRate: 1,
};

async function setVideoParam(v: VideoParam) {
  /*这里一定要涉及videoParam的修改值，保证修改值在callback前被修改，callback里要据此判断是否主动触发*/
  if (!almostEqual(player.value.playbackRate, v.playbackRate)) {
    player.value.playbackRate = videoParam.playbackRate = v.playbackRate;
  }
  if (Math.abs(player.value.currentTime - v.currentTime) > SYNC_THRESHOLD) {
    player.value.currentTime = videoParam.currentTime = v.currentTime;
  }
  if (videoParam.status !== v.status) {
    videoParam.status = v.status;
    switch (v.status) {
      case VideoStatusEnum.PAUSED:
        player.value.pause();
        break;
      case VideoStatusEnum.PLAYING:
        player.value.play();
        break;
    }
  }
}

function getVideoParam(): VideoParam {
  videoParam.currentTime = player.value.currentTime;
  return videoParam;
}

function setVideoSrc(url: URL) {
  player.value.src = url.toString();
}

function videoPlay() {
  if (videoParam.status === VideoStatusEnum.PLAYING) {
    log.debug('Play', t('log.playCanceled'));
    return;
  }
  log.info('Play', t('log.triggered'));
  videoParam.status = VideoStatusEnum.PLAYING;
  emit('on-change', videoParam);
}

function videoPause() {
  if (videoParam.status === VideoStatusEnum.PAUSED) {
    log.debug('Pause', t('log.pauseCanceledRemote'));
    return;
  }
  if (player.value.readyState < player.value.HAVE_FUTURE_DATA) {
    //TODO:判断边界条件
    log.debug('Pause', t('log.pauseCanceledLoading'));
    return;
  }
  log.info('Pause', t('log.triggered'));
  videoParam.status = VideoStatusEnum.PAUSED;
  videoParam.currentTime = player.value.currentTime;
  emit('on-change', videoParam);
}

function videoSeeking() {
  if (Math.abs(videoParam.currentTime - player.value.currentTime) < 0.1) {
    log.debug('Seek', t('log.seekCanceled'));
    return;
  }
  log.info(
    'Seek',
    t('log.triggered'),
    videoParam.currentTime,
    player.value.currentTime
  );
  videoParam.currentTime = player.value.currentTime;
  emit('on-change', videoParam);
}

function videoRateChange() {
  if (almostEqual(videoParam.playbackRate, player.value.playbackRate)) {
    log.debug('RateChange', t('log.rateChangeCanceled'));
    return;
  }
  log.info('RateChange', t('log.triggered'));
  videoParam.playbackRate = player.value.playbackRate;
  videoParam.currentTime = player.value.currentTime;
  emit('on-change', videoParam);
}

defineExpose({
  setVideoParam,
  getVideoParam,
  setVideoSrc,
});
</script>

<style scoped lang="less">
video {
  width: 100%;
  height: auto;
}
.video-name {
  word-break: break-all;
  font-size: 14px;
  line-height: 1.5;
}
.video-box {
  background-color: #222222;
}
</style>
