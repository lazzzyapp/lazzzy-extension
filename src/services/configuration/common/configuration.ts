import { Token } from 'typedi';

export interface ILazzzyConfiguration {
  yuque_oauth: {
    clientId: string;
    callback: string;
    scope: string;
  };
}
export interface IConfigurationService {
  getConfiguration(): ILazzzyConfiguration;

  init(): void;
}

export const IConfigurationService = new Token<IConfigurationService>();
