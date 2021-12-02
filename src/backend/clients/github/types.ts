import { IRequestService } from '@/service/common/request/service';

export interface IGithubClientOptions {
  token: string;
  request: IRequestService;
}
export interface ICreateIssueOptions {
  title: string;
  body: string;
  labels: string[];
  namespace: string;
}

export interface ICreateIssueResponse {
  html_url: string;
  id: number;
}

export interface IGithubUserInfoResponse {
  login: string;
  avatar_url: string;
  name: string;
  bio: string;
  html_url: string;
}

export interface IUploadFileOptions {
  owner: string;
  repo: string;
  path: string;
  message: string;
  content: string;
  branch?: string;
}

export interface IUploadFileResponse {
  content: {
    html_url: string;
  };
}

export interface IPageQuery {
  per_page: number;
  page: number;
}
export interface IListBranchesOptions extends IPageQuery {
  owner: string;
  repo: string;
  protected: boolean;
}

export interface IBranch {
  name: string;
  protected: boolean;
}

export type TOmitPage<T> = Omit<T, 'page' | 'per_page'>;

// eslint-disable-next-line no-unused-vars
export type TPageRequest<O extends IPageQuery, R> = (option: O) => Promise<R[]>;

export interface IGetGithubRepositoryOptions extends IPageQuery {
  visibility?: 'all' | 'public' | 'private';
  affiliation?: 'owner' | 'collaborator' | 'organization_member';
  type?: 'all' | 'owner' | 'public' | 'private' | 'member';
}

export interface IRepository {
  name: string;
  /**
   *like lazzzyapp/lazzzy-extension
   */
  full_name: string;
  default_branch: string;
}
