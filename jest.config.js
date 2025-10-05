export default {
  transform: {
    "\\.[jt]sx?$": "babel-jest"
  },
  extensionsToTreatAsEsm: ['.json'],
  testEnvironment: 'node',
};