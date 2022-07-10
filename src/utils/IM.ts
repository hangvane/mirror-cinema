import { IMInfo, IMOptions, IMRegisterEnum, IMStatus } from '/@/api/types';
import {
  Event,
  IMClient,
  PresistentConversation,
  Realtime,
  TextMessage,
} from 'leancloud-realtime';
import { Logger } from '/@/utils/Logger';
import { toRaw } from 'vue';
import i18n from '/@/languages/i18n';

const { t } = i18n.global;
const log = Logger.getLogger('IM');

export function optionsEqual(
  aOpt: IMOptions,
  bOpt: IMOptions,
  mode: 'static' | 'dynamic' | 'necessary' | 'all' = 'all'
): boolean {
  switch (mode) {
    case 'static':
      return (
        aOpt.appId === bOpt.appId &&
        aOpt.appKey === bOpt.appKey &&
        aOpt.server === bOpt.server
      );
    case 'dynamic':
      return (
        aOpt.conversationId === bOpt.conversationId &&
        aOpt.userId === bOpt.userId
      );
    case 'necessary':
      return (
        aOpt.appId === bOpt.appId &&
        aOpt.appKey === bOpt.appKey &&
        aOpt.server === bOpt.server &&
        aOpt.conversationId === bOpt.conversationId
      );
    case 'all':
      return (
        aOpt.appId === bOpt.appId &&
        aOpt.appKey === bOpt.appKey &&
        aOpt.server === bOpt.server &&
        aOpt.conversationId === bOpt.conversationId &&
        aOpt.userId === bOpt.userId
      );
  }
}

export class IM<T> {
  public readonly INFO: IMInfo = {
    type: 'LeanCloud Realtime',
  };
  private readonly CONVERSATION_NAME = 'Mirror Cinema Conversation';
  public options: IMOptions;
  private imClient?: IMClient;
  private conversation?: PresistentConversation;
  public status: IMStatus;
  private msgHandlerList: { (msg: T): void }[];
  private realtimeInstance?: Realtime;
  public conversationIdList: string[];

  addMsgHandler(msgHandler: (msg: T) => void) {
    this.msgHandlerList.push(msgHandler);
  }

  constructor(options: IMOptions) {
    this.options = options;
    this.status = IMStatus.CONNECTING;
    this.msgHandlerList = [];
    this.conversationIdList = [];
  }

  initInstance(): IMRegisterEnum {
    try {
      this.realtimeInstance = new Realtime({
        appId: this.options.appId,
        appKey: this.options.appKey,
        server: this.options.server,
      });
    } catch (err) {
      log.error('Init', t('log.initInstanceError'), (err as Error).message);
      return IMRegisterEnum.APP_ID_DUPLICATE;
    }
    log.debug('Init', t('log.instanceInitialized'));
    return IMRegisterEnum.SUCCESS;
  }

  destroyInstance(): IMRegisterEnum {
    if (!this.realtimeInstance) {
      log.warn('Destroy', t('log.instanceNotInitialized'));
      return IMRegisterEnum.NO_INSTANCE;
    }
    this.realtimeInstance = undefined;
    log.debug('Destroy', t('log.instanceDestroyed'));
    return IMRegisterEnum.SUCCESS;
  }

  async register(): Promise<IMRegisterEnum> {
    if (!this.realtimeInstance) {
      log.warn('Reg', t('log.instanceNotInitialized'));
      return IMRegisterEnum.NO_INSTANCE;
    }

    const imClient = await this.realtimeInstance
      .createIMClient(this.options.userId)
      .catch((err) => {
        if (err.code === 404) log.error('Reg', t('log.appIdNotExist'));
      });
    if (!imClient) return IMRegisterEnum.APP_ID_NOT_EXIST;

    this.status = IMStatus.CONNECTED;
    log.log('Reg', t('log.connected'));

    imClient.on(Event.DISCONNECT, () => {
      log.warn('Connect', `[${Event.DISCONNECT}]`, t('log.disconnect'));
      this.status = IMStatus.DISCONNECTED;
    });
    imClient.on(Event.OFFLINE, () => {
      log.warn('Connect', `[${Event.OFFLINE}]`, t('log.offline'));
      this.status = IMStatus.DISCONNECTED;
    });
    imClient.on(Event.ONLINE, () => {
      log.log('Connect', `[${Event.ONLINE}]`, t('log.online'));
      this.status = IMStatus.CONNECTED;
    });
    imClient.on(Event.SCHEDULE, (attempt: number, time: number) => {
      log.log(
        'Connect',
        `[${Event.SCHEDULE}]`,
        t('log.schedule', { time: time / 1000, attempt: attempt + 1 })
      );
      this.status = IMStatus.SCHEDULED;
    });
    imClient.on(Event.RETRY, (attempt: number) => {
      log.log(
        'Connect',
        `[${Event.RETRY}]`,
        t('log.retry', { attempt: attempt + 1 })
      );
      this.status = IMStatus.RECONNECTING;
    });
    imClient.on(Event.RECONNECT, () => {
      log.log('Connect', `[${Event.RECONNECT}]`, t('log.reconnect'));
      this.status = IMStatus.CONNECTED;
    });
    imClient.on(Event.RECONNECT_ERROR, () => {
      log.warn(
        'Connect',
        `[${Event.RECONNECT_ERROR}]`,
        t('log.reconnectError')
      );
      this.status = IMStatus.DISCONNECTED;
    });

    //先进行查找
    const conversations = await imClient
      .getQuery()
      .equalTo('name', this.CONVERSATION_NAME)
      .find();

    let conversation: PresistentConversation;

    if (conversations.length == 0) {
      //没有现成的房间，则新建
      conversation = <PresistentConversation>await imClient.createConversation({
        name: this.CONVERSATION_NAME,
        transient: true,
      });
      this.conversationIdList = [conversation.id];
      log.log('Reg', t('log.noConversation'));
    } else {
      //有现成的房间，则优先查找，否则返回第一个结果
      this.conversationIdList = conversations.map((c) => c.id);

      const idx = this.conversationIdList.indexOf(this.options.conversationId);
      conversation = conversations[Math.max(idx, 0)]; //如果查找不存在，idx===-1，则选择第一个元素
    }

    await conversation.join();

    // 房间接受消息
    conversation.on(Event.MESSAGE, (message: TextMessage) => {
      this.msgHandlerList.forEach((msgHandler) =>
        msgHandler(<T>JSON.parse(message.getText()))
      );
    });

    log.log('Reg', t('log.conversationJoined'));

    this.imClient = imClient;
    this.conversation = conversation;

    //一次性将userId和conversationId同时赋值
    [this.options.userId, this.options.conversationId] = [
      imClient.id,
      conversation.id,
    ];
    return IMRegisterEnum.SUCCESS;
  }

  async deregister(): Promise<IMRegisterEnum> {
    this.status = IMStatus.DISCONNECTED;

    if (!this.conversation) {
      log.warn('DeReg', t('log.conversationNotExist'));
      return IMRegisterEnum.DEREGISTER_FAILED;
    }
    await this.conversation.quit();

    if (!this.imClient) {
      log.warn('DeReg', t('log.imClientNotExist'));
      return IMRegisterEnum.DEREGISTER_FAILED;
    }
    await toRaw(this.imClient).close();

    this.conversation = undefined;
    this.imClient = undefined;
    this.conversationIdList = [];

    log.log('DeReg', t('log.conversationExited'));

    return IMRegisterEnum.SUCCESS;
  }

  async updateOptions(options: IMOptions) {
    //已断开连接或static参数不相等，做全套
    if (
      this.status === IMStatus.DISCONNECTED || //已断开连接一定是static参数出错
      !optionsEqual(this.options, options, 'static')
    ) {
      [
        this.options.appId,
        this.options.appKey,
        this.options.server,
        this.options.conversationId,
        this.options.userId,
      ] = [
        options.appId,
        options.appKey,
        options.server,
        options.conversationId,
        options.userId,
      ];

      //参数更新完毕，开始重连
      await this.deregister();
      await this.destroyInstance();

      const initResult = await this.initInstance();

      if (initResult !== IMRegisterEnum.SUCCESS) {
        return initResult;
      }
      return await this.register();
    }

    if (!optionsEqual(this.options, options, 'dynamic')) {
      [this.options.conversationId, this.options.userId] = [
        options.conversationId,
        options.userId,
      ];

      //参数更新完毕，开始重连
      await this.deregister();
      return await this.register();
    }

    log.debug('Update', t('log.updateCanceled'));
    return IMRegisterEnum.UPDATE_CANCELED;
  }

  async send(msg: T): Promise<boolean> {
    if (!this.conversation) return false;

    await this.conversation.send(new TextMessage(JSON.stringify(msg)));

    return true;
  }
}
