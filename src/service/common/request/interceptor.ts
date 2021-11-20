import { TRequestOption } from './option';

export type RequestInterceptor = (
  url: string,
  options: TRequestOption
) => {
  url?: string;
  options?: TRequestOption;
};
