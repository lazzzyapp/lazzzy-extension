import { ToolExtension } from '@/extensions/common';

export default new ToolExtension(
  {
    name: 'Manual selection',
    icon: 'select',
    version: '0.0.1',
    description: 'Manual selection page element.',
    i18nManifest: {
      'en-US': { name: 'Manual Selection' },
    },
  },
  {
    init: ({ pathname }) => {
      if (pathname === '/') {
        return false;
      }
      return true;
    },
    run: async context => {
      const { turndown, Highlighter, toggleLazzzy } = context;
      toggleLazzzy();
      try {
        const data = await new Highlighter().start();
        return turndown.turndown(data);
      } catch (error) {
        throw error;
      } finally {
        toggleLazzzy();
      }
    },
    afterRun: context => {
      const { result, data } = context;
      return `${data}\n${result}`;
    },
  }
);
