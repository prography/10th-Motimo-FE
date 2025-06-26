import "./style.css";
import { HomeIcon } from "../../icons/HomeIcon";
import { UserIcon } from "../../icons/UserIcon";
import { ChatIcon } from "../../icons/ChatIcon";

interface BottomTabBarProps {
  type: "1" | "2" | "3" | "4";
  className?: string;
}

export const BottomTabBar = ({ type, className }: BottomTabBarProps) => {
  // Define the tab configuration with consistent order
  const tabs = [
    {
      id: "goal",
      label: "목표",
      icon: HomeIcon,
      activeInTypes: ["1"]
    },
    {
      id: "group", 
      label: "그룹",
      icon: UserIcon,
      activeInTypes: ["2"]
    },
    {
      id: "feed",
      label: "피드", 
      icon: ChatIcon,
      activeInTypes: ["3"]
    },
    {
      id: "mypage",
      label: "마이페이지",
      icon: UserIcon,
      activeInTypes: ["4"]
    }
  ];

  return (
    <div className={`tab-bar ${className ?? ""}`}>
      {tabs.map((tab) => {
        const isActive = tab.activeInTypes.includes(type);
        const IconComponent = tab.icon;
        
        return (
          <div key={tab.id} className={`tab-item ${isActive ? "active" : ""}`}>
            <div className="tab-icon">
              <IconComponent 
                className="icon" 
                color={isActive ? "#5D5FEF" : "#8A949E"} 
              />
            </div>
            <div className="tab-text">
              {tab.label}
            </div>
          </div>
        );
      })}
    </div>
  );
}; 