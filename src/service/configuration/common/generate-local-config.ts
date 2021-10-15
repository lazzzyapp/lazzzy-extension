import { LazzzyConfiguration } from '@/service/common/configuration';

interface IGenerateLocalConfigOptionsInterface {
  locale: string;
}

const generateLocalConfig = (
  _options: IGenerateLocalConfigOptionsInterface
): LazzzyConfiguration => {
  return {
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
  };
};

export { generateLocalConfig };