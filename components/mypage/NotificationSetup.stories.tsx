import type { Meta, StoryObj } from '@storybook/react';
import { NotificationSetup } from './NotificationSetup';

const meta: Meta<typeof NotificationSetup> = {
    title: 'MyPage/NotificationSetup',
    component: NotificationSetup,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
    argTypes: {
        onBack: { action: 'back clicked' },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};

export const WithToast: Story = {
    args: {},
    decorators: [
        (Story) => {
            // This story shows the component with toast message
            return <Story />;
        },
    ],
}; 