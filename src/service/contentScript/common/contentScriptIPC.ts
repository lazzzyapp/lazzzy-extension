/* eslint-disable no-useless-constructor */
/* eslint-disable no-unused-vars */
/* eslint-disable no-empty-function */
import { IContentScriptService, IToggleConfig } from '@/service/common/contentScript';
import { IServerChannel, IChannel } from '@/service/common/ipc';

export class ContentScriptChannel implements IServerChannel {
  constructor(private service: IContentScriptService) {}

  call = async (
    _context: chrome.runtime.Port['sender'],
    command: string,
    arg: any
  ): Promise<any> => {
    switch (command) {
      case 'remove':
        return this.service.remove();
      case 'hide':
        return this.service.hide();
      case 'checkStatus':
        return this.service.checkStatus();
      case 'getPageUrl':
        return this.service.getPageUrl();
      case 'toggle': {
        return this.service.toggle(arg[0]);
      }
      case 'getSelectionMarkdown':
        return this.service.getSelectionMarkdown();
      case 'runScript': {
        return this.service.runScript(arg[0], arg[1]);
      }
      default: {
        throw new Error(`Call not found: ${command}`);
      }
    }
  };
}

export class ContentScriptChannelClient implements IContentScriptService {
  constructor(private channel: IChannel) {}

  remove = async (): Promise<void> => this.channel.call('remove');

  runScript = async (id: string, lifeCycle: 'run' | 'destroy'): Promise<void> =>
    this.channel.call('runScript', [id, lifeCycle]);

  hide = async (): Promise<void> => this.channel.call('hide');
  checkStatus = async (): Promise<boolean> => this.channel.call('checkStatus');
  toggle = async (config?: IToggleConfig): Promise<void> => this.channel.call('toggle', [config]);
  getSelectionMarkdown = async (): Promise<string> => this.channel.call('getSelectionMarkdown');
  getPageUrl = async (): Promise<string> => this.channel.call('getPageUrl');
}
