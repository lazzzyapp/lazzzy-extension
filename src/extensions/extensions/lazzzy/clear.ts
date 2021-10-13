import { ToolExtension } from '@/extensions/common';

export default new ToolExtension(
  {
    name: 'Clear',
    icon: 'close-circle',
    version: '0.0.1',
    description: 'Clear Content',
    apiVersion: '1.12.0',
    i18nManifest: {
      'en-US': {
        name: 'Clear Content',
        description: 'Clear current content',
      },
    },
  },
  {
    init: ({ pathname }) => {
      return pathname.startsWith('/plugin');
    },
    afterRun: () => {
      return '';
    },
  }
);
