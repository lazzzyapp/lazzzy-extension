import { TextExtension } from '@/extensions/common';

export default new TextExtension(
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
    run: async context => {
      const { turndown, Highlighter, toggleLazzzy, $ } = context;
      toggleLazzzy();
      try {
        const data = await new Highlighter().start();
        const container = document.createElement('div');
        container.appendChild(
          $(data)
            .clone()
            .get(0)
        );
        return turndown.turndown(container);
      } catch (error) {
        throw error;
      } finally {
        toggleLazzzy();
      }
    },
  }
);
