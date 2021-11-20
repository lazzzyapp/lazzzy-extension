import { Token } from 'typedi';
import { TIconColor } from './color';
import { IUserPreference } from './user';
export interface IPreferenceService {
  userPreference: IUserPreference;
  init: () => Promise<void>;

  // eslint-disable-next-line no-unused-vars
  updateIconColor: (color: TIconColor) => Promise<void>;
}

// eslint-disable-next-line no-redeclare
export const IPreferenceService = new Token<IPreferenceService>();
