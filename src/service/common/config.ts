import { Token } from 'typedi';
import { ObservableSet } from 'mobx';
import { RemoteConfig } from './RemoteConfig';

export interface IConfigService {
  config?: RemoteConfig;

  isLatestVersion: boolean;

  readonly localVersion: string;

  remoteIconSet: ObservableSet<string>;

  id: string;

  load(): Promise<void>;
}

export const IConfigService = new Token<IConfigService>();
