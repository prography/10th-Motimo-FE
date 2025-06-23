import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { SegmentedControl } from "./SegmentedControl";

const meta: Meta<typeof SegmentedControl> = {
  title: "Shared/SegmentedControl",
  component: SegmentedControl,
  tags: ["autodocs"],
  argTypes: {
    options: { control: "object" },
    selectedValue: { control: "text" },
    className: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof SegmentedControl>;

// Template for interactive stories
const InteractiveTemplate = (args: any) => {
  const [selectedValue, setSelectedValue] = useState(args.selectedValue);
  
  return (
    <SegmentedControl
      {...args}
      selectedValue={selectedValue}
      onChange={setSelectedValue}
    />
  );
};

export const Default: Story = {
  render: InteractiveTemplate,
  args: {
    options: [
      { label: "개월 수로 설정", value: "months" },
      { label: "완료 날짜로 설정", value: "date" },
    ],
    selectedValue: "months",
  },
};

export const DateSelected: Story = {
  render: InteractiveTemplate,
  args: {
    options: [
      { label: "개월 수로 설정", value: "months" },
      { label: "완료 날짜로 설정", value: "date" },
    ],
    selectedValue: "date",
  },
};

export const CustomOptions: Story = {
  render: InteractiveTemplate,
  args: {
    options: [
      { label: "옵션 1", value: "option1" },
      { label: "옵션 2", value: "option2" },
    ],
    selectedValue: "option1",
  },
};

export const ThreeOptions: Story = {
  render: InteractiveTemplate,
  args: {
    options: [
      { label: "첫 번째", value: "first" },
      { label: "두 번째", value: "second" },
      { label: "세 번째", value: "third" },
    ],
    selectedValue: "first",
  },
}; 