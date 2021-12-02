import { Token } from 'typedi';
export interface IEnvironmentServiceInterface {
  privacy: () => Promise<string>;
  changelog: () => Promise<string>;
}

export const IEnvironmentService = new Token<IEnvironmentServiceInterface>();
