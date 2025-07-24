import type { Meta, StoryObj } from "@storybook/react";
import { AppBar } from "./AppBar";

const meta: Meta<typeof AppBar> = {
  title: "Shared/AppBar",
  component: AppBar,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["main", "back", "progress"],
    },
    title: { control: "text" },
    points: { control: "text" },
    progress: { 
      control: { type: "range", min: 0, max: 100, step: 1 }
    },
    className: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof AppBar>;

export const Main: Story = {
  args: {
    type: "main",
    points: "1,000P",
  },
};

export const MainWithNotification: Story = {
  args: {
    type: "main",
    points: "1,000P",
  },
};

export const Back: Story = {
  args: {
    type: "back",
    title: "투두 추가",
  },
};

export const Progress: Story = {
  args: {
    type: "progress",
    progress: 50,
  },
};

export const ProgressComplete: Story = {
  args: {
    type: "progress",
    progress: 100,
  },
}; 