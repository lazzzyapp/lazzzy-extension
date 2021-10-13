import { TextExtension } from '@/extensions/common';

export default new TextExtension(
  {
    name: 'Readability',
    icon: 'copy',
    version: '0.0.1',
    description: 'Intelligent extraction of webpage main content.',
    i18nManifest: {
      'en-US': {
        name: 'Smart Extraction',
        description: 'Intelligent extraction of current page elements',
      },
    },
  },
  {
    run: async context => {
      const { turndown, document, Readability, $ } = context;
      let documentClone = document.cloneNode(true);
      $(documentClone)
        .find('#skPlayer')
        .remove();
      let article = new Readability(documentClone, {
        keepClasses: true,
      }).parse();
      return turndown.turndown(article.content);
    },
  }
);
