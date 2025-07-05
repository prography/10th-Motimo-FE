import type { Meta, StoryObj } from '@storybook/react';
import { UserProfile } from './UserProfile';

const meta: Meta<typeof UserProfile> = {
    title: 'MyPage/UserProfile',
    component: UserProfile,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        onAddInterests: { action: 'add interests clicked' },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        name: '몰입한 곰돌이',
        profileImage: '/placeholder-profile.jpg',
    },
};

export const WithoutProfileImage: Story = {
    args: {
        name: '신규 사용자',
    },
};

export const LongName: Story = {
    args: {
        name: '아주 긴 사용자 이름을 가진 사용자',
        profileImage: '/placeholder-profile.jpg',
    },
}; 