import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { CupertinoPicker } from "./CupertinoPicker";

const meta: Meta<typeof CupertinoPicker> = {
    title: "shared/CupertinoPicker",
    component: CupertinoPicker,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    argTypes: {
        items: {
            description: "Array of items to display in the picker",
        },
        selectedValue: {
            description: "Currently selected value",
        },
        onValueChange: {
            action: "value changed",
            description: "Callback when value changes",
        },
        renderItem: {
            description: "Function to render each item as string",
        },
        height: {
            control: "number",
            description: "Height of the picker in pixels",
        },
        itemHeight: {
            control: "number",
            description: "Height of each item in pixels",
        },
        showIndicator: {
            control: "boolean",
            description: "Whether to show selection indicator",
        },
        disabled: {
            control: "boolean",
            description: "Whether the picker is disabled",
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Numbers example
const NumberPickerTemplate = () => {
    const [selectedNumber, setSelectedNumber] = useState(6);
    const numbers = Array.from({ length: 12 }, (_, i) => i + 1);

    return (
        <CupertinoPicker
            items={numbers}
            selectedValue={selectedNumber}
            onValueChange={setSelectedNumber}
            renderItem={(num) => `${num}개월`}
        />
    );
};

export const NumberPicker: Story = {
    render: NumberPickerTemplate,
};

// Months example
const MonthPickerTemplate = () => {
    const [selectedMonth, setSelectedMonth] = useState("March");
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    return (
        <CupertinoPicker
            items={months}
            selectedValue={selectedMonth}
            onValueChange={setSelectedMonth}
        />
    );
};

export const MonthPicker: Story = {
    render: MonthPickerTemplate,
};

// Hours example
const HourPickerTemplate = () => {
    const [selectedHour, setSelectedHour] = useState(12);
    const hours = Array.from({ length: 24 }, (_, i) => i);

    return (
        <CupertinoPicker
            items={hours}
            selectedValue={selectedHour}
            onValueChange={setSelectedHour}
            renderItem={(hour) => `${hour.toString().padStart(2, '0')}:00`}
            height={160}
            itemHeight={35}
        />
    );
};

export const HourPicker: Story = {
    render: HourPickerTemplate,
};

// Custom styling example
const CustomStyledTemplate = () => {
    const [selectedValue, setSelectedValue] = useState("Medium");
    const sizes = ["Extra Small", "Small", "Medium", "Large", "Extra Large"];

    return (
        <CupertinoPicker
            items={sizes}
            selectedValue={selectedValue}
            onValueChange={setSelectedValue}
            height={250}
            itemHeight={50}
            className="bg-gray-50 rounded-xl border"
        />
    );
};

export const CustomStyled: Story = {
    render: CustomStyledTemplate,
};

// Disabled example
const DisabledTemplate = () => {
    const [selectedValue, setSelectedValue] = useState(5);
    const numbers = Array.from({ length: 10 }, (_, i) => i + 1);

    return (
        <CupertinoPicker
            items={numbers}
            selectedValue={selectedValue}
            onValueChange={setSelectedValue}
            disabled={true}
            renderItem={(num) => `${num}`}
        />
    );
};

export const Disabled: Story = {
    render: DisabledTemplate,
};

// Without indicator example
const WithoutIndicatorTemplate = () => {
    const [selectedValue, setSelectedValue] = useState("Option 3");
    const options = ["Option 1", "Option 2", "Option 3", "Option 4", "Option 5"];

    return (
        <CupertinoPicker
            items={options}
            selectedValue={selectedValue}
            onValueChange={setSelectedValue}
            showIndicator={false}
        />
    );
};

export const WithoutIndicator: Story = {
    render: WithoutIndicatorTemplate,
}; 