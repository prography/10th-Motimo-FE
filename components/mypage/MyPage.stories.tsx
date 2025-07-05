import type { Meta, StoryObj } from '@storybook/react';
import { MyPage } from './MyPage';

const meta: Meta<typeof MyPage> = {
    title: 'MyPage/MyPage',
    component: MyPage,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
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
            // Set localStorage to simulate logged in user
            if (typeof window !== 'undefined') {
                localStorage.setItem('isLoggedIn', 'true');
            }
            return <Story />;
        },
    ],
};

export const GuestUser: Story = {
    args: {},
    decorators: [
        (Story) => {
            // Clear localStorage to simulate guest user
            if (typeof window !== 'undefined') {
                localStorage.removeItem('isLoggedIn');
            }
            return <Story />;
        },
    ],
}; 