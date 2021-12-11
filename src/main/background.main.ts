import { PowerpackService } from './../service/powerpackService';
import { ILocaleService } from '@/service/common/locale';
import { IPowerpackService } from '@/service/common/powerpack';
import { IWebRequestService } from '@/service/common/webRequest';
import { WebRequestChannel } from '@/service/webRequest/common/webRequestIPC';
import { IContentScriptService } from '@/service/common/contentScript';
import { ContentScriptChannelClient } from '@/service/contentScript/common/contentScriptIPC';
import { PopupContentScriptIPCClient } from '@/service/ipc/browser/popup/ipcClient';
import { ITrackService } from '@/service/common/track';
import * as browser from '@web-clipper/chrome-promise';
import config from '@/config';
import packageJson from '@/../package.json';
import Container, { Service } from 'typedi';
import { IPermissionsService } from '@/service/common/permissions';
import { PermissionsChannel } from '@/service/permissions/common/permissionsIpc';
import { ITabService } from '@/service/common/tab';
import { IChannelServer } from '@/service/common/ipc';
import { BackgroundIPCServer } from '@/service/ipc/browser/background-main/ipcService';
import { TabChannel } from '@/service/tab/common/tabIpc';
import { ICookieService } from '@/service/common/cookie';
import { CookieChannel } from '@/service/cookie/common/cookieIpc';
import { syncStorageService, localStorageService } from '@/common/chrome/storage';
import { IPreferenceService } from '@/service/common/preference';
import '@/service/preference/browser/preferenceService';
import { autorun } from 'mobx';
import localeService from '@/locales';
Container.set(ILocaleService, localeService);
import { LOCAL_USER_PREFERENCE_LOCALE_KEY } from '@/common/types';
import { ILocalStorageService, ISyncStorageService } from '@/service/common/storage';
Container.set(ILocalStorageService, localStorageService);
Container.set(ISyncStorageService, syncStorageService);
import '@/service/request/tool/basic';
import { IBackendService } from '@/services/backend/common/backend';
import { BackendService } from '@/services/backend/common/backendService';
Service(IBackendService)(BackendService);
import '@/service/extension/browser/extensionContainer';
import '@/service/extension/browser/extensionService';
import { IExtensionContainer, IExtensionService } from '@/service/common/extension';
import '@/service/powerpackService';

const backgroundIPCServer: IChannelServer = new BackgroundIPCServer();

backgroundIPCServer.registerChannel('tab', new TabChannel(Container.get(ITabService)));

backgroundIPCServer.registerChannel(
  'permissions',
  new PermissionsChannel(Container.get(IPermissionsService))
);

backgroundIPCServer.registerChannel(
  'webRequest',
  new WebRequestChannel(Container.get(IWebRequestService))
);

backgroundIPCServer.registerChannel('cookies', new CookieChannel(Container.get(ICookieService)));
const contentScriptIPCClient = new PopupContentScriptIPCClient(Container.get(ITabService));
const contentScriptChannel = contentScriptIPCClient.getChannel('contentScript');
Container.set(IContentScriptService, new ContentScriptChannelClient(contentScriptChannel));
const contentScriptService = Container.get(IContentScriptService);

async function initContentScriptService(tabId: number) {
  let result;
  try {
    result = await contentScriptService.checkStatus();
  } catch (_error) {
    //
  }
  if (!result) {
    await browser.tabs.executeScript(
      {
        file: 'content_script.js',
      },
      tabId
    );
    if (browser.runtime.lastError) {
      if (browser.runtime.lastError.message === 'The extensions gallery cannot be scripted.') {
        alert(
          localeService.format({
            id: 'backend.not.unavailable',
            defaultMessage: 'The extensions gallery cannot be scripted.',
          })
        );
        return;
      }
      alert(
        localeService.format({
          id: 'backend.not.unavailable',
          defaultMessage:
            'Clipping of this type of page is temporarily unavailable.\n\nRefreshing the page can resolve。',
        })
      );
      return;
    }
  }
}

(async () => {
  await syncStorageService.init();
  await localStorageService.init();
  Service(IPowerpackService)(PowerpackService);
  await Container.get(IPowerpackService).startup();
  const trackService = Container.get(ITrackService);
  await trackService.init();
  const preferenceService = Container.get(IPreferenceService);
  await preferenceService.init();
  await localeService.init();

  localStorageService.onDidChangeStorage(async key => {
    if (key === LOCAL_USER_PREFERENCE_LOCALE_KEY) {
      await localeService.init();
    }
  });
  //DEBT
  chrome.commands.onCommand.addListener(async e => {
    if (e === 'toggle-feature-foo') {
      const extensionService = Container.get(IExtensionService);
      const extensionContainer = Container.get(IExtensionContainer);
      const contextMenus = extensionContainer.contextMenus;
      const currentContextMenus = contextMenus.filter(
        // eslint-disable-next-line max-nested-callbacks
        p => !extensionService.DisabledExtensionIds.includes(p.id)
      );
      for (const iterator of currentContextMenus) {
        const Factory = iterator.contextMenu;
        const instance = new Factory();
        if (iterator.id === 'contextMenus.selection.save') {
          let config: unknown;
          if (instance.manifest.extensionId) {
            config =
              extensionService.getExtensionConfig(instance.manifest.extensionId!) ||
              instance.manifest.config?.default;
          }
          instance.run((await Container.get(ITabService).getCurrent()) as any, {
            config,
            contentScriptService,
            initContentScriptService,
          });
        }
      }
    }
  });

  autorun(() => {
    const iconColor = preferenceService.userPreference.iconColor;
    if (iconColor === 'auto') {
      const media = window.matchMedia('(prefers-color-scheme: dark)');
      browser.browserAction.setIcon({ path: media.matches ? config.iconDark : config.icon });
    } else if (iconColor === 'light') {
      browser.browserAction.setIcon({ path: config.iconDark });
    } else {
      browser.browserAction.setIcon({ path: config.icon });
    }
    const extensionContainer = Container.get(IExtensionContainer);
    const extensionService = Container.get(IExtensionService);
    const contextMenus = extensionContainer.contextMenus;
    const currentContextMenus = contextMenus.filter(
      // eslint-disable-next-line max-nested-callbacks
      p => !extensionService.DisabledExtensionIds.includes(p.id)
    );
    chrome.contextMenus.removeAll(() => {
      for (const iterator of currentContextMenus) {
        const Factory = iterator.contextMenu;
        const instance = new Factory();
        if (!config.admin) {
          if (instance.manifest.admin) {
            continue;
          }
        }

        chrome.contextMenus.create({
          id: iterator.id,
          title: instance.manifest.name,
          contexts: instance.manifest.contexts,
          onclick: (_info, tab) => {
            let config: unknown;
            if (instance.manifest.extensionId) {
              config =
                extensionService.getExtensionConfig(instance.manifest.extensionId!) ||
                instance.manifest.config?.default;
            }
            instance.run(tab!, {
              config,
              contentScriptService,
              initContentScriptService,
            });
          },
        });
      }
    });
  });

  browser.browserAction.onClicked.addListener(async tab => {
    const tabId = tab.id;
    if (!tabId) {
      trackService.trackEvent('Load_Lazzzy_Extension', packageJson.version, 'error');
      alert(
        localeService.format({
          id: 'backend.not.unavailable',
          defaultMessage:
            'Clipping of this type of page is temporarily unavailable.\n\nRefreshing the page can resolve。',
        })
      );
      return;
    }
    trackService.trackEvent('Load_Lazzzy_Extension', packageJson.version, 'success');
    await initContentScriptService(tabId);
    contentScriptService.toggle();
  });
})();
