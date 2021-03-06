const en_US: Language = {
  locale: 'English',
  menu: {
    help: 'Help',
    about: 'About',
    helpTitle: 'Mirror Cinema Usage Help',
  },
  about: {
    intro: 'A simple tool full of love.',
    contributors: 'Contributors',
    homepage: 'Homepage',
    principal: 'Principal',
    inspiration: 'Inspiration',
    translation: 'Translation',
  },
  mainPanel: {
    playing: 'Playing',
    videos: 'Videos',
    users: 'Users',
    logs: 'Logs',
    system: 'System',
  },
  videoListPanel: {
    fileSelect: 'Select local video files',
    videoUrl: 'Video URL',
    add: 'Add',
    videoUrlTip: 'Like "https://abc.com/def.mp4"',
    local: 'Local',
    network: 'Network',
    videoSharingUrl: 'Video sharing Url',
    play: 'Play',
    delete: 'Delete',
  },
  logPanel: {
    logTitle: 'Log',
    clearLog: 'Clear',
    level: 'Level',
    time: 'Time',
  },
  sysInfoPanel: {
    imModule: 'IM module',
    imStatus: 'IM status',
    conversationId: 'Conversation ID',
    userId: 'User ID',
    logLevel: 'Log level',
    edit: 'Edit',
    update: 'Update',
    share: 'Share',
    sharingUrl: 'Sharing URL',
    random: 'Random',
  },
  log: {
    videoOnPlay: 'video switch',
    imOptionsUpdated: 'imOptions updated',
    imOptionsUpdateCanceled: 'imOptions update Canceled',
    sendSyncMsg: 'send synchronising message',
    triggered: 'triggered',
    playCanceled: 'canceled: triggered by redundant remote play or paused',
    pauseCanceledRemote: 'canceled: triggered by redundant remote paused',
    pauseCanceledLoading: 'canceled: triggered by loading paused',
    seekCanceled:
      'canceled: triggered by (remote or manual) seek that was just operated',
    rateChangeCanceled:
      'canceled: triggered by (remote or manual) rateChange that was just operated',
    imOptions: 'imOptions',
    videoList: 'video list',
    logLevel: 'log level',
    locale: 'language',
    initInstanceError: 'error initializing instance, refresh the page',
    instanceInitialized: 'instance initialized',
    instanceNotInitialized: 'instance not initialized',
    instanceDestroyed: 'instance destroyed',
    appIdNotExist: 'connection failed: appId not exist',
    connected: 'connected',
    disconnect: 'disconnected with IM server',
    offline: 'network connection disconnected',
    online: 'network connection resumed',
    schedule: 'reconnect in %{time} s',
    retry: 'reconnecting for the %{attempt} time',
    reconnect: 'reconnected',
    reconnectError: 'reconnect failed',
    noConversation: 'no conversation, created',
    conversationJoined: 'conversation joined',
    conversationNotExist: 'conversation not exist',
    imClientNotExist: 'imClient not exist',
    conversationExited: 'conversation exited',
    updateCanceled: 'update canceled: imOptions not changed',
  },
};

export default en_US;
