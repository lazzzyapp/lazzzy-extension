interface LazzzyConfig {
  icon: string;
  iconDark: string;
  githubClientId: string;
  githubCallback: string;
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

let config: LazzzyConfig = {
  admin: false,
  googleOauth: {
    clientId: '269705697424-vlu486hs2paqj71p9defgvkbrpo9amcq.apps.googleusercontent.com',
    callback: 'https://api.lazzzy.app/api/user/oauth/google',
  },
  icon: 'icon.png',
  iconDark: 'icon-dark.png',
  githubClientId: '13bb6f87575590d541e6',
  githubCallback: 'https://api.lazzzy.app/api/user/oauth/github',
  oneNoteClientId: '563571ad-cfcd-442a-aa34-046bad24b1b6',
  oneNoteCallBack: 'https://api.lazzzy.app/api/user/oauth/onenote',
  // oneNoteCallBack: 'http://localhost:3000/onenote_oauth',
  serverHost: 'https://api.lazzzy.app',
  resourceHost: 'https://resource.lazzzy.app',
  loadRemoteConfig: true,
};

if (process.env.NODE_ENV === 'development') {
  config = Object.assign({}, config, {
    admin: true,
    googleOauth: {
      clientId: '269705697424-l6h6e3pkcsjs3lggjdlivs7vaarr8gp0.apps.googleusercontent.com',
      callback: 'https://api.test.lazzzy.app/api/user/oauth/google',
      // callback: 'http://localhost:3000/api/user/oauth/google', // Local test
    },
    loadRemoteConfig: false,
    icon: 'icon-dev.png',
    // githubClientId: 'acad97d010cd6d7ef560',
    // githubCallback: 'http://localhost:3000/api/user/oauth/github',
    oneNoteClientId: '01c7500b-98dd-4f37-813f-a959382793ac',
    oneNoteCallBack: 'https://api.test.lazzzy.app/api/user/oauth/onenote',
    // oneNoteCallBack: 'http://localhost:3000/onenote_oauth',
    serverHost: 'https://api.test.lazzzy.app',
    // serverHost: 'http://localhost:3000',
  });
}

export default config;
