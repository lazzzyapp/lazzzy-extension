import { IRequestService } from '@/service/common/request';

export interface ISiyuanClientOptions {
  request: IRequestService;
  accessToken?: string;
}

export interface ISiyuanUploadImageResponse {
  data: {
    succMap: Record<string, string>;
  };
}

export interface ISiyuanFetchNotesResponse {
  data: { files: string[] | { name: string; id: string; closed?: boolean }[] };
}
