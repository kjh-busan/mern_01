module.exports = {
    preset: 'ts-jest',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js', 'jest-given'],
    testEnvironment: 'node',
    transform: {
        '^.+\\.(ts|tsx)$': 'babel-jest',
        '^.+\\.(js|jsx)$': 'babel-jest',
        '^.+\\.[tj]sx?$': 'ts-jest',
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    transformIgnorePatterns: ['<rootDir>/node_modules/(?!(axios)/)'],
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    },
}
