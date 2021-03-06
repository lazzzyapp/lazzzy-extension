import { ServiceMeta } from '@/backend';
import localeService from '@/locales';
import Service from './service';
import form from './form';

export default (): ServiceMeta => {
  return {
    name: localeService.format({
      id: 'backend.services.leanote.name',
      defaultMessage: 'Leanote',
    }),
    icon: 'leanote',
    type: 'leanote',
    service: Service,
    form: form,
    homePage: 'https://github.com/leanote/leanote',
  };
};
