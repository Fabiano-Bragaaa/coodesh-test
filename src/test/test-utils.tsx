import { QueryClient, type QueryClientConfig, QueryClientProvider } from "@tanstack/react-query";
import {
  render,
  renderHook,
  type RenderHookOptions,
  type RenderOptions,
} from "@testing-library/react-native";
import { type ReactElement, type ReactNode } from "react";

const queryClientConfig: QueryClientConfig = {
  defaultOptions: {
    queries: { retry: false, gcTime: Infinity },
    mutations: { retry: false, gcTime: Infinity },
  },
};

type ProvidersProps = {
  children: ReactNode;
};

export function wrapperAllProviders() {
  const queryClient = new QueryClient(queryClientConfig);

  return function AllProviders({ children }: ProvidersProps) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
  };
}

function customRender(component: ReactElement, options?: Omit<RenderOptions, "wrapper">) {
  return render(component, { wrapper: wrapperAllProviders(), ...options });
}

function customRenderHook<Result, Props>(
  renderCallback: (props: Props) => Result,
  options?: Omit<RenderHookOptions<Props>, "wrapper">,
) {
  return renderHook(renderCallback, { wrapper: wrapperAllProviders(), ...options });
}

export * from "@testing-library/react-native";
export { customRender as render, customRenderHook as renderHook };
