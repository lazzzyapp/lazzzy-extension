import React from 'react';
import { UserPreferenceStore } from '@/common/types';
import { FormComponentProps } from '@ant-design/compatible/lib/form';
import { omit, isEqual } from 'lodash';
import { FormattedMessage } from 'react-intl';
import { message } from 'antd';
import { useFetch } from '@shihengtech/hooks';

type UseVerifiedAccountProps = FormComponentProps & {
  services: UserPreferenceStore['servicesMeta'];
  initAccount?: any;
};

// eslint-disable-next-line no-implicit-globals
function useDeepCompareMemoize<T>(value: T) {
  const ref = React.useRef<T>();
  if (!isEqual(value, ref.current)) {
    ref.current = value;
  }
  return ref.current;
}

const useVerifiedAccount = ({ form, services, initAccount }: UseVerifiedAccountProps) => {
  const [type, _setType] = React.useState<string>(
    initAccount ? initAccount.type : Object.values(services)[0].type
  );
  const service = services[type];
  const changeType = (type: string) => {
    _setType(type);
    const values = form.getFieldsValue();
    form.resetFields(Object.keys(omit(values, ['type'])));
  };
  const { data, run, loading } = useFetch(
    async (info: any) => {
      const Service = service.service;
      const instance = new Service(info);
      const userInfo = await instance.getUserInfo();
      const repositories = await instance.getRepositories();
      const id = await instance.getId();
      return { userInfo, repositories, id };
    },
    [service],
    {
      auto: false,
      onError: e => {
        message.error(e.message);
      },
    }
  );

  const loadAccount = React.useCallback(() => {
    form.validateFields((error: any, values: any) => {
      if (error) {
        return;
      }
      const { type, defaultRepositoryId, imageHosting, ...info } = values;
      run(info);
    });
  }, [form, run]);

  const accountStatus = {
    repositories: data?.repositories ?? [],
    userInfo: data?.userInfo ?? null,
    verified: !!data && !loading,
    id: data?.id ?? null,
  };

  const serviceForm = React.useMemo(() => {
    if (!service.form) {
      return null;
    }
    return (
      <service.form
        form={form}
        verified={accountStatus.verified}
        info={initAccount}
        loadAccount={loadAccount}
      />
    );
  }, [accountStatus.verified, form, initAccount, loadAccount, service.form]);

  const okText = React.useMemo(() => {
    if (loading) {
      return <FormattedMessage id="preference.accountList.verifying" defaultMessage="Verifying" />;
    }
    return accountStatus.verified ? (
      <FormattedMessage id="preference.accountList.add" defaultMessage="Add" />
    ) : (
      <FormattedMessage id="preference.accountList.verify" defaultMessage="Verify" />
    );
  }, [accountStatus.verified, loading]);

  const oauthLink = React.useMemo(() => {
    if (!service.oauthUrl) {
      return service.oauthUrl ? (
        <a title="Login" href={service.oauthUrl} target="_blank">
          <FormattedMessage id="preference.accountList.login" defaultMessage="Login" />
        </a>
      ) : null;
    }
    return null;
  }, [service.oauthUrl]);

  const _formInfo = React.useMemo(() => {
    const values = form.getFieldsValue();
    const { defaultRepositoryId, type: curT, imageHosting, ...info } = values;
    if (type !== curT) {
      return null;
    }
    return info;
  }, [form, type]);

  const formInfo = useDeepCompareMemoize(_formInfo);
  const verifiedRef = React.useRef(accountStatus.verified);
  verifiedRef.current = accountStatus.verified;

  React.useEffect(() => {
    if (!verifiedRef.current || !formInfo) {
      return;
    }
    run(formInfo);
  }, [verifiedRef, formInfo, run]);

  return {
    type,
    service,
    accountStatus: accountStatus,
    verifying: loading,
    verifyAccount: run,
    loadAccount,
    changeType,
    serviceForm,
    okText,
    oauthLink,
  };
};
export default useVerifiedAccount;
