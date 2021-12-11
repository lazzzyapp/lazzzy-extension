import { ServiceMeta } from '@/backend';
import localeService from '@/locales';
import Service from './service';
import form from './form';

export default (): ServiceMeta => {
  return {
    name: localeService.format({
      id: 'backend.services.kindle.name',
      defaultMessage: 'Send to Kindle',
    }),
    icon: 'kindle',
    type: 'kindle',
    service: Service,
    form: form,
  };
};
