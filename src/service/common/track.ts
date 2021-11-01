import { Token } from 'typedi';

export type TrackEventCategory = 'Load_Web_Lazzzy' | 'Open_Page';

export interface ITrackService {
  enable: boolean;
  init: () => void;
  toggle: () => void;
  trackEvent: (category: TrackEventCategory, action: string, label?: string) => void;
}

export const ITrackService = new Token<ITrackService>();
