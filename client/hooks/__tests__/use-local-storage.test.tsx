import { reactHooks, renderHook } from '@test-suite';

import { tryParse } from '../../utils';
import useLocalStorage from '../use-local-storage';

const { act } = reactHooks;

const key = 'mochiTheme';
const value = 'black';
const newValue = 'orange in the new black';

describe('useLocalStorage Hook', () => {
  beforeEach(() => {
    localStorage.removeItem(key);
  });

  it('returns undefined if no value is found from the key', () => {
    const { result } = renderHook(() => useLocalStorage(key));

    expect(result.current[0]).toBeUndefined();
    expect(tryParse(localStorage.getItem(key))).toBeNull();
  });

  it('saves the default value if passed', () => {
    const { result } = renderHook(() => useLocalStorage(key, value));

    expect(result.current[0]).toBeUndefined();
    expect(tryParse(localStorage.getItem(key))).toEqual(value);
  });

  it('removes the value', () => {
    const { result } = renderHook(() => useLocalStorage(key, value));
    expect(result.current[0]).toBeUndefined();
    expect(tryParse(localStorage.getItem(key))).toEqual(value);

    act(() => {
      // removes the value from the stored key
      result.current[2]();
    });

    expect(result.current[0]).toBeUndefined();
    expect(tryParse(localStorage.getItem(key))).toBeNull();
  });

  it('sets new value and returns it, without the default value', async () => {
    const { result } = renderHook(() => useLocalStorage(key));
    expect(result.current[0]).toBeUndefined();
    expect(tryParse(localStorage.getItem(key)!)).toBeNull();

    act(() => {
      // sets a new value
      result.current[1](newValue);
    });

    expect(result.current[0]).toBeUndefined();
    expect(tryParse(localStorage.getItem(key))).toEqual(newValue);
  });

  it('sets new value even if a default value is passed', () => {
    const { result } = renderHook(() => useLocalStorage(key, value));
    expect(result.current[0]).toBeUndefined();
    expect(tryParse(localStorage.getItem(key))).toBe(value);

    act(() => {
      // sets a new value
      result.current[1](newValue);
    });

    expect(result.current[0]).toBeUndefined();
    expect(tryParse(localStorage.getItem(key)!)).toEqual(newValue);
  });

  it('it ignores the default value if there is something in the local storage', () => {
    localStorage.setItem(key, JSON.stringify('value'));

    const { result } = renderHook(() => useLocalStorage(key, value));
    expect(result.current[0]).toEqual('value');
    expect(tryParse(localStorage.getItem(key))).toEqual('value');
  });
});
