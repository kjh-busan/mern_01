module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    testEnvironmentOptions: {
        resources: 'usable',
    },
    transform: {
        '^.+\\.[tj]sx?$': 'ts-jest',
    },
    transformIgnorePatterns: ['<rootDir>/node_modules/(?!(axios)/)'],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
        '\\.(jpg|jpeg|png|gif|webp|svg|avif)$':
            '<rootDir>/__mocks__/fileMock.js',
    },
}
