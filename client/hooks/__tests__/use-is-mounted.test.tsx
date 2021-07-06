import { renderHook } from '@testing-library/react-hooks';

import useIsMounted from '../use-is-mounted';

describe(`${useIsMounted.name} hook`, () => {
  it('sets the initial state as true on mount the component and set false on unmount', () => {
    const { result, unmount } = renderHook(() => useIsMounted());

    expect(result.current.current).toBe(true);
    unmount();
    expect(result.current.current).toBe(false);
  });
});
