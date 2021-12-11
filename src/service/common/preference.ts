import { Token } from 'typedi';
import { IUserPreference } from './IUserPreference';

export type TIconColor = 'dark' | 'light' | 'auto';

export interface IPreferenceService {
  userPreference: IUserPreference;
  init: () => Promise<void>;

  updateIconColor(color: TIconColor): Promise<void>;
}

export const IPreferenceService = new Token<IPreferenceService>();
