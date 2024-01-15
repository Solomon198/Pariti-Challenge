import { Config } from "jest";
const config: Config = {
  testEnvironment: "node",
  setupFiles: ["<rootDir>/src/test/setup.ts"],
  projects: [
    // Your Lerna project configurations...
  ],
  preset: "ts-jest",
};

export default config;
