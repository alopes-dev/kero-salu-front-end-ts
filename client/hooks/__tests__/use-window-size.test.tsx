import { reactHooks, renderHook } from '@test-suite';

import useWindowSize from '../use-window-size';

const { act } = reactHooks;

const makeSut = () => renderHook(() => useWindowSize());

describe('useWindowSize Hook', () => {
  it("equals the browser's default dimension", () => {
    const { result } = makeSut();
    expect(result.current.width).toBe(window.innerWidth);
    expect(result.current.height).toBe(window.innerHeight);
  });

  it("equals the browser's modified dimension", () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 320,
    });
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: 700,
    });

    const { result } = makeSut();
    expect(result.current).toEqual({ width: 320, height: 700 });

    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 768,
    });
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: 539,
    });

    act(() => {
      window.dispatchEvent(new Event('resize'));
    });
    expect(result.current).toEqual({ width: 768, height: 539 });
  });
});
