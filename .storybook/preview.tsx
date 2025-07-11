import React from "react";
import type { Preview } from "@storybook/react";
import "../app/globals.css";
import "./storybook-fonts.css";
import {
  Title,
  Subtitle,
  Description,
  Primary,
  Controls,
  Stories,
} from "@storybook/blocks";

// Mock Next.js router functions
const mockRouterFunctions = {
  push: (url: string) => {
    console.log("Router.push called with:", url);
  },
  replace: (url: string) => {
    console.log("Router.replace called with:", url);
  },
  back: () => {
    console.log("Router.back called");
  },
  forward: () => {
    console.log("Router.forward called");
  },
  refresh: () => {
    console.log("Router.refresh called");
  },
  prefetch: (url: string) => {
    console.log("Router.prefetch called with:", url);
  },
};

const preview: Preview = {
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Story />
      </div>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    nextRouter: {
      Provider: ({ children }: { children: React.ReactNode }) => children,
      push: mockRouterFunctions.push,
      replace: mockRouterFunctions.replace,
      back: mockRouterFunctions.back,
      forward: mockRouterFunctions.forward,
      refresh: mockRouterFunctions.refresh,
      prefetch: mockRouterFunctions.prefetch,
      pathname: "/",
      route: "/",
      query: {},
      asPath: "/",
      basePath: "",
      isReady: true,
      isFallback: false,
      isPreview: false,
      isLocaleDomain: false,
      reload: () => console.log("Router.reload called"),
      beforePopState: () => console.log("Router.beforePopState called"),
      events: {
        on: () => console.log("Router.events.on called"),
        off: () => console.log("Router.events.off called"),
        emit: () => console.log("Router.events.emit called"),
      },
    },
    docs: {
      page: () => (
        <>
          <Title />
          <Description /> {/* component description이 여기 표시 */}
          <p>----</p>
          <Primary />
          <Controls />
          <p>EX</p>
          <Stories />
          <Subtitle /> {/* story description이 여기 표시 */}
        </>
      ),
    },
  },
};

export default preview;
