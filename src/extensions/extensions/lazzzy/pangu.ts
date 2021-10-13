import { ToolExtension } from '@/extensions/common';
import { SelectAreaPosition } from '@web-clipper/area-selector';

export default new ToolExtension<SelectAreaPosition>(
  {
    name: 'Pangu',
    icon: 'pangu',
    version: '0.0.2',
    automatic: true,
    apiVersion: '1.13.0',
    description: 'Paranoid text spacing in JavaScript',
    powerpack: false,
    i18nManifest: {
      'en-US': {
        name: 'Pangu',
        description:
          'Insert blanks between all Chinese characters and half-shaped English, numbers, and symbols.',
      },
    },
  },
  {
    afterRun: async context => {
      const { pangu, data } = context;
      return pangu(data);
    },
  }
);
