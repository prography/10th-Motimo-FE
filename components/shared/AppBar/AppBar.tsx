import "./style.css";
import { BellIcon } from "../../icons/BellIcon";
import { ChevronLeftIcon } from "../../icons/ChevronLeftIcon";

interface AppBarProps {
  type: "main" | "back" | "progress";
  title?: string;
  points?: string;
  hasNotification?: boolean;
  progress?: number; // 0-100 for progress type
  onBackClick?: () => void;
  onNotificationClick?: () => void;
  className?: string;
}

export const AppBar = ({
  type,
  title = "투두 추가",
  points = "1,000P",
  hasNotification = false,
  progress = 50,
  onBackClick,
  onNotificationClick,
  className,
}: AppBarProps) => {
  return (
    <div className={`app-bar ${type} ${className ?? ""}`}>
      {/* Back button - shown for back and progress types */}
      {(type === "back" || type === "progress") && (
        <button 
          className="back-button"
          onClick={onBackClick}
          aria-label="뒤로 가기"
        >
          <ChevronLeftIcon />
        </button>
      )}

      {/* Title - shown for back type */}
      {type === "back" && (
        <div className="title-area">
          <h1 className="title-text">{title}</h1>
        </div>
      )}

      {/* Progress bar - shown for progress type */}
      {type === "progress" && (
        <div className="progress-area">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Right area - shown for main type */}
      {type === "main" && (
        <div className="right-area">
          <div className="points-chip">
            <span className="points-text">{points}</span>
          </div>
          <button 
            className="notification-button"
            onClick={onNotificationClick}
            aria-label="알림"
          >
            <BellIcon hasNotification={hasNotification} />
          </button>
        </div>
      )}
    </div>
  );
}; 