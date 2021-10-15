import { Token } from 'typedi';
import { MessageDescriptor } from 'react-intl';

export interface ILocaleServiceInterface {
  locale: string;
  init: () => Promise<void>;
  format: (descriptor: MessageDescriptor) => string;
}

export const ILocaleService = new Token<ILocaleServiceInterface>('locale');
