import React, { useMemo, useEffect } from 'react';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.less';
import { Modal, Select } from 'antd';
import { FormComponentProps } from '@ant-design/compatible/lib/form';
import styles from './index.less';
import { ImageHostingServiceMeta } from '@/backend';
import { AccountPreference, UserPreferenceStore, ImageHosting } from '@/common/types';
import { FormattedMessage } from 'react-intl';
import ImageHostingSelect from '@/components/ImageHostingSelect';
import useFilterImageHostingServices from '@/hooks/useFilterImageHostingServices';
import useVerifiedAccount from '@/hooks/useVerifiedAccount';
import RepositorySelect from '@/components/RepositorySelect';
import { BUILT_IN_IMAGE_HOSTING_ID } from '@/backend/imageHosting/interface';

type PageOwnProps = {
  imageHostingServicesMeta: {
    [type: string]: ImageHostingServiceMeta;
  };
  servicesMeta: UserPreferenceStore['servicesMeta'];
  imageHosting: ImageHosting[];
  currentAccount: AccountPreference;
  visible: boolean;
  onCancel(): void;
  onEdit(oldId: string, userInfo: any, newId: string): void;
};
type PageProps = PageOwnProps & FormComponentProps;

const ModalTitle = () => (
  <div className={styles.modalTitle}>
    <FormattedMessage id="preference.accountList.addAccount" defaultMessage="Add Account" />
    <a
      title="link"
      rel="noopener noreferrer"
      href={'https://github.com/lazzzyapp/lazzzy-extension/issues'}
      target="_blank"
    >
      <QuestionCircleOutlined />
    </a>
  </div>
);

const Page: React.FC<PageProps> = ({
  visible,
  currentAccount,
  servicesMeta,
  form,
  form: { getFieldDecorator },
  onCancel,
  onEdit,
  imageHosting,
  imageHostingServicesMeta,
}) => {
  const {
    type,
    accountStatus: { verified, repositories, userInfo, id },
    verifyAccount,
    loadAccount,
    serviceForm,
    verifying,
    okText: verifyText,
  } = useVerifiedAccount({
    form,
    services: servicesMeta,
    initAccount: currentAccount,
  });

  useEffect(() => {
    verifyAccount(currentAccount);
  }, [currentAccount, verifyAccount]);

  const imageHostingWithBuiltIn = useMemo(() => {
    const res = [...imageHosting];
    const meta = imageHostingServicesMeta[type];
    if (meta?.builtIn) {
      res.push({ type, info: {}, id: BUILT_IN_IMAGE_HOSTING_ID, remark: meta.builtInRemark });
    }
    return res;
  }, [imageHosting, imageHostingServicesMeta, type]);

  const supportedImageHostingServices = useFilterImageHostingServices({
    backendServiceType: currentAccount.type,
    imageHostingServices: imageHostingWithBuiltIn,
    imageHostingServicesMap: imageHostingServicesMeta,
  });

  const okText = verifying ? (
    <FormattedMessage id="preference.accountList.verifying" defaultMessage="Verifying" />
  ) : (
    <FormattedMessage id="preference.accountList.confirm" defaultMessage="Confirm" />
  );

  return (
    <Modal
      visible={visible}
      title={<ModalTitle />}
      okText={verified ? okText : verifyText}
      okType="primary"
      okButtonProps={{
        loading: verifying,
      }}
      onCancel={onCancel}
      onOk={() => {
        if (verified) {
          onEdit(currentAccount.id, userInfo, id!);
        } else {
          loadAccount();
        }
      }}
    >
      <Form labelCol={{ span: 7, offset: 0 }} wrapperCol={{ span: 17 }}>
        <Form.Item
          label={<FormattedMessage id="preference.accountList.type" defaultMessage="Type" />}
        >
          {getFieldDecorator('type', {
            initialValue: currentAccount.type,
          })(
            <Select disabled>
              {Object.values(servicesMeta).map(o => (
                <Select.Option key={o.type} value={o.type}>
                  {o.name}
                </Select.Option>
              ))}
            </Select>
          )}
        </Form.Item>
        {serviceForm}
        <Form.Item
          label={
            <FormattedMessage
              id="preference.accountList.defaultRepository"
              defaultMessage="Default Repository"
            />
          }
        >
          {getFieldDecorator('defaultRepositoryId', {
            initialValue: currentAccount.defaultRepositoryId,
          })(
            <RepositorySelect
              disabled={!verified || verifying}
              loading={verifying}
              repositories={repositories}
            />
          )}
        </Form.Item>
        <Form.Item
          label={
            <FormattedMessage id="preference.accountList.imageHost" defaultMessage="Image Host" />
          }
        >
          {getFieldDecorator('imageHosting', {
            initialValue: currentAccount.imageHosting,
          })(
            <ImageHostingSelect
              disabled={!verified}
              supportedImageHostingServices={supportedImageHostingServices}
            ></ImageHostingSelect>
          )}
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Page;
