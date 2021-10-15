import { ToolExtension } from '@/extensions/common';

export default new ToolExtension(
  {
    name: 'Save as Markdown',
    icon: 'file-markdown',
    version: '0.0.2',
    description: 'Save as Markdown and Download.',
    apiVersion: '1.12.0',
    i18nManifest: {
      'en-US': {
        name: 'Save as Markdown',
        description: 'Convert into Markdown file and download the file.',
      },
    },
  },
  {
    init: ({ pathname }) => {
      return pathname.startsWith('/plugin');
    },
    run: ({ document }) => {
      return document.title;
    },
    afterRun: ({ createAndDownloadFile, data, result }) => {
      createAndDownloadFile(`${result || 'content'}.md`, data);
      return data;
    },
  }
);
