import { LazzzyDataType } from '@/common/modelTypes/userPreference';
import {
  Repository,
  CompleteStatus,
  CreateDocumentRequest,
} from '@/backend/services/interface';

export interface LazzzyHeaderForm {
  [key: string]: string | number;
  title: string;
}

export interface LazzzyStore {
  clipperHeaderForm: LazzzyHeaderForm;
  url?: string;
  currentAccountId: string;
  repositories: Repository[];
  currentImageHostingService?: { type: string };
  currentRepository?: Repository;
  clipperData: Record<string, LazzzyDataType>;
  completeStatus?: CompleteStatus;
  createDocumentRequest?: CreateDocumentRequest;
}
