import { IExtensionWithId, IContextMenusWithId } from '@/extensions/common';
import { Token } from 'typedi';

export interface Extension {
  //
}

export interface IExtensionServiceInterface {
  DefaultExtensionId: string | null;

  DisabledExtensionIds: string[];

  EnabledAutomaticExtensionIds: string[];

  getExtensionConfig: <T>(id: string) => T | undefined;

  setExtensionConfig: <T = any>(id: string, data: T) => Promise<void>;

  toggleDefault: (id: string) => Promise<void>;

  toggleDisableExtension: (id: string) => Promise<void>;

  toggleAutomaticExtension: (id: string) => Promise<void>;
}

export interface IExtensionContainerInterface {
  extensions: IExtensionWithId[];
  contextMenus: IContextMenusWithId[];
}

export const IExtensionService = new Token<IExtensionServiceInterface>();

export const IExtensionContainer = new Token<IExtensionContainerInterface>();
