import { IExtensionWithId } from '@/extensions/common';

export interface ExtensionStore {
  extensions: IExtensionWithId[];
  defaultExtensionId?: string | null;
}

export const LOCAL_EXTENSIONS_DISABLED_EXTENSIONS_KEY = 'local.extensions.disabled.extensions';

export const LOCAL_EXTENSIONS_ENABLE_AUTOMATIC_EXTENSIONS_KEY =
  'local.extensions.enable.automatic.extensions';
