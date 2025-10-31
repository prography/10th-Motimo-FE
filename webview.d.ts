interface ReactNativeWebView {
  postMessage(message: string): void;
}

declare global {
  interface Window {
    ReactNativeWebView: ReactNativeWebView;
  }
}

export {};
