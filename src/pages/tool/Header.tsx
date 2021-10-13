import React, { useEffect, useRef, useMemo } from 'react';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.less';
import { Input, Button } from 'antd';
import { FormComponentProps } from '@ant-design/compatible/lib/form';
import Section from '@/components/section';
import { FormattedMessage } from 'react-intl';
import styles from './index.less';
import { useSelector, useDispatch } from 'dva';
import { GlobalStore, LazzzyHeaderForm } from '@/common/types';
import { updateLazzzyHeader, asyncCreateDocument } from '@/actions/clipper';
import { isEqual } from 'lodash';
import { ServiceMeta, Repository } from '@/common/backend';
import classNames from 'classnames';
import localeService from '@/common/locales';

type PageProps = FormComponentProps & {
  pathname: string;
  service: ServiceMeta | null;
  currentRepository?: Repository;
};

const LazzzyHeader: React.FC<PageProps> = props => {
  const {
    form: { getFieldDecorator, validateFields, getFieldsValue, setFieldsValue },
    form,
    pathname,
    service,
    currentRepository,
  } = props;
  const formValue = getFieldsValue() as LazzzyHeaderForm;
  const ref = useRef<LazzzyHeaderForm>(formValue);
  const { loading, clipperHeaderForm } = useSelector((g: GlobalStore) => {
    return {
      loading: g.loading.effects[asyncCreateDocument.started.type],
      clipperHeaderForm: g.clipper.clipperHeaderForm,
    };
  }, isEqual);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isEqual(clipperHeaderForm, ref.current)) {
      return;
    }
    setFieldsValue(clipperHeaderForm);
  }, [clipperHeaderForm, formValue, setFieldsValue]);

  useEffect(() => {
    if (isEqual(ref.current, formValue)) {
      return;
    }
    dispatch(updateLazzzyHeader(formValue));
    ref.current = formValue;
  }, [dispatch, formValue]);

  const handleSubmit = () => {
    validateFields(err => {
      if (err) {
        return;
      }
      dispatch(asyncCreateDocument.started({ pathname }));
    });
  };

  const headerForm = useMemo(() => {
    const HeaderForm = service?.headerForm;
    return HeaderForm ? <HeaderForm form={form} currentRepository={currentRepository} /> : null;
  }, [currentRepository, form, service]);

  return (
    <Section
      title={<FormattedMessage id="tool.title" defaultMessage="Title" />}
      className={classNames(styles.header, styles.section)}
    >
      <Form.Item>
        {getFieldDecorator('title', {
          rules: [
            {
              required: true,
              message: <FormattedMessage id="tool.title.required" />,
            },
          ],
        })(<Input placeholder="Please Input Title" />)}
      </Form.Item>
      {headerForm}
      <Button
        className={styles.saveButton}
        size="large"
        type="primary"
        title={
          !currentRepository
            ? localeService.format({
                id: 'tool.saveButton.noRepository',
              })
            : ''
        }
        onClick={handleSubmit}
        loading={loading}
        disabled={loading || pathname === '/' || !currentRepository}
        block
      >
        <FormattedMessage id="tool.save" defaultMessage="Save Content" />
      </Button>
    </Section>
  );
};

export default Form.create<PageProps>()(LazzzyHeader);
