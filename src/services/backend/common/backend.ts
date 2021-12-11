import { PowerpackUserInfo } from '@/service/common/powerpack';
import { Token } from 'typedi';

export interface IBackendService {
  refreshToken(): Promise<string>;
  sendEmail(data: PostMailRequestBody): Promise<void>;
  fetchRemoteConfig(): Promise<LazzzyAppRemoteConfig>;
  getUserInfo(): Promise<PowerpackUserInfo>;
  ocr(data: OCRRequestBody): Promise<string>;
  sentToKindle(data: SendToKindleRequestBody): Promise<void>;
}

export const IBackendService = new Token<IBackendService>();

export interface LazzzyAppRemoteConfig {
  yuque_oauth: {
    clientId: string;
    callback: string;
    scope: string;
  };
}

export interface PostMailRequestBody {
  to: string;
  subject: string;
  html?: string;
  text?: string;
}

export interface SendToKindleRequestBody {
  to: string;
  title: string;
  content: string;
}

export interface OCRRequestBody {
  image: string;
  language_type: 'ENG' | 'JAP' | 'GER';
}
