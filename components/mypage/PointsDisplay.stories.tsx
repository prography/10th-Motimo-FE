import type { Meta, StoryObj } from '@storybook/react';
import { PointsDisplay } from './PointsDisplay';

const meta: Meta<typeof PointsDisplay> = {
    title: 'MyPage/PointsDisplay',
    component: PointsDisplay,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        points: 1000,
    },
};

export const ZeroPoints: Story = {
    args: {
        points: 0,
    },
};

export const HighPoints: Story = {
    args: {
        points: 123456,
    },
};

export const SmallPoints: Story = {
    args: {
        points: 50,
    },
}; 