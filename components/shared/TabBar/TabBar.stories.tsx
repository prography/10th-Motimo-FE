// ... existing code ...
import type { Meta, StoryObj } from "@storybook/react";
import { TabBar } from "./TabBar";

const meta: Meta<typeof TabBar> = {
  title: "Shared/TabBar",
  component: TabBar,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["one", "two", "three", "four"],
    },
    className: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof TabBar>;

export const One: Story = {
  args: {
    type: "one",
  },
};

export const Two: Story = {
  args: {
    type: "two",
  },
};

export const Three: Story = {
  args: {
    type: "three",
  },
};

export const Four: Story = {
  args: {
    type: "four",
  },
};
// ... existing code ...
