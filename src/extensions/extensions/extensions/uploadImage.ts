import { ToolExtension } from '@/extensions/common';

export default new ToolExtension(
  {
    name: 'Upload Image',
    icon: 'sync',
    version: '0.0.1',
    automatic: true,
    description: 'Upload images to image host.',
    i18nManifest: {
      'en-US': {
        name: 'Upload Image',
        description: 'Upload the pictures in the article to the image host',
      },
    },
  },
  {
    init: ({ pathname, currentImageHostingService }) =>
      pathname.startsWith('/plugins') && !!currentImageHostingService,
    afterRun: async context => {
      const { data, imageService, message } = context;
      let foo = data;
      const result = data.match(/!\[.*?\]\(http(.*?)\)/g);
      let successCount = 0;
      let failedCount = 0;
      if (result) {
        const images: string[] = result
          .map(o => {
            const temp = /!\[.*?\]\((http.*?)\)/.exec(o);
            if (temp) {
              return temp[1];
            }
            return '';
          })
          .filter(o => o && !o.startsWith('https://cdn-pri.nlark.com'));

        for (let image of images) {
          try {
            const url = await imageService!.uploadImageUrl(image);
            foo = foo.replace(image, url);
            successCount++;
          } catch (_error) {
            failedCount++;
          }
        }
      }
      message.info(`${successCount} success,${failedCount} failed.`);
      return foo;
    },
  }
);
