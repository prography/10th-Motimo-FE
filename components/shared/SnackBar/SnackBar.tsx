import "./style.css";
import { WarningIcon } from "../../icons/WarningIcon";

interface SnackBarProps {
  text: string;
  showIcon?: boolean;
  actionText?: string;
  onActionClick?: () => void;
  className?: string;
}

export const SnackBar = ({
  text,
  showIcon = false,
  actionText,
  onActionClick,
  className,
}: SnackBarProps) => {
  return (
    <div className={`snack-bar ${className ?? ""}`}>
      <div className="snack-bar-container">
        {showIcon && (
          <div className="snack-bar-icon">
            <WarningIcon />
          </div>
        )}
        <div className="snack-bar-text">{text}</div>
      </div>
      {actionText && (
        <div className="snack-bar-action">
          <button 
            className="snack-bar-button"
            onClick={onActionClick}
          >
            {actionText}
          </button>
        </div>
      )}
    </div>
  );
}; 