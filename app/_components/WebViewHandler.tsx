"use client";

import useAuthStore from "@/stores/useAuthStore";
import { ReactNode, useEffect } from "react";
interface WebViewMessage {
  type: "TOKEN_INJECTION" | "ACK" | "ESCAPE_WEBVIEW" | "REISSUE_TOKEN";
  source: "R" | "Rn";
  payload: any;
}
const WebViewHandler = () => {
  const { setAccessToken, setRefreshToken, setIsLoggedIn } = useAuthStore();
  useEffect(() => {
    const messageHandler = (event: Event) => {
      try {
        const message = JSON.parse(
          (event as MessageEvent).data,
        ) as WebViewMessage;

        handleLogin(message, (accessToken, refreshToken) => {
          setAccessToken(accessToken);
          setRefreshToken(refreshToken);
          setIsLoggedIn(true);
        });
      } catch (e) {
        console.error("메시지 관련 에러: ", e);
      }
    };
    document.addEventListener("message", messageHandler);

    return () => {
      document.removeEventListener("message", messageHandler);
    };
  }, []);
  return <></>;
};
export default WebViewHandler;

/** Responsors */
const responseAck = () => {
  if (window.ReactNativeWebView) {
    const reportMessage: WebViewMessage = {
      source: "R",
      type: "ACK",
      payload: "SUCCESS",
    };
    window.ReactNativeWebView.postMessage(JSON.stringify(reportMessage));
  }
};
const handleLogin = (
  message: WebViewMessage,
  payloadHandler?: (accessToken: string, refreshToken: string) => void,
) => {
  if (message.payload && message.type === "TOKEN_INJECTION") {
    const { accessToken, refreshToken } = message.payload;
    //test
    // alert(`${accessToken}, ${refreshToken}`);
    if (payloadHandler) payloadHandler(accessToken, refreshToken);

    responseAck();
  }
};

/** Requestors */
const handleWebViewLogout = () => {
  if (window.ReactNativeWebView) {
    const reportMessage: WebViewMessage = {
      source: "R",
      type: "ESCAPE_WEBVIEW",
      payload: "logout",
    };
    window.ReactNativeWebView.postMessage(JSON.stringify(reportMessage));
  }
};

const handleWebViewReissueToken = (refreshToken: string) => {
  if (window.ReactNativeWebView) {
    const reportMessage: WebViewMessage = {
      source: "R",
      type: "REISSUE_TOKEN",
      payload: {
        refreshToken,
      },
    };
    window.ReactNativeWebView.postMessage(JSON.stringify(reportMessage));
  }
};

export { handleWebViewLogout, handleWebViewReissueToken };
