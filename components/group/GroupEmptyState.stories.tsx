import type { Meta, StoryObj } from "@storybook/react";
import { GroupEmptyState } from "./GroupEmptyState";

const meta: Meta<typeof GroupEmptyState> = {
  title: "Group/GroupEmptyState",
  component: GroupEmptyState,
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

export const WithCustomClassName: Story = {
  args: {
    className: "bg-Color-gray-10",
  },
};
