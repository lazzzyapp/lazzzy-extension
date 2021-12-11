import { Token } from 'typedi';

export interface ILazzzyAppConfiguration {
  yuque_oauth: {
    clientId: string;
    callback: string;
    scope: string;
  };
}
export interface IConfigurationService {
  getConfiguration(): ILazzzyAppConfiguration;

  init(): void;
}

export const IConfigurationService = new Token<IConfigurationService>();
