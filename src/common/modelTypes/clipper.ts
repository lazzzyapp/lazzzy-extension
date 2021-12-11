import { ClipperDataType } from '@/common/modelTypes/userPreference';
import { CompleteStatus } from '@/backend/services/interface';
import { CreateDocumentRequest } from '@/backend/services/CreateDocumentRequest';
import { Repository } from '@/backend/services/Repository';

export interface ClipperHeaderForm {
  [key: string]: string | number;
  title: string;
}

export interface ClipperStore {
  clipperHeaderForm: ClipperHeaderForm;
  url?: string;
  currentAccountId: string;
  repositories: Repository[];
  currentImageHostingService?: { type: string };
  currentRepository?: Repository;
  clipperData: {
    [key: string]: ClipperDataType;
  };
  completeStatus?: CompleteStatus;
  createDocumentRequest?: CreateDocumentRequest;
}
