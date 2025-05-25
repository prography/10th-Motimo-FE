import Test from "./Test";
import { StoryObj } from "@storybook/react";
const meta = {
  title: "Example/Test",
  component: Test,
  args: {
    children: "asdf",
  },
};
export default meta;

type Story = StoryObj<typeof meta>;
export const Primary: Story = {};
