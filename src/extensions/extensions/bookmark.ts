import { TextExtension } from '@/extensions/common';

export default new TextExtension(
  {
    name: 'Bookmark',
    version: '0.0.1',
    description: 'Add bookmark.',
    icon: 'link',
    i18nManifest: {
      'en-US': { name: 'Bookmark', description: 'Add to bookmarks' },
    },
  },
  {
    run: async context => {
      const { document, locale } = context;
      switch (locale) {
        case 'en-US': {
          return `## Link \n [${document.URL}](${document.URL}) \n ## Comment:`;
        }
        default:
          return `## Link \n [${document.URL}](${document.URL}) \n ## Comment:`;
      }
    },
  }
);
