const { defaults: tsjPreset } = require('ts-jest/presets')
/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
    ...tsjPreset.transform,
    // [...]
  },
}