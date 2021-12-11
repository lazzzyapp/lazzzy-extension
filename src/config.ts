interface LazzzyAppConfig {
  icon: string;
  iconDark: string;
  yuqueClientId: string;
  yuqueCallback: string;
  githubClientId: string;
  githubCallback: string;
  yuqueScope: string;
  oneNoteCallBack: string;
  oneNoteClientId: string;
  serverHost: string;
  resourceHost: string;
  loadRemoteConfig: boolean;
  admin: boolean;
  googleOauth: {
    clientId: string;
    callback: string;
  };
}

export interface RemoteConfig {
  iconfont: string;
  chromeWebStoreVersion: string;
}

let config: LazzzyAppConfig = {
  admin: false,
  googleOauth: {
    clientId: '490020910268-rf8048g1nrddg2gearg5m486qo97vaqb.apps.googleusercontent.com',
    callback: 'https://api.lazzzy.app/api/user/oauth/google',
  },
  icon: 'icon.png',
  iconDark: 'icon-dark.png',
  // TODO: Setup Yuque App
  yuqueClientId: 'D1AwzCeDPLFWGfcGv7ze',
  yuqueCallback: 'https://api.lazzzy.app/api/user/oauth/yuque',
  githubClientId: '13bb6f87575590d541e6',
  githubCallback: 'https://api.lazzzy.app/api/user/oauth/github',
  yuqueScope: 'doc,group,repo,attach_upload',
  oneNoteClientId: '06193463-8e75-45a0-b409-f0558d36c5a4',
  oneNoteCallBack: 'https://api.lazzzy.app/api/user/oauth/onenote',
  // oneNoteCallBack: 'http://localhost:3000/onenote',
  serverHost: 'https://api.lazzzy.app',
  resourceHost: 'https://resource.lazzzy.app',
  loadRemoteConfig: true,
};

if (process.env.NODE_ENV === 'development') {
  config = Object.assign({}, config, {
    admin: true,
    googleOauth: {
      clientId: '490020910268-rf8048g1nrddg2gearg5m486qo97vaqb.apps.googleusercontent.com',
      callback: 'https://api.test.lazzzy.app/api/user/oauth/google',
      // callback: 'http://localhost:3000/api/user/oauth/google', // Local test
    },
    loadRemoteConfig: false,
    icon: 'icon-dev.png',
    yuqueClientId: 'fylbi7lzfNjhkfyi0hJp',
    yuqueCallback: 'https://api.test.lazzzy.app/api/user/oauth/yuque',
    githubClientId: '13bb6f87575590d541e6',
    // githubCallback: 'http://localhost:3000/api/user/oauth/github',
    oneNoteClientId: '06193463-8e75-45a0-b409-f0558d36c5a4',
    oneNoteCallBack: 'https://api.test.lazzzy.app/api/user/oauth/onenote',
    // oneNoteCallBack: 'http://localhost:3000/onenote',
    serverHost: 'https://api.test.lazzzy.app',
    // serverHost: 'http://localhost:3000',
  });
}

export default config;
