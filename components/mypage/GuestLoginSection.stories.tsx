import type { Meta, StoryObj } from '@storybook/react';
import { GuestLoginSection } from './GuestLoginSection';

const meta: Meta<typeof GuestLoginSection> = {
    title: 'MyPage/GuestLoginSection',
    component: GuestLoginSection,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        onLogin: { action: 'login clicked' },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
}; 