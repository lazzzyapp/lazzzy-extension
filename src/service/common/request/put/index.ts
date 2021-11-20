import { BaseRequestOptions } from '@/service/common/request/base';

export interface IPutRequestOptions extends BaseRequestOptions {
  method: 'put';
  data: any;
}
