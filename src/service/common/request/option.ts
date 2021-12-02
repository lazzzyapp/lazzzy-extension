import { IGetFormRequestOptions } from './get/form';
import { IPostRequestOptions } from './post';
import { IPostFormRequestOptions } from './post/form';
import { IPutRequestOptions } from './put';

export type TRequestOption =
  | IGetFormRequestOptions
  | IPostRequestOptions
  | IPostFormRequestOptions
  | IPutRequestOptions;
