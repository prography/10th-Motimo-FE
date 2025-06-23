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
      options: ["1", "2", "3", "4"],
    },
    className: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof TabBar>;

export const Type1: Story = {
  args: {
    type: "1",
  },
};

export const Type2: Story = {
  args: {
    type: "2",
  },
};

export const Type3: Story = {
  args: {
    type: "3",
  },
};

export const Type4: Story = {
  args: {
    type: "4",
  },
};
// ... existing code ...
