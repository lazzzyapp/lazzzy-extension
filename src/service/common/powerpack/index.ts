/* eslint-disable no-redeclare */
import { Token } from 'typedi';
import { PowerpackUserInfo } from './user';

export interface IPowerpackService {
  userInfo: PowerpackUserInfo | null;
  accessToken?: string;
  bought: boolean;
  expired: boolean;

  startup: () => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
  login: (token: string) => Promise<void>;
}

export const IPowerpackService = new Token<IPowerpackService>();
