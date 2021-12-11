import { ServiceMeta } from '@/backend';
import localeService from '@/locales';
import Service from './service';
import form from './form';

export default (): ServiceMeta => {
  return {
    name: localeService.format({
      id: 'backend.services.mail.name',
    }),
    icon: 'mail',
    type: 'mail',
    service: Service,
    form: form,
  };
};
