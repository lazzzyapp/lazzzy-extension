import { ToolExtension } from '@/extensions/common';

export default new ToolExtension(
  {
    name: 'Delete Element',
    icon: 'delete',
    version: '0.0.1',
    description: 'Delete selected page elements.',
    i18nManifest: {
      'en-US': { name: 'Delete Element', description: 'Delete the selected page element.' },
    },
  },
  {
    run: async context => {
      const { $, Highlighter, toggleLazzzy } = context;
      toggleLazzzy();
      const data = await new Highlighter().start();
      $(data).remove();
      toggleLazzzy();
    },
  }
);
