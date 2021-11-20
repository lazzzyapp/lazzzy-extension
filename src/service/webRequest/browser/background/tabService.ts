import { generateUuid } from '@web-clipper/shared/lib/uuid';
import {
  IWebRequestService,
  WebRequestBlockOption,
  WebBlockHeader,
  RequestInBackgroundOptions,
} from '@/service/common/webRequest';
import request from 'umi-request';
import chrome from 'sinon-chrome/apps';
(global as any).chrome = chrome;

export const WEB_REQUEST_BLOCK_HEADER = 'lazzzy_web_request';

export class BackgroundWebRequestService implements IWebRequestService {
  private handlerMap: Map<string, any>;

  // eslint-disable-next-line no-unused-vars
  constructor(private extraInfoSpec: string[]) {
    this.handlerMap = new Map<string, any>();
  }

  async startChangeHeader(option: WebRequestBlockOption): Promise<WebBlockHeader> {
    const uuid = generateUuid();
    const targetHeaders = option.requestHeaders.map(o => ({
      name: o.name.toLocaleLowerCase(),
      value: o.value,
    }));

    const handler = (request: chrome.webRequest.WebRequestHeadersDetails) => {
      const originHeaders = request.requestHeaders ?? [];
      if (originHeaders.findIndex((o: any) => o.name === WEB_REQUEST_BLOCK_HEADER) === -1) {
        return;
      }
      const headers = originHeaders
        .filter(
          (header: any) => !targetHeaders.find(o => o.name === header.name.toLocaleLowerCase())
        )
        .concat(targetHeaders);

      return {
        requestHeaders: headers,
      };
    };

    this.handlerMap.set(uuid, handler);
    chrome.webRequest.onBeforeSendHeaders.addListener(
      handler,
      { urls: option.urls },
      this.extraInfoSpec
    );
    return {
      name: WEB_REQUEST_BLOCK_HEADER,
      value: uuid,
    };
  }

  requestInBackground<T>(url: string, options: RequestInBackgroundOptions) {
    return request<T>(url, options);
  }

  async end(webBlockHeader: WebBlockHeader): Promise<void> {
    const handler = this.handlerMap.get(webBlockHeader.value);
    this.handlerMap.delete(webBlockHeader.value);
    chrome.webRequest.onBeforeSendHeaders.removeListener(handler);
    chrome.webRequest.handlerBehaviorChanged();
  }
}
