import type { Meta, StoryObj } from "@storybook/react";
import { BottomTabBar } from "./BottomTabBar";

const meta: Meta<typeof BottomTabBar> = {
  title: "Shared/BottomTabBar",
  component: BottomTabBar,
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
type Story = StoryObj<typeof BottomTabBar>;

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