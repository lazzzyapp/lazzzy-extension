export interface LazzzyConfiguration {
  resource: {
    host: string;
    privacy: string;
    changelog: string;
  };
  onenote_oauth: {
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
