import { Token } from 'typedi';

export type TrackEventCategory =
  | 'Load_Lazzzy_Extension' /** Load the plug-in and record it each time it is initialized. */
  | 'Open_Page'; /** Open the page */

export interface ITrackService {
  enable: boolean;
  init(): void;
  toggle(): void;
  trackEvent(category: TrackEventCategory, action: string, label?: string): void;
}

export const ITrackService = new Token<ITrackService>();
