import { TextExtension } from '@/extensions/common';

export default new TextExtension(
  {
    name: 'Full Page',
    version: '0.0.1',
    description: 'Save Full Page and turn into a Markdown file.',
    icon: 'copy',
    i18nManifest: {
      'en-US': {
        name: 'Make It Markdown',
        description: 'Save Full Page and turn into a Markdown file',
      },
    },
  },
  {
    run: async context => {
      const { turndown, $ } = context;
      const $body = $('html').clone();
      $body.find('script').remove();
      $body.find('style').remove();
      $body.removeClass();
      return turndown.turndown($body.html());
    },
  }
);
