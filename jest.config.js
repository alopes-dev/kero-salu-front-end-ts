module.exports = {
  roots: ['<rootDir>'],
  moduleFileExtensions: ['js', 'ts', 'tsx', 'json'],
  testPathIgnorePatterns: ['<rootDir>[/\\\\](node_modules|.next)[/\\\\]'],
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(ts|tsx)$'],
  transform: {
    '^.+\\.(ts|tsx)$': 'babel-jest',
  },
  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/__test__/__mocks__/fileMock.js',

    '@styles/(.*)$': '<rootDir>/client/styles/$1',
    '@styles': '<rootDir>/client/styles',
    '@components/(.*)$': '<rootDir>/client/components/$1',
    '@components': '<rootDir>/client/components',
    '@utils/(.*)$': '<rootDir>/utils/$1',
    '@utils': '<rootDir>/utils',
    "@pages/(.*)$": '<rootDir>/client/components/pages/$1',
    "@pages": '<rootDir>/client/components/pages',
    "@services/(.*)$": '<rootDir>/client/services/$1',
    "@services":'<rootDir>/client/services',
    "@contexts/(.*)$":'<rootDir>/client/contexts/$1',
    "@contexts": '<rootDir>/client/contexts',
    "@client/(.*)$":'<rootDir>/client/$1',
    "@client": '<rootDir>/client',
    "@constants/(.*)$":'<rootDir>/constants/$1',
    "@constants": '<rootDir>/constants',
    "@itypes/(.*)$":'<rootDir>/types/$1',
    "@itypes": '<rootDir>/types',
  },
  setupFilesAfterEnv: ['<rootDir>/.jest/setup.ts'],
  moduleDirectories: ['node_modules', 'modules'],
};
