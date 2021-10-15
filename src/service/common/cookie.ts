import { Token } from 'typedi';

export interface ICookieServiceInterface {
  get: (details: chrome.cookies.Details) => Promise<chrome.cookies.Cookie | null>;
  getAll: (details: chrome.cookies.GetAllDetails) => Promise<chrome.cookies.Cookie[]>;
  getAllCookieStores: () => Promise<chrome.cookies.CookieStore[]>;
}

export const ICookieService = new Token<ICookieServiceInterface>();
