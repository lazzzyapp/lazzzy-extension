import { LazzzyDataType } from '@/common/modelTypes/userPreference';
import {
  Repository,
  CompleteStatus,
  CreateDocumentRequest,
} from '@/common/backend/services/interface';

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
  clipperData: {
    [key: string]: LazzzyDataType;
  };
  completeStatus?: CompleteStatus;
  createDocumentRequest?: CreateDocumentRequest;
}
