/**
 * @jest-environment jsdom
 */
import { MockRequestService } from '@/__test__/utils';
import { RequestHelper } from '.';

describe('test RequestHelper', () => {
  it('test baseURL', () => {
    const mockRequestService = new MockRequestService(() => {
      return '';
    });
    const request = new RequestHelper({
      baseURL: 'https://api.lazzzy.app/',
      request: mockRequestService,
    });

    request.get('xcesiv');
    expect(mockRequestService.mock.request.mock.calls[0]).toEqual([
      'https://api.lazzzy.app/xcesiv',
      { method: 'get', headers: {} },
    ]);

    request.get('https://lazzzy.app');
    expect(mockRequestService.mock.request.mock.calls[1]).toEqual([
      'https://lazzzy.app/',
      { method: 'get', headers: {} },
    ]);

    request.get('http://lazzzy.app');
    expect(mockRequestService.mock.request.mock.calls[2]).toEqual([
      'http://lazzzy.app/',
      { method: 'get', headers: {} },
    ]);
  });

  it('test post put', () => {
    const mockRequestService = new MockRequestService(() => {
      return '';
    });
    const request = new RequestHelper({
      baseURL: 'https://api.lazzzy.app/',
      request: mockRequestService,
    });
    request.post('xcesiv', {
      data: { name: 'xcesiv' },
    });
    expect(mockRequestService.mock.request.mock.calls[0]).toEqual([
      'https://api.lazzzy.app/xcesiv',
      { method: 'post', requestType: 'json', data: { name: 'xcesiv' }, headers: {} },
    ]);

    const formData = new FormData();
    formData.set('name', 'xcesiv');
    request.postForm('xcesiv', {
      data: formData,
    });
    expect(mockRequestService.mock.request.mock.calls[1]).toEqual([
      'https://api.lazzzy.app/xcesiv',
      { method: 'post', requestType: 'form', data: formData, headers: {} },
    ]);

    request.put('xcesiv', {
      data: { name: 'xcesiv' },
    });
    expect(mockRequestService.mock.request.mock.calls[2]).toEqual([
      'https://api.lazzzy.app/xcesiv',
      { method: 'put', data: { name: 'xcesiv' }, headers: {} },
    ]);
  });

  it('test header', () => {
    const mockRequestService = new MockRequestService(() => {
      return '';
    });
    const request = new RequestHelper({
      baseURL: 'https://api.lazzzy.app/',
      headers: {
        token: '12345',
      },
      request: mockRequestService,
    });
    request.post('xcesiv', {
      data: { name: 'xcesiv' },
    });
    expect(mockRequestService.mock.request.mock.calls[0]).toEqual([
      'https://api.lazzzy.app/xcesiv',
      {
        method: 'post',
        requestType: 'json',
        data: { name: 'xcesiv' },
        headers: { token: '12345' },
      },
    ]);

    request.post('xcesiv', {
      data: { name: 'xcesiv' },
      headers: { token: '123456' },
    });
    expect(mockRequestService.mock.request.mock.calls[1]).toEqual([
      'https://api.lazzzy.app/xcesiv',
      {
        method: 'post',
        requestType: 'json',
        data: { name: 'xcesiv' },
        headers: { token: '123456' },
      },
    ]);
  });
});

describe('test params', () => {
  it('support overwrite params', () => {
    const mockRequestService = new MockRequestService(() => {
      return '';
    });
    const request = new RequestHelper({
      baseURL: 'https://api.lazzzy.app/',
      params: {
        token: '12345',
      },
      request: mockRequestService,
    });
    request.post('xcesiv?token=123', {
      data: { name: 'xcesiv' },
    });
    expect(mockRequestService.mock.request.mock.calls[0]).toEqual([
      'https://api.lazzzy.app/xcesiv?token=123',
      {
        method: 'post',
        requestType: 'json',
        data: { name: 'xcesiv' },
        headers: {},
      },
    ]);
  });

  it('support add params', () => {
    const mockRequestService = new MockRequestService(() => {
      return '';
    });
    const request = new RequestHelper({
      baseURL: 'https://api.lazzzy.app/',
      params: {
        token: '12345',
      },
      request: mockRequestService,
    });
    request.post('xcesiv?hello=world', {
      data: { name: 'xcesiv' },
    });
    expect(mockRequestService.mock.request.mock.calls[0]).toEqual([
      'https://api.lazzzy.app/xcesiv?hello=world&token=12345',
      {
        method: 'post',
        requestType: 'json',
        data: { name: 'xcesiv' },
        headers: {},
      },
    ]);
  });
});
