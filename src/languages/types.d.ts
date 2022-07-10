declare interface Language {
  locale: string;
  menu: {
    help: string;
    about: string;
    helpTitle: string;
  };
  about: {
    intro: string;
    contributors: string;
    homepage: string;
    principal: string;
    inspiration: string;
    translation: string;
  };
  mainPanel: {
    playing: string;
    videos: string;
    users: string;
    logs: string;
    system: string;
  };
  videoListPanel: {
    fileSelect: string;
    videoUrl: string;
    add: string;
    videoUrlTip: string;
    local: string;
    network: string;
    videoSharingUrl: string;
    play: string;
    delete: string;
  };
  logPanel: {
    logTitle: string;
    clearLog: string;
    level: string;
    time: string;
  };
  sysInfoPanel: {
    imModule: string;
    imStatus: string;
    conversationId: string;
    userId: string;
    logLevel: string;
    edit: string;
    update: string;
    share: string;
    sharingUrl: string;
    random: string;
  };
  log: {
    videoOnPlay: string;
    imOptionsUpdated: string;
    imOptionsUpdateCanceled: string;
    sendSyncMsg: string;
    playCanceled: string;
    triggered: string;
    pauseCanceledRemote: string;
    pauseCanceledLoading: string;
    seekCanceled: string;
    rateChangeCanceled: string;
    imOptions: string;
    videoList: string;
    logLevel: string;
    locale: string;
    initInstanceError: string;
    instanceInitialized: string;
    instanceNotInitialized: string;
    instanceDestroyed: string;
    appIdNotExist: string;
    connected: string;
    disconnect: string;
    offline: string;
    online: string;
    schedule: string;
    retry: string;
    reconnect: string;
    reconnectError: string;
    noConversation: string;
    conversationJoined: string;
    conversationNotExist: string;
    imClientNotExist: string;
    conversationExited: string;
    updateCanceled: string;
  };
}
