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
