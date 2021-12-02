import { Repository } from '../interface';

export interface NotionUserContent {
  recordMap: {
    notion_user: Record<
      string,
      {
        role: string;
        value: {
          id: string;
          email: string;
          given_name: string;
          family_name: string;
          profile_photo: string;
        };
      }
    >;
    space: Record<
      string,
      {
        role: string;
        value: {
          id: string;
          name: string;
          domain: string;
          pages: string[];
        };
      }
    >;
    block: Record<
      string,
      {
        role: string;
        value: {
          id: string;
          version: string;
          parent_id: string;
          type: string;
          created_time: number;
          properties: {
            title: string[][];
            content: string[];
          };
          collection_id: string;
        };
      }
    >;
    collection: Record<
      string,
      {
        role: string;
        value: {
          id: string;
          version: string;
          parent_id: string;
          name: string[][];
        };
      }
    >;
  };
}

export interface NotionRepository extends Repository {
  pageType: string;
}
