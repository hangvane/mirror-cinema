[toc]

## Mirror Cinema是什么

Mirror Cinema是一个共享视频放映的网站，可以和朋友家人远程看电影。

Mirror Cinema通过同步视频的播放进度实现共享放映，与腾讯会议等串流类软件不同，这种方式不会卡顿。

Mirror Cinema**完全基于浏览器实现**，不需要下载、登录，也不需要自行架设服务器，只需要2分钟的配置，手机也能操作。

### 原理

LeanCloud提供了免费的WebSocket通讯服务，可以相互发送视频进度报文。基于此，Mirror Cinema可以托管于`Github Pages`, `Netlify`, `Vercel` 等免费的静态服务器上，无需自行架设维护服务器。

因此，使用Mirror Cinema需要先注册并配置LeanCloud连接参数，只需一次配置即可多人共享。

## 使用教程

1. 第一次进入网站，需要切换至`系统信息`选项卡，填写LeanCloud通讯的必要参数`AppId`, `AppKey`, `Server`，获得该信息的做法请参考 # LeanCloud参数配置 小节；

2. 录入后，可使用`分享`功能发送给同伴，ta无需再录入一遍参数；
3. 连接成功后，可以在`视频列表`选项卡录入想要一起看的本地或网络视频，还可以将网络视频分享给同伴（本地视频不能直接分享，需要同伴手动添加）；
4. 和同伴播放同一段视频，现在视频的进度、倍速、暂停/恢复已经全部同步了！

**注意：Mirror Cinema只负责同步视频的播放进度，如果你和同伴选择了不同视频播放，Mirror Cinema是不会纠正的。**

### LeanCloud申请

1. 前往 https://www.leancloud.cn 注册；

2. 登录进LeanCloud控制台后，选择`创建应用`，其他信息任填，**注意计价方案选`开发版`**（也即免费版）；
3. 点击进入刚刚创建的应用，前往`设置` -> `应用凭证`，将`AppID`, `AppKey`, `REST API 服务器地址` 分别填入Mirror Cinema`系统信息`选项卡的对应位置并更新。

## 分享

### 配置分享

在`系统信息`选项卡右上角，点击`分享`按钮可以生成配置分享链接，发送给同伴打开链接即无需再配置LeanCloud，自动加入同一个房间。

### 视频分享

添加一条网络视频后，点击`分享`按钮可以生成视频分享链接，发送给同伴即可自动播放同一段网络视频，且LeanCloud参数也一并自动同步。

## 视频格式兼容性

|         | MP4 (H.264) | MKV (H.265) | MKV (AV1) | WebM |
|:-------:|:-----------:|:-----------:|:---------:|:----:|
| Chrome  |      ✓      |             |     ✓     |  ✓   |
|  Edge   |      ✓      |      ~      |     ✓     |  ✓   |
| Safari  |      ✓      |      ✓      |           |  ✓   |
|   iOS   |      ✓      |      ✓      |           |  ~   |
| Firefox |      ✓      |             |     ✓     |  ✓   |
|  Opera  |      ✓      |             |     ✓     |  ✓   |
