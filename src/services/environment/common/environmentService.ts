import { IBasicRequestService, IRequestService } from '@/service/common/request';
import { ILocaleService } from '@/service/common/locale';
import { Inject, Service } from 'typedi';
import { IEnvironmentService, IEnvironmentServiceInterface } from './environment';

const privacyLocale = ['en-US'];
const changelogLocale = ['en-US'];

export class EnvironmentService implements IEnvironmentServiceInterface {
  constructor(
    @Inject(ILocaleService) private localeService: ILocaleService,
    @Inject(IBasicRequestService) private basicRequestService: IRequestService
  ) {}

  async privacy(): Promise<string> {
    let workLocale = 'en-US';
    if (privacyLocale.some(o => o === this.localeService.locale)) {
      workLocale = this.localeService.locale;
    }
    const privacyUrl = `${await this.resourceHost()}/privacy/PRIVACY.${workLocale}.md`;
    return this.basicRequestService.request(privacyUrl, { method: 'get' });
  }

  async changelog(): Promise<string> {
    let workLocale = 'en-US';
    if (changelogLocale.some(o => o === this.localeService.locale)) {
      workLocale = this.localeService.locale;
    }
    const changelogUrl = `${await this.resourceHost()}/changelog/CHANGELOG.${workLocale}.md`;
    return this.basicRequestService.request(changelogUrl, { method: 'get' });
  }

  async resourceHost(): Promise<string> {
    return 'https://resource.lazzzy.app';
  }
}

Service(IEnvironmentService)(EnvironmentService);
