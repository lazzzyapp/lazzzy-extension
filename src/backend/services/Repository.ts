export interface Repository {
  /**
   * Repository ID
   */
  id: string;
  /**
   * Repository Name
   */
  name: string;
  /**
   * Group ID
   */
  groupId: string;
  /**
   * Group Name
   */
  groupName: string;
  disabled?: boolean;
}
