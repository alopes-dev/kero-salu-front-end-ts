import { act, renderHook } from '@test-suite';

import useNotification from '../use-notification';

jest.mock('../../../pages/api/admin/websocket/auth-token', () => ({
  __esModule: true,
  default: jest
    .fn()
    .mockReturnValueOnce({
      capability: 'random-string',
      clientId: 'random-string',
      keyName: 'random-string',
      mac: 'random-string',
      nonce: 'random-string',
      timestamp: 11,
      ttl: 11,
    })
    .mockReturnValueOnce({
      capability: 'random-string',
      clientId: 'random-string-2',
      keyName: 'random-string',
      mac: 'random-string',
      nonce: 'random-string',
      timestamp: 11,
      ttl: 11,
    }),
}));

const mockUseNotificationCallback = jest.fn();
const mockUseNotificationCallback2 = jest.fn();
const mockPublish = jest.fn();
const mockUnsubscribe = jest.fn();

jest.mock('ably/promises', () => ({
  ...jest.requireActual<Record<string, unknown>>('ably/promises'),

  Realtime: jest.fn().mockImplementation(() => ({
    channels: {
      get: jest.fn().mockImplementation(() => ({
        subscribe: (eventOrCallback: () => void) => eventOrCallback(),
        publish: mockPublish,
        unsubscribe: mockUnsubscribe,
      })),
    },
  })),
}));

describe('useNotification', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('subscribes to messages on mounting, and unsubscribes on umounting', () => {
    const { unmount } = renderHook(() => useNotification('example', mockUseNotificationCallback));
    const { result } = renderHook(() => useNotification('example', mockUseNotificationCallback2));

    // if the callbacks are being called,
    // it's because the subscription is working
    expect(mockUseNotificationCallback).toBeCalledTimes(1);
    expect(mockUseNotificationCallback2).toBeCalledTimes(1);

    act(() => {
      result.current.channel.publish('r', 'r');
    });
    expect(mockPublish).toBeCalledTimes(1);

    unmount();
    expect(mockUnsubscribe).toBeCalledTimes(1);
  });

  it('publishes different types of data', () => {
    const { result } = renderHook(() => useNotification('example', mockUseNotificationCallback));

    expect(mockUseNotificationCallback).toBeCalledTimes(1);

    // Publishes the first message
    act(() => {
      result.current.channel.publish('r', { userName: 'Met Care' });
    });
    expect(mockPublish).toBeCalledTimes(1);
    expect(mockPublish).toBeCalledWith('r', { userName: 'Met Care' });

    // Publishes the second message
    act(() => {
      result.current.channel.publish('chatMessage', 'Anderson Lando');
    });
    expect(mockPublish).toBeCalledTimes(2);
    expect(mockPublish).toBeCalledWith('chatMessage', 'Anderson Lando');

    // Publishes the third message
    act(() => {
      result.current.channel.publish('testUndefined', undefined);
    });
    expect(mockPublish).toBeCalledTimes(3);
    expect(mockPublish).toBeCalledWith('testUndefined', undefined);

    // Publishes the fourth message
    act(() => {
      result.current.channel.publish('testBoolean', true);
    });
    expect(mockPublish).toBeCalledTimes(4);
    expect(mockPublish).toBeCalledWith('testBoolean', true);
  });
});
