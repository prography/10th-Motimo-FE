import "./style.css";

interface SegmentedControlOption {
  label: string;
  value: string;
}

interface SegmentedControlProps {
  options: SegmentedControlOption[];
  selectedValue: string;
  onChange: (value: string) => void;
  className?: string;
}

export const SegmentedControl = ({
  options,
  selectedValue,
  onChange,
  className,
}: SegmentedControlProps) => {
  return (
    <div className={`segmented-control ${className ?? ""}`}>
      {options.map((option) => (
        <button
          key={option.value}
          className={`segmented-item ${
            selectedValue === option.value ? "active" : ""
          }`}
          onClick={() => onChange(option.value)}
        >
          <span className="segmented-text">{option.label}</span>
        </button>
      ))}
    </div>
  );
}; 