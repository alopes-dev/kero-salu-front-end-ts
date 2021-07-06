import '@testing-library/jest-dom';
import 'jest-styled-components';

jest.setTimeout(10000);

jest.mock('next/router', () => ({
  replace: jest.fn().mockReturnValue(Promise.resolve()),
  useRouter: jest.fn().mockReturnValue({
    route: '',
    basePath: '',
    pathname: '',
    query: {},
    asPath: '',
    push: jest.fn().mockReturnValue(Promise.resolve()),
    replace: jest.fn().mockReturnValue(Promise.resolve()),
    reload: jest.fn(),
    back: jest.fn(),
    prefetch: jest.fn().mockResolvedValue(undefined),
    beforePopState: jest.fn(),
    isFallback: false,
    events: {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn(),
    },
  }),
}));

/**
 * @description Silence console.warn in jest
 */
jest.spyOn(console, 'warn').mockImplementation(jest.fn());
