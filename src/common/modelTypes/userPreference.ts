import { ServiceMeta, ImageHostingServiceMeta } from '@/backend';

export interface UserPreferenceStore {
  locale: string;
  imageHosting: ImageHosting[];
  liveRendering: boolean;
  iconColor: 'dark' | 'light' | 'auto';
  servicesMeta: {
    [type: string]: ServiceMeta;
  };
  imageHostingServicesMeta: {
    [type: string]: ImageHostingServiceMeta;
  };
}

/**
 * Config for data structure of graph
 */
export interface ImageHosting {
  id: string;
  type: string;
  remark?: string;
  info?: {
    [key: string]: string;
  };
}

export interface ImageClipperData {
  dataUrl: string;
  width: number;
  height: number;
}

export type ClipperDataType = string | ImageClipperData;

export const LOCAL_USER_PREFERENCE_LOCALE_KEY = 'local.userPreference.locales';

/**
 * user access token
 */
export const LOCAL_ACCESS_TOKEN_LOCALE_KEY = 'local.access.token.locales';
