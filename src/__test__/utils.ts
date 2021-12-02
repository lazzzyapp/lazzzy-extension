/* eslint-disable no-unused-vars */
import { IRequestService } from '@/service/common/request/service';
import { TRequestOption } from '@/service/common/request/option';
type TMockRequestServiceHandler = (url: string, options?: TRequestOption) => any;

export class MockRequestService implements IRequestService {
  public mock: {
    request: jest.Mock;
  };
  private handler: TMockRequestServiceHandler;
  constructor(handler: TMockRequestServiceHandler) {
    this.mock = {
      request: jest.fn(),
    };
    this.handler = handler;
  }

  request(url: string, options: TRequestOption) {
    this.mock.request(url, options);
    return this.handler(url, options);
  }

  download(url: string): Promise<Blob> {
    return Promise.resolve(new Blob([url]));
  }
}
