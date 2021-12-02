import { localStorageService, syncStorageService } from '@/common/chrome/storage';
import { ILocalStorageService, ISyncStorageService } from '@/service/common/storage';
import 'regenerator-runtime/runtime';
import 'reflect-metadata';
import Container from 'typedi';
import { ILocaleService } from '@/service/common/locale';
Container.set(ILocalStorageService, localStorageService);
Container.set(ISyncStorageService, syncStorageService);
import { IChannelServer } from '@/service/common/ipc';
import { ContentScriptChannel } from '@/service/contentScript/common/contentScriptIPC';
import localeService from '@/common/locales';
Container.set(ILocaleService, localeService);
import '@/service/extension/browser/extensionContainer';
import { IContentScriptService } from '@/service/common/contentScript';
import '@/service/contentScript/browser/contentScript/contentScript';
import { ContentScriptIPCServer } from '@/service/ipc/browser/contentScript/contentScriptIPCServer';

const backgroundIPCServer: IChannelServer = new ContentScriptIPCServer();
backgroundIPCServer.registerChannel(
  'contentScript',
  new ContentScriptChannel(Container.get(IContentScriptService))
);

localeService.init();
