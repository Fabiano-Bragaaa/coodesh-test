import mockSafeAreaContext from "react-native-safe-area-context/jest/mock";

jest.mock("react-native-safe-area-context", () => mockSafeAreaContext);

jest.mock("react-native-mmkv", () => ({
  createMMKV: jest.requireActual("react-native-mmkv/lib/createMMKV/createMockMMKV").createMockMMKV,
}));

jest.mock("../infra/supabase/supabase", () => ({
  supabase: {},
}));
