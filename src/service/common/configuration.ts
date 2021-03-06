export interface LazzzyAppConfiguration {
  resource: {
    host: string;
    privacy: string;
    changelog: string;
  };
  yuque_oauth: {
    clientId: string;
    callback: string;
    scope: string;
  };
  onenote: {
    clientId: string;
    callback: string;
  };
  google_oauth: {
    clientId: string;
    callback: string;
  };
  github_oauth: {
    clientId: string;
    callback: string;
  };
}

export interface IConfigurationService {}

export type GetLocalConfiguration = () => {};
