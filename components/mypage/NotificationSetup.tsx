"use client";

import { useState } from "react";
import { AppBar } from "@/components/shared/AppBar/AppBar";
import Toggle from "@/components/shared/Toggle/Toggle";
import { Toast } from "@/components/shared/Toast/Toast";
import useToast from "@/hooks/useToast";

interface NotificationSettings {
  todoDeadline: boolean;
  deadlineAdvance: string;
  groupNotifications: boolean;
  nudgeNotifications: boolean;
  feedbackNotifications: boolean;
}

interface NotificationSetupProps {
  onBack?: () => void;
  className?: string;
}

export function NotificationSetup({
  onBack,
  className = "",
}: NotificationSetupProps) {
  const [settings, setSettings] = useState<NotificationSettings>({
    todoDeadline: true,
    deadlineAdvance: "하루",
    groupNotifications: true,
    nudgeNotifications: false,
    feedbackNotifications: false,
  });
  const { setToast } = useToast();
  // const [showToast, setShowToast] = useState(false);
  // const [toastMessage, setToastMessage] = useState("");

  const deadlineOptions = ["1시간", "하루", "2일", "3일", "일주일"];

  const handleToggleChange = (
    key: keyof NotificationSettings,
    currentValue: boolean,
  ) => {
    const newValue = !currentValue;
    setSettings((prev) => ({ ...prev, [key]: newValue }));

    // Show toast when enabling group notifications
    if (key === "groupNotifications" && newValue) {
      //   setToastMessage("그룹 알림을 활성화했습니다.");
      //   setShowToast(true);
      //   setTimeout(() => setShowToast(false), 3000);
      setToast("그룹 알림을 활성화했습니다.");
    }
  };

  const handleDeadlineAdvanceChange = (value: string) => {
    setSettings((prev) => ({ ...prev, deadlineAdvance: value }));
  };

  return (
    <div className={`min-h-screen bg-Color-white flex flex-col ${className}`}>
      {/* Status Bar */}
      <div className="flex justify-between items-end gap-[286px] px-6 py-[10px] h-[52px]">
        <div className="text-sm font-medium text-Color-gray-90">9:30</div>
        <div className="flex items-center gap-4">
          <div className="w-[46px] h-[17px]"></div>
        </div>
      </div>

      {/* App Bar */}
      <AppBar type="back" title="알림 설정" onBackClick={onBack} />

      {/* Notification Settings List */}
      <div className="flex-1">
        <div className="flex flex-col">
          {/* Todo Deadline Notification */}
          <div className="flex items-center gap-3 px-4 py-4">
            <span className="flex-1 text-sm font-medium text-Color-gray-80">
              투두 마감 알림
            </span>
            <Toggle
              isOn={settings.todoDeadline}
              onChange={(currentValue) =>
                handleToggleChange("todoDeadline", currentValue)
              }
            />
          </div>

          {/* Deadline Advance Setting */}
          {settings.todoDeadline && (
            <div className="bg-Color-gray-5 px-6 py-2">
              <div className="flex items-center gap-1">
                <span className="text-sm font-medium text-Color-gray-90">
                  설정한 마감일
                </span>

                {/* Dropdown */}
                <div className="relative">
                  <select
                    value={settings.deadlineAdvance}
                    onChange={(e) =>
                      handleDeadlineAdvanceChange(e.target.value)
                    }
                    className="bg-Color-white border border-Color-gray-20 rounded px-2 py-1 text-sm text-Color-gray-90 appearance-none pr-6"
                  >
                    {deadlineOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-1 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M5.33 6.67L8 9.33L10.67 6.67"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>

                <span className="text-sm font-medium text-Color-gray-90">
                  전에 알림이 갑니다.
                </span>
              </div>
            </div>
          )}

          {/* Group Notifications */}
          <div className="flex items-center gap-3 px-4 py-4">
            <span className="flex-1 text-sm font-medium text-Color-gray-80">
              그룹 알림
            </span>
            <Toggle
              isOn={settings.groupNotifications}
              onChange={(currentValue) =>
                handleToggleChange("groupNotifications", currentValue)
              }
            />
          </div>

          {/* Nudge Notifications */}
          <div className="flex items-center gap-3 px-4 py-4">
            <span className="flex-1 text-sm font-medium text-Color-gray-80">
              찌르기 알림
            </span>
            <Toggle
              isOn={settings.nudgeNotifications}
              onChange={(currentValue) =>
                handleToggleChange("nudgeNotifications", currentValue)
              }
            />
          </div>

          {/* Feedback Notifications */}
          <div className="flex items-center gap-3 px-4 py-4">
            <span className="flex-1 text-sm font-medium text-Color-gray-80">
              피드백 알림
            </span>
            <Toggle
              isOn={settings.feedbackNotifications}
              onChange={(currentValue) =>
                handleToggleChange("feedbackNotifications", currentValue)
              }
            />
          </div>
        </div>
      </div>

      {/* Toast */}
      {/* {showToast && (
        <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2">
          <Toast text={toastMessage} />
        </div>
      )} */}

      {/* Gesture Bar */}
      <div className="h-6 flex justify-center items-center">
        <div className="w-[108px] h-1 bg-Color-gray-90 rounded-full"></div>
      </div>
    </div>
  );
}
