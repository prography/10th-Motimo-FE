import type { Meta, StoryObj } from "@storybook/react";
import { FeedPage } from "./FeedPage";

const meta = {
  title: "Feed/FeedPage",
  component: FeedPage,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    onNotificationClick: { action: "notification clicked" },
  },
} satisfies Meta<typeof FeedPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithNotificationHandler: Story = {
  args: {
    onNotificationClick: () => {
      console.log("Notification bell clicked!");
    },
  },
};