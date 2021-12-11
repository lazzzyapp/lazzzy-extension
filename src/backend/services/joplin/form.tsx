import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.less';
import { Input, Checkbox } from 'antd';
import { FormComponentProps } from '@ant-design/compatible/lib/form';
import React, { Fragment } from 'react';
import { JoplinBackendServiceConfig } from '../../clients/joplin';
import { FormattedMessage } from 'react-intl';

interface FormProps extends FormComponentProps {
  verified?: boolean;
  info?: JoplinBackendServiceConfig;
}

const InitForm: React.FC<FormProps> = ({ form: { getFieldDecorator }, info }) => {
  return (
    <Fragment>
      <Form.Item label="Authorization token">
        {getFieldDecorator('token', {
          initialValue: info?.token,
          rules: [
            {
              required: true,
              message: 'Authorization token is required!',
            },
          ],
        })(<Input.TextArea autoSize />)}
      </Form.Item>
      <Form.Item label={<FormattedMessage id="backend.services.joplin.filter_tags" />}>
        {getFieldDecorator('filterTags', {
          initialValue: info?.filterTags ?? false,
          valuePropName: 'checked',
        })(
          <Checkbox>
            <FormattedMessage id="backend.services.joplin.filter_unused_tags" />
          </Checkbox>
        )}
      </Form.Item>
    </Fragment>
  );
};

export default InitForm;
