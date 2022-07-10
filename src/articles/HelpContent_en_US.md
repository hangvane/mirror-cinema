[toc]

## What is Mirror Cinema

Mirror Cinema is a shared video player website that allows you to watch movies remotely with friends and family.

Mirror Cinema synchronizes the progress of video playback. Unlike `Tencent Meeting` and any other video streaming software, there's no lag.

Mirror Cinema is **completely browser-based**. There is no need to download, login, or set up a server. It only takes 2 minutes to configure, and can be operated on your cell phone.

### Idea

LeanCloud provides a free WebSocket-based IM service to send video progress messages to each other. Based on this, Mirror Cinema can be hosted on free static servers such as `Github Pages`, `Netlify`, `Vercel`, without the need to set up your own server.

Therefore, to use Mirror Cinema, you need to register and configure LeanCloud connection parameters first.

## Tutorial

1. Enter the website for the first time, you need to switch to the `System` TAB and fill in the necessary parameters `AppId`, `AppKey`, `Server` for LeanCloud. Please refer to #LeanCloud section for further information.

2. After input, you can click the `share` button to send it to your partner, without their needs to enter parameters again;
3. When connected, you can enter the local or network videos you want to watch together in the `Videos` TAB, and share the network videos with your partner (local videos cannot be directly shared and need to be manually added by your partner).
4. Play the same video with your partner, and now the video's progress, speed, pause/resume are all synchronizing!

**Note: Mirror Cinema is only responsible for synchronizing the progress of the video, and would not inform you if you and your partner choose different videos to play.**

### Apply for LeanCloud

1. Sign up at https://leancloud.app；

2. Login the LeanCloud Console, select `Create Application`, select `Development version` (i.e., free version) to create.
3. Enter the newly created application, go to `Settings` -> `Application credentials`, fill `AppID`, `AppKey` and `REST API server address` in the corresponding positions of the 'Mirror Cinema `System` TAB and then update.

## Sharing

### Parameter Sharing

Click the `Share` button in the `System` TAB to generate the parameter sharing URL. Send it to your partner. Open the URL to join the same room automatically without configuring LeanCloud.

### Video Sharing

After adding a network video, click the `Share` button to generate a video sharing URL. Send it to your partner to automatically play the same network video, and the LeanCloud parameters are also synchronized automatically.

## Video Format Compatibility

|         | MP4 (H.264) | MKV (H.265) | MKV (AV1) | WebM |
|:-------:|:-----------:|:-----------:|:---------:|:----:|
| Chrome  |      ✓      |             |     ✓     |  ✓   |
|  Edge   |      ✓      |      ~      |     ✓     |  ✓   |
| Safari  |      ✓      |      ✓      |           |  ✓   |
|   iOS   |      ✓      |      ✓      |           |  ~   |
| Firefox |      ✓      |             |     ✓     |  ✓   |
|  Opera  |      ✓      |             |     ✓     |  ✓   |
