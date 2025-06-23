import "./style.css";
import { HomeIcon } from "../../icons/HomeIcon";
import { UserIcon } from "../../icons/UserIcon";
import { ChatIcon } from "../../icons/ChatIcon";

interface TabBarProps {
  type: "1" | "2" | "3" | "4";
  className?: string;
}

export const TabBar = ({ type, className }: TabBarProps) => {
  return (
    <div className={`tab-bar ${className ?? ""}`}>
      {/* First Tab */}
      <div className={`tab-item ${type === "1" ? "active" : ""}`}>
        <div className="tab-icon">
          {type === "1" && <HomeIcon className="icon" color="#5D5FEF" />}
          {type === "2" && <UserIcon className="icon" color="#5D5FEF" />}
          {(type === "3" || type === "4") && <UserIcon className="icon" color="#8A949E" />}
        </div>
        <div className="tab-text">
          {type === "1" && "목표"}
          {(type === "2" || type === "3" || type === "4") && "그룹"}
        </div>
      </div>

      {/* Second Tab */}
      <div className={`tab-item ${type === "2" ? "active" : ""}`}>
        <div className="tab-icon">
          {type === "1" && <UserIcon className="icon" color="#8A949E" />}
          {type === "2" && <HomeIcon className="icon" color="#8A949E" />}
          {(type === "3" || type === "4") && <ChatIcon className="icon" color="#8A949E" />}
        </div>
        <div className="tab-text">
          {type === "1" && "그룹"}
          {type === "2" && "목표"}
          {(type === "3" || type === "4") && "피드"}
        </div>
      </div>

      {/* Third Tab */}
      <div className={`tab-item ${type === "3" ? "active" : ""}`}>
        <div className="tab-icon">
          {type === "1" && <ChatIcon className="icon" color="#8A949E" />}
          {type === "2" && <ChatIcon className="icon" color="#8A949E" />}
          {type === "3" && <ChatIcon className="icon" color="#5D5FEF" />}
          {type === "4" && <UserIcon className="icon" color="#5D5FEF" />}
        </div>
        <div className="tab-text">
          {(type === "1" || type === "2") && "피드"}
          {type === "3" && "피드"}
          {type === "4" && "마이페이지"}
        </div>
      </div>

      {/* Fourth Tab */}
      <div className={`tab-item ${type === "4" ? "active" : ""}`}>
        <div className="tab-icon">
          {type === "1" && <UserIcon className="icon" color="#8A949E" />}
          {type === "2" && <UserIcon className="icon" color="#8A949E" />}
          {type === "3" && <HomeIcon className="icon" color="#8A949E" />}
          {type === "4" && <HomeIcon className="icon" color="#8A949E" />}
        </div>
        <div className="tab-text">
          {(type === "1" || type === "2") && "마이페이지"}
          {(type === "3" || type === "4") && "목표"}
        </div>
      </div>
    </div>
  );
};
