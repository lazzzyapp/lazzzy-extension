import { KeyOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.less';
import { Input, Select, Tooltip } from 'antd';
import { FormComponentProps } from '@ant-design/compatible/lib/form';
import React, { Fragment } from 'react';
import { GithubBackendServiceConfig } from './interface';
import { FormattedMessage } from 'react-intl';
import locale from '@/locales';
import { stringify } from 'qs';

interface GithubFormProps {
  verified?: boolean;
  info?: GithubBackendServiceConfig;
}

const GenerateNewTokenUrl = `https://github.com/settings/tokens/new?${stringify({
  scopes: 'repo',
  description: 'Lazzzy Extension',
})}`;

const visibilityOptions = [
  {
    label: <FormattedMessage id="backend.services.github.form.visibility.all" />,
    value: 'all',
  },
  {
    label: <FormattedMessage id="backend.services.github.form.visibility.public" />,
    value: 'public',
  },
  {
    label: <FormattedMessage id="backend.services.github.form.visibility.private" />,
    value: 'private',
  },
];

const GithubForm: React.FC<GithubFormProps & FormComponentProps> = ({
  form: { getFieldDecorator },
  info,
  verified,
}) => {
  const disabled = verified || !!info;
  let initAccessToken;
  let visibility;
  let savePath;
  if (info) {
    initAccessToken = info.accessToken;
    visibility = info.visibility;
    savePath = info.savePath;
  }
  return (
    <Fragment>
      <Form.Item label={<FormattedMessage id="backend.services.github.form.visibility" />}>
        {getFieldDecorator('visibility', {
          initialValue: visibility,
        })(
          <Select allowClear>
            {visibilityOptions.map(o => (
              <Select.Option value={o.value} key={o.value}>
                {o.label}
              </Select.Option>
            ))}
          </Select>
        )}
      </Form.Item>
      <Form.Item label="AccessToken">
        {getFieldDecorator('accessToken', {
          initialValue: initAccessToken,
          rules: [
            {
              required: true,
              message: (
                <FormattedMessage
                  id="backend.services.github.accessToken.message"
                  defaultMessage="AccessToken is required"
                />
              ),
            },
          ],
        })(
          <Input
            disabled={disabled}
            suffix={
              <Tooltip
                title={
                  <span
                    style={{
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {locale.format({
                      id: 'backend.services.github.form.GenerateNewToken',
                      defaultMessage: 'Generate new token',
                    })}
                  </span>
                }
              >
                <a
                  title="title"
                  rel="noopener noreferrer"
                  href={GenerateNewTokenUrl}
                  target={GenerateNewTokenUrl}
                >
                  <KeyOutlined />
                </a>
              </Tooltip>
            }
          />
        )}
      </Form.Item>
      <Form.Item
        label={<FormattedMessage id="backend.services.github.form.storageLocation.code.savePath" />}
      >
        {getFieldDecorator('savePath', {
          initialValue: savePath,
          rules: [
            {
              required: false,
            },
            {
              validator: (_r: unknown, value: string, callback: (message?: string) => {}) => {
                if (typeof value === 'string') {
                  if (value.startsWith('/')) {
                    return callback('backend.services.github.form.storageLocation.issue');
                  }
                }
                return callback();
              },
            },
          ],
        })(
          <Input
            placeholder={locale.format({
              id: 'backend.services.github.form.storageLocation.code.savePathPlaceHolder',
              defaultMessage: 'Only takes effect when saving to code.',
            })}
          />
        )}
      </Form.Item>
    </Fragment>
  );
};

export default GithubForm;
