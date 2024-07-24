module.exports = {
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js', 'jest-given'],
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.(ts|tsx)$': 'babel-jest',
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    transformIgnorePatterns: ['/node_modules/'],
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    },
}
