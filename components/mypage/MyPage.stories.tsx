import type { Meta, StoryObj } from "@storybook/react";
import { MyPage } from "./MyPage";
import useAuthStore from "@/stores/useAuthStore";

const meta: Meta<typeof MyPage> = {
  title: "MyPage/MyPage",
  component: MyPage,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};

export const LoggedInUser: Story = {
  args: {},
  decorators: [
    (Story) => {
      // Set auth store to simulate logged in user
      if (typeof window !== "undefined") {
        useAuthStore.getState().login();
      }
      return <Story />;
    },
  ],
};

export const GuestUser: Story = {
  args: {},
  decorators: [
    (Story) => {
      // Reset auth store to simulate guest user
      if (typeof window !== "undefined") {
        useAuthStore.getState().reset();
      }
      return <Story />;
    },
  ],
};
