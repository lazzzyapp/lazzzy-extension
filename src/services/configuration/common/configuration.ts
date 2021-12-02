import { Token } from 'typedi';

export interface ILazzzyConfiguration {
  google_oauth: {
    clientId: string;
    callback: string;
    scope: string;
  };
}
export interface IConfigurationServiceInterface {
  getConfiguration: () => ILazzzyConfiguration;

  init: () => void;
}

export const IConfigurationService = new Token<IConfigurationServiceInterface>();
