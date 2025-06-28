import type { Meta, StoryObj } from '@storybook/react';
import { NavigationList } from './NavigationList';

const meta: Meta<typeof NavigationList> = {
    title: 'MyPage/NavigationList',
    component: NavigationList,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const loggedInItems = [
    {
        label: "완료한 목표/투두 보기",
        hasIcon: true,
        onClick: () => console.log("Navigate to completed goals")
    },
    {
        label: "알림 설정",
        hasIcon: true,
        onClick: () => console.log("Navigate to notifications")
    },
    {
        label: "서비스 이용약관",
        hasIcon: true,
        onClick: () => console.log("Navigate to terms")
    },
    {
        label: "버전 정보 v1.0",
        hasIcon: false,
        onClick: () => { }
    }
];

const guestItems = [
    {
        label: "서비스 이용약관",
        hasIcon: true,
        onClick: () => console.log("Navigate to terms")
    },
    {
        label: "버전 정보 v1.0",
        hasIcon: false,
        onClick: () => { }
    }
];

export const Primary: Story = {
    args: {
        items: loggedInItems,
    },
};

export const LoggedInUser: Story = {
    args: {
        items: loggedInItems,
    },
};

export const GuestUser: Story = {
    args: {
        items: guestItems,
    },
};

export const SingleItem: Story = {
    args: {
        items: [
            {
                label: "단일 항목",
                hasIcon: true,
                onClick: () => console.log("Single item clicked")
            }
        ],
    },
}; 