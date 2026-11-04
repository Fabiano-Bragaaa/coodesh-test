module.exports = {
  preset: "jest-expo",
  setupFiles: ["<rootDir>/src/test/jest-setup.ts"],
  moduleDirectories: ["node_modules", "<rootDir>/src/test"],
  moduleNameMapper: {
    "^lucide-react-native$": "<rootDir>/node_modules/lucide-react-native/dist/cjs/lucide-react-native.js",
  },
  testPathIgnorePatterns: ["/node_modules/", "/android/", "/ios/"],
  transformIgnorePatterns: [
    "node_modules/(?!(.pnpm|(jest-)?react-native|@react-native(-community)?|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|react-native-svg))",
  ],
};
