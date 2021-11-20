/* eslint-disable no-unused-vars */
import { ImageHosting } from 'common/types';
export interface PreferenceStorage {
  imageHosting: ImageHosting[];
  defaultPluginId?: string | null;
  showLineNumber: boolean;
  liveRendering: boolean;
  iconColor: 'dark' | 'light' | 'auto';
}

export interface CommonStorage {
  set: (key: string, value: any) => void | Promise<void>;
  get: <T>(key: string) => Promise<T | undefined>;
}

export interface TypedCommonStorageInterface {
  getPreference: () => Promise<PreferenceStorage>;

  setDefaultPluginId: (id: string | null) => Promise<void>;

  getDefaultPluginId: () => Promise<string | undefined | null>;

  setShowLineNumber: (value: boolean) => Promise<void>;

  getShowLineNumber: () => Promise<boolean>;

  setLiveRendering: (value: boolean) => Promise<void>;

  getLiveRendering: () => Promise<boolean>;

  setIconColor: (value: string) => Promise<void>;

  getIconColor: () => Promise<string>;

  addImageHosting: (imageHosting: ImageHosting) => Promise<ImageHosting[]>;

  getImageHosting: () => Promise<ImageHosting[]>;

  deleteImageHostingById: (id: string) => Promise<ImageHosting[]>;

  editImageHostingById: (id: string, value: ImageHosting) => Promise<ImageHosting[]>;
}
