import { TextExtension } from '@/extensions/common';
import { SelectAreaPosition } from '@web-clipper/area-selector';

export default new TextExtension<SelectAreaPosition>(
  {
    name: 'Screenshots',
    icon: 'picture',
    version: '0.0.1',
    i18nManifest: {
      'en-US': { name: 'Screenshot' },
    },
  },
  {
    init: ({ currentImageHostingService }) => !!currentImageHostingService,
    run: async context => {
      const { AreaSelector, toggleLazzzy, toggleLoading } = context;
      toggleLazzzy();
      const response = await new AreaSelector().start();
      toggleLoading();
      return response;
    },
    afterRun: async context => {
      const { result, loadImage, captureVisibleTab, imageService } = context;
      const base64Capture = await captureVisibleTab();
      const img = await loadImage(base64Capture);
      const canvas: HTMLCanvasElement = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      let sx;
      let sy;
      let sheight;
      let swidth;
      const {
        rightBottom: { clientX: rightBottomX, clientY: rightBottomY },
        leftTop: { clientX: leftTopX, clientY: leftTopY },
      } = result;
      if (rightBottomX === leftTopX && rightBottomY === leftTopY) {
        sx = 0;
        sy = 0;
        swidth = img.width;
        sheight = img.height;
      } else {
        const dpi = window.devicePixelRatio;
        sx = leftTopX * dpi;
        sy = leftTopY * dpi;
        swidth = (rightBottomX - leftTopX) * dpi;
        sheight = (rightBottomY - leftTopY) * dpi;
      }
      canvas.height = sheight;
      canvas.width = swidth;
      ctx!.drawImage(img, sx, sy, swidth, sheight, 0, 0, swidth, sheight);
      const url = await imageService!.uploadImage({
        data: canvas.toDataURL(),
      });
      return `![](${url})\n\n`;
    },
    destroy: async context => {
      const { toggleLazzzy, toggleLoading } = context;
      toggleLoading();
      toggleLazzzy();
    },
  }
);