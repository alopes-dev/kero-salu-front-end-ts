import { reactHooks, renderHook } from '@test-suite';
import * as SWR from 'swr';
import { v4 as uuidv4 } from 'uuid';

import useApi from '../use-api';

const { act } = reactHooks;
const defaultFetcher = jest.fn();

interface UseAPIResponse {
  loading: boolean;
  error?: Error;
  data?: object;
  response: object;
  mutate: Function;
  isValidating: boolean;
}

const defaultProps = {
  id: uuidv4(),
  fetcherParams: {},
  config: {
    revalidateOnFocus: false,
    revalidateOnMount: true,
    revalidateOnReconnect: false,
    dedupingInterval: 0,
  },
};

const makeSut = (fetcher: (_params?: unknown) => Promise<unknown> = defaultFetcher) =>
  renderHook(() => useApi({ ...defaultProps, fetcher: fetcher as any }));

describe(useApi.name, () => {
  const data = { name: 'use-api-test' };
  const response = {
    status: 200,
    data,
  };

  beforeEach(() => {
    SWR.cache.clear();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('calls useSwr with currect params', async () => {
    jest.spyOn(SWR, 'default');

    const mockFetcher = jest.fn().mockReturnValue(response);

    await act(async () => {
      makeSut(mockFetcher);
    });

    expect(SWR.default).toHaveBeenCalledWith(
      defaultProps.id,
      expect.any(Function),
      defaultProps.config
    );

    expect(mockFetcher).toHaveBeenCalledTimes(1);
    expect(mockFetcher).toHaveBeenCalledWith(defaultProps.fetcherParams);
  });

  test('returns proper value if everything is ok', async () => {
    const mockFetcher = jest.fn().mockReturnValue(response);

    let responseData: UseAPIResponse | undefined;

    await act(async () => {
      const { result, waitForNextUpdate } = makeSut(mockFetcher);
      await waitForNextUpdate();

      responseData = result.current as any;
    });

    expect(responseData).toBeDefined();
    expect(responseData?.loading).toBeFalsy();
    expect(responseData?.data).toEqual(data);
    expect(responseData?.error).toBeUndefined();
    expect(responseData?.isValidating).toBeFalsy();
    expect(responseData?.mutate).toEqual(expect.any(Function));
    expect(responseData?.response).toEqual(response);
  });

  test('returns loading=true if no data and no error', async () => {
    const mockFetcher = jest.fn();

    let responseData: UseAPIResponse | undefined;

    await act(async () => {
      const { result, waitForNextUpdate } = makeSut(mockFetcher);
      await waitForNextUpdate();

      responseData = result.current as any;
    });

    expect(responseData?.loading).toBeTruthy();
    expect(responseData?.data).toBeUndefined();
    expect(responseData?.error).toBeUndefined();
  });

  test('returns error if an error is thrown by fetcher', async () => {
    const error = new Error('something went wrong');
    const mockFetcher = jest.fn().mockRejectedValue(error);

    let responseData: UseAPIResponse | undefined;

    await act(async () => {
      const { result, waitForNextUpdate } = makeSut(mockFetcher);
      await waitForNextUpdate();

      responseData = result.current as any;
    });

    expect(responseData?.error).toEqual(error);
  });
});
