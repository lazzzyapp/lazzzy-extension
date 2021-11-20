import Form from './form';
import { ImageHostingServiceMeta } from '../interface';
import Service from './service';

export default (): ImageHostingServiceMeta => ({
  name: 'Imgur',
  icon: 'imgur',
  type: 'imgur',
  service: Service,
  form: Form,
  permission: {
    origins: ['https://api.imgur.com/*'],
  },
});
