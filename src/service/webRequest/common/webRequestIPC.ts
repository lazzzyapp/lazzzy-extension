/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-constructor */
/* eslint-disable no-empty-function */
import {
  IWebRequestService,
  WebRequestBlockOption,
  WebBlockHeader,
  RequestInBackgroundOptions,
} from '@/service/common/webRequest';
import { IServerChannel, IChannel } from '@/service/common/ipc';
import chrome from 'sinon-chrome/apps';
export class WebRequestChannel implements IServerChannel {
  constructor(private service: IWebRequestService) {}

  call = async (
    _context: chrome.runtime.Port['sender'],
    command: string,
    arg: any
  ): Promise<any> => {
    switch (command) {
      case 'end':
        return this.service.end(arg);
      case 'startChangeHeader':
        return this.service.startChangeHeader(arg);
      case 'requestInBackground':
        return this.service.requestInBackground(arg[0], arg[1]);
      default: {
        throw new Error(`Call not found: ${command}`);
      }
    }
  };
}

export class WebRequestChannelClient implements IWebRequestService {
  constructor(private channel: IChannel) {}

  startChangeHeader = async (option: WebRequestBlockOption): Promise<WebBlockHeader> =>
    this.channel.call('startChangeHeader', option);

  end = async (webBlockHeader: WebBlockHeader): Promise<void> =>
    this.channel.call('end', webBlockHeader);

  requestInBackground = async <T>(url: string, options: RequestInBackgroundOptions): Promise<T> =>
    this.channel.call('requestInBackground', [url, options]);
}
