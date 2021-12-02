import { TRequestOption } from './option';

export interface IRequestService {
  request: <T>(url: string, options: TRequestOption) => Promise<T>;
  download: (url: string) => Promise<Blob>;
}
