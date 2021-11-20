import { LazzzyConfiguration } from '@/service/common/configuration';

interface IGenerateLocalConfigOptions {
  locale: string;
}

const generateLocalConfig = (_options: IGenerateLocalConfigOptions): LazzzyConfiguration => ({
  resource: {
    host: '',
    privacy: '',
    changelog: '',
  },
  onenote_oauth: {
    clientId: '',
    callback: '',
  },
  google_oauth: {
    clientId: '',
    callback: '',
  },
  github_oauth: {
    clientId: '',
    callback: '',
  },
});

export { generateLocalConfig };
