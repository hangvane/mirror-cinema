const zh_CN: Language = {
  locale: '中文',
  menu: {
    help: '帮助',
    about: '关于',
    helpTitle: 'Mirror Cinema 使用帮助',
  },
  about: {
    intro: '一个简单的小工具，充满爱。',
    contributors: '贡献者',
    homepage: '个人主页',
    principal: '主体',
    inspiration: '灵感',
    translation: '翻译',
  },
  mainPanel: {
    playing: '当前播放',
    videos: '视频列表',
    users: '用户状态',
    logs: '日志',
    system: '系统信息',
  },
  videoListPanel: {
    fileSelect: '选择本地文件',
    videoUrl: '视频网址',
    add: '添加',
    videoUrlTip: '形如 "https://abc.com/def.mp4"',
    local: '本地',
    network: '网络',
    videoSharingUrl: '视频分享链接',
    play: '播放',
    delete: '删除',
  },
  logPanel: {
    logTitle: '日志',
    clearLog: '清空日志',
    level: '级别',
    time: '时间',
  },
  sysInfoPanel: {
    imModule: '通信组件',
    imStatus: '连接状态',
    conversationId: '房间ID',
    userId: '用户ID',
    logLevel: '日志级别',
    edit: '编辑',
    update: '更新',
    share: '分享',
    sharingUrl: '分享链接',
    random: '随机',
  },
  log: {
    videoOnPlay: '切换视频',
    imOptionsUpdated: 'imOptions已更新',
    imOptionsUpdateCanceled: 'imOptions已取消更新',
    sendSyncMsg: '发送视频同步消息',
    triggered: '触发',
    playCanceled: '取消：由远程的冗余play或paused自动触发',
    pauseCanceledRemote: '取消：来自远程的冗余paused',
    pauseCanceledLoading: '取消：由缓冲触发的自动pause',
    seekCanceled: '取消：由刚刚进行的（远程或手动）seek触发',
    rateChangeCanceled: '取消：由刚刚进行的（远程或手动）ratechange触发',
    imOptions: 'imOptions',
    videoList: '视频列表',
    logLevel: '日志等级',
    locale: '语言',
    initInstanceError: '实例初始化错误，执行网页刷新',
    instanceInitialized: '实例初始化完成',
    instanceNotInitialized: '实例未初始化',
    instanceDestroyed: '实例已删除',
    appIdNotExist: '连接失败：appId不存在',
    connected: '连接成功',
    disconnect: '与IM服务器的连接已中断',
    offline: '网络连接已中断',
    online: '网络连接已恢复',
    schedule: '%{time} 秒后进行第 %{attempt} 次重连',
    retry: '正在进行第 %{attempt} 次重连',
    reconnect: '重连成功',
    reconnectError: '重连失败',
    noConversation: '无房间，已创建房间',
    conversationJoined: '已加入房间',
    conversationNotExist: '房间不存在',
    imClientNotExist: 'imClient不存在',
    conversationExited: '已退出房间',
    updateCanceled: 'imOptions参数未变化，更新取消',
  },
};

export default zh_CN;
