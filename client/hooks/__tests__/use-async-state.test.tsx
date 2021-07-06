import { reactHooks, renderHook } from '@test-suite';

import useAsyncState, { SnackMessage } from '../use-async-state';

const { act } = reactHooks;

interface dataExample {
  name: string;
  data: string[];
}

const dataEg: dataExample = {
  name: 'this is a data example',
  data: ['this', 'is', 'a', 'data', 'example'],
};

const snackMessageExample: SnackMessage = {
  message: 'this is a snack message example',
  isError: false,
};

const errorData: Error = {
  name: 'error example',
  message: 'this is an error message example',
};

const makeSut = () => renderHook(() => useAsyncState());

describe('useAsyncState Hook', () => {
  describe('loading state', () => {
    it('returns as expected', () => {
      const { result } = makeSut();
      expect(result.current.loading).toBeFalsy();
    });

    it('sets loading to a different value, and returns it', () => {
      const { result } = makeSut();
      expect(result.current.loading).toBeFalsy();

      act(() => {
        result.current.setLoading(true);
      });
      expect(result.current.loading).toBeTruthy();

      act(() => {
        result.current.setLoading(false);
      });
      expect(result.current.loading).toBeFalsy();
    });

    it('sets loading to the same value, and returns the same value ', () => {
      const { result } = makeSut();
      expect(result.current.loading).toBeFalsy();

      act(() => {
        result.current.setLoading(true);
      });
      expect(result.current.loading).toBeTruthy();

      act(() => {
        result.current.setLoading(true);
      });
      expect(result.current.loading).toBeTruthy();
    });
  });

  describe('success state', () => {
    it('returns as expected', () => {
      const { result } = makeSut();
      expect(result.current.success).toBeFalsy();
    });

    it('sets success to a different value, and returns it', () => {
      const { result } = makeSut();
      expect(result.current.success).toBeFalsy();

      act(() => {
        result.current.setSuccess(true);
      });
      expect(result.current.success).toBeTruthy();

      act(() => {
        result.current.setSuccess(false);
      });
      expect(result.current.success).toBeFalsy();
    });

    it('sets success to the same value, and returns the same value ', () => {
      const { result } = makeSut();
      expect(result.current.success).toBeFalsy();

      act(() => {
        result.current.setSuccess(true);
      });
      expect(result.current.success).toBeTruthy();

      act(() => {
        result.current.setSuccess(true);
      });
      expect(result.current.success).toBeTruthy();
    });
  });

  describe('error state', () => {
    it('returns as expected', () => {
      const { result } = makeSut();
      expect(result.current.error).toBeNull();
    });

    it('sets the error and returns it', () => {
      const { result } = makeSut();
      expect(result.current.error).toBeNull();

      act(() => {
        result.current.setError(errorData);
      });
      expect(result.current.error).toBe(errorData);

      act(() => {
        result.current.setError(null);
      });
      expect(result.current.error).toBeNull();
    });
  });

  describe('data state', () => {
    it('renders as expected', () => {
      const { result } = renderHook(() => useAsyncState<dataExample>());
      expect(result.current.data).toBeNull();
    });

    it('sets the data and returns it', () => {
      const { result } = renderHook(() => useAsyncState<dataExample>());
      expect(result.current.data).toBeNull();

      act(() => {
        result.current.setData(dataEg);
      });
      expect(result.current.data).toBe(dataEg);

      act(() => {
        result.current.setData(null);
      });
      expect(result.current.data).toBeNull();
    });
  });

  describe('snackMessage state', () => {
    it('returns as expected', () => {
      const { result } = makeSut();
      expect(result.current.snackMessage).toBeNull();
    });

    it('sets the snackMessage and returns it', () => {
      const { result } = makeSut();
      expect(result.current.snackMessage).toBeNull();

      act(() => {
        result.current.setSnackMessage(snackMessageExample);
      });
      expect(result.current.snackMessage).toBe(snackMessageExample);

      act(() => {
        result.current.setSnackMessage(null);
      });
      expect(result.current.snackMessage).toBeNull();
    });
  });
});
