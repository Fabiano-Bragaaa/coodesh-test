import mockSafeAreaContext from "react-native-safe-area-context/jest/mock";

jest.mock("react-native-safe-area-context", () => mockSafeAreaContext);

jest.mock("react-native-worklets", () => require("react-native-worklets/lib/module/mock"));

jest.mock("react-native-reanimated", () => require("react-native-reanimated/mock"));

jest.mock("react-native-mmkv", () => ({
  createMMKV: jest.requireActual("react-native-mmkv/lib/createMMKV/createMockMMKV").createMockMMKV,
}));

jest.mock("expo-audio", () => ({
  setAudioModeAsync: jest.fn(),
  useAudioPlayer: jest.fn(),
  useAudioPlayerStatus: jest.fn(),
}));

jest.mock("expo-speech", () => ({
  speak: jest.fn(),
  stop: jest.fn(),
}));

jest.mock("../infra/supabase/supabase", () => ({
  supabase: {},
}));
