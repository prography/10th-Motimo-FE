import type { Meta, StoryObj } from '@storybook/react';
import { TermsOfService } from './TermsOfService';

const meta: Meta<typeof TermsOfService> = {
    title: 'MyPage/TermsOfService',
    component: TermsOfService,
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

export const WithCustomContent: Story = {
    args: {},
    decorators: [
        (Story) => {
            // This story shows the component with scrollable content
            return <Story />;
        },
    ],
}; 