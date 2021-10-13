import { Repository } from './../../services/interface';
import { JoplinFolderItem, JoplinTag, JoplinCreateDocumentRequest } from './types';
import { AbstractJoplinClient } from './basic';

export class LegacyJoplinClient extends AbstractJoplinClient {
  getRepositories = async () => {
    const repositories: Repository[] = [];
    const folders = await this.request.get<JoplinFolderItem[]>('folders');
    folders.forEach(folder => {
      repositories.push({
        id: folder.id,
        name: folder.title,
        groupId: folder.id,
        groupName: folder.title,
      });
      if (Array.isArray(folder.children)) {
        folder.children.forEach(subFolder => {
          repositories.push({
            id: subFolder.id,
            name: subFolder.title,
            groupId: folder.id,
            groupName: folder.title,
          });
        });
      }
    });
    return repositories;
  };

  getTags = async (filterTags: boolean) => {
    let tags = await this.request.get<JoplinTag[]>('tags');
    if (filterTags) {
      tags = (
        await Promise.all(
          tags.map(async tag => {
            console.log(this);
            const notes = await this.request.get<unknown[]>(`tags/${tag.id}/notes`);
            if (notes.length === 0) {
              return null;
            }
            return tag;
          })
        )
      ).filter((tag): tag is JoplinTag => !!tag);
    }
    return tags;
  };

  createDocument = async (data: JoplinCreateDocumentRequest) => {
    await this.request.post('notes', {
      data: {
        parent_id: data.repositoryId,
        title: data.title,
        body: data.content,
        tags: data.tags.join(','),
        source_url: data.url,
      },
    });
  };
}
