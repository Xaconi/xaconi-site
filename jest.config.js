module.exports = {
    setupFilesAfterEnv: ["./jest.setup.js"],
    testMatch: [ "**/tests/*.js" ],
    moduleNameMapper: {
        '\\.(css|less)$': '<rootDir>/tests/jest/__mocks__/styleMock.js',
    }
};