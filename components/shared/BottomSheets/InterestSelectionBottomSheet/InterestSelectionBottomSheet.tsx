"use client";

import { UserUpdateRqInterestsEnum } from "@/api/generated/motimo/Api";
import { UserUpdateRqInterestsEnumToKr } from "@/lib/display";
import React, { useState } from "react";
import { Drawer } from "vaul";

interface InterestSelectionBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (selectedInterests: UserUpdateRqInterestsEnum[]) => void;
  initialInterests?: UserUpdateRqInterestsEnum[];
}

const availableInterests = Object.values(UserUpdateRqInterestsEnum);

export const InterestSelectionBottomSheet: React.FC<
  InterestSelectionBottomSheetProps
> = ({ isOpen, onClose, onSave, initialInterests = [] }) => {
  const [selectedInterests, setSelectedInterests] =
    useState<UserUpdateRqInterestsEnum[]>(initialInterests);

  const toggleInterest = (interest: UserUpdateRqInterestsEnum) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((item) => item !== interest)
        : [...prev, interest],
    );
  };

  const handleSave = () => {
    onSave(selectedInterests);
    onClose();
  };

  const handleClose = () => {
    setSelectedInterests(initialInterests);
    onClose();
  };

  return (
    <Drawer.Root open={isOpen}>
      <Drawer.Portal>
        <Drawer.Overlay
          className="fixed inset-0 bg-black/40 z-20"
          onClick={handleClose}
        />
        <Drawer.Content className="bg-Color-white flex flex-col rounded-t-[16px] mt-24 fixed bottom-0 left-0 right-0 z-30 max-w-[360px] mx-auto">
          <Drawer.Title className="sr-only">관심사 추가하기</Drawer.Title>

          {/* Gesture bar */}
          <div className="flex justify-center py-[10px]">
            <div className="w-[108px] h-1 bg-Color-black rounded-full" />
          </div>

          {/* Header */}
          <div className="flex items-center justify-between px-4 pb-6">
            <h2 className="font-SUIT_Variable font-bold text-xl leading-[1.2] tracking-[-0.01em] text-Color-black">
              관심사 추가하기
            </h2>
            <button
              onClick={handleClose}
              className="w-6 h-6 flex items-center justify-center hover:opacity-70"
              aria-label="닫기"
            >
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                <path
                  d="M1 1L7 7M7 1L1 7"
                  stroke="#464C53"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {/* Interest chips */}
          <div className="px-4 pb-6">
            <div className="flex flex-wrap gap-2">
              {availableInterests.map((interest) => {
                const isSelected = selectedInterests.includes(interest);
                return (
                  <button
                    key={interest}
                    onClick={() => toggleInterest(interest)}
                    className={`
                      px-3 py-2.5 rounded-full text-sm font-medium leading-[1.4] tracking-[-0.01em] transition-colors
                      ${
                        isSelected
                          ? "bg-Color-primary-50 text-Color-white"
                          : "bg-Color-gray-5 text-Color-gray-60 hover:bg-Color-gray-10"
                      }
                    `}
                  >
                    {UserUpdateRqInterestsEnumToKr(interest)}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Save button */}
          <div className="px-4 pb-4">
            <button
              onClick={handleSave}
              className="w-full h-14 bg-Color-gray-80 text-Color-white font-bold text-xl leading-[1.2] tracking-[-0.01em] rounded-full hover:opacity-90 transition-opacity"
            >
{initialInterests.length === 0 ? "추가하기" : "변경하기"}
            </button>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};
