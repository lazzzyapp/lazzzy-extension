import { LazzzyAppConfiguration } from '@/service/common/configuration';

interface IGenerateLocalConfigOptions {
  locale: string;
}

const generateLocalConfig = (_options: IGenerateLocalConfigOptions): LazzzyAppConfiguration => {
  return {
    resource: {
      host: '',
      privacy: '',
      changelog: '',
    },
    yuque_oauth: {
      clientId: '',
      callback: '',
      scope: '',
    },
    onenote: {
      clientId: '06193463-8e75-45a0-b409-f0558d36c5a4',
      callback: 'https://api.lazzzy.app/api/user/oauth/onenote',
    },
    google_oauth: {
      clientId: '490020910268-rf8048g1nrddg2gearg5m486qo97vaqb.apps.googleusercontent.com',
      callback: 'https://api.lazzzy.app/api/user/oauth/google',
    },
    github_oauth: {
      clientId: '13bb6f87575590d541e6',
      callback: 'https://api.lazzzy.app/api/user/oauth/github',
    },
  };
};

export { generateLocalConfig };
