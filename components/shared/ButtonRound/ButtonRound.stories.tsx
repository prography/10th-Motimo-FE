import type { Meta, StoryObj } from '@storybook/react';
import { ButtonRound } from './ButtonRound';

const meta = {
  title: 'Shared/ButtonRound',
  component: ButtonRound,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A rounded button component based on Figma design with enabled, hover, and disabled states.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: 'Button text content',
    },
    variant: {
      control: { type: 'select' },
      options: ['primary'],
      description: 'Button variant',
    },
    size: {
      control: { type: 'select' },
      options: ['default'],
      description: 'Button size',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
    onClick: {
      action: 'clicked',
      description: 'Click handler',
    },
  },
} satisfies Meta<typeof ButtonRound>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: '다음',
    variant: 'primary',
    size: 'default',
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    children: '다음',
    variant: 'primary',
    size: 'default',
    disabled: true,
  },
};

export const CustomText: Story = {
  args: {
    children: '확인',
    variant: 'primary',
    size: 'default',
    disabled: false,
  },
};

export const LongText: Story = {
  args: {
    children: '완료하기',
    variant: 'primary',
    size: 'default',
    disabled: false,
  },
}; 