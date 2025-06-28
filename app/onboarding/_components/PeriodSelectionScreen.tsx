"use client";

import { useState } from "react";
import { ChevronLeftIcon } from "@/components/icons/ChevronLeftIcon";
import { AppBar } from "@/components/shared/AppBar/AppBar";
import { ButtonRound } from "@/components/shared/ButtonRound/ButtonRound";
import { CupertinoPicker } from "@/components/shared/CupertinoPicker/CupertinoPicker";

interface PeriodSelectionScreenProps {
  periodType: "months" | "date";
  monthCount: number;
  targetDate: Date | null;
  onPeriodTypeChange: (type: "months" | "date") => void;
  onMonthCountChange: (count: number) => void;
  onTargetDateChange: (date: Date | null) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function PeriodSelectionScreen({
  periodType,
  monthCount,
  targetDate,
  onPeriodTypeChange,
  onMonthCountChange,
  onTargetDateChange,
  onNext,
  onBack,
}: PeriodSelectionScreenProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const months = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];
  const monthNumbers = Array.from({ length: 12 }, (_, i) => i + 1);

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };



  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const today = new Date();
    const isCurrentMonth = currentMonth === today.getMonth() && currentYear === today.getFullYear();

    const days = [];

    // Previous month's last days
    const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    const daysInPrevMonth = getDaysInMonth(prevMonth, prevYear);

    for (let i = firstDay - 1; i >= 0; i--) {
      days.push(
        <div key={`prev-${daysInPrevMonth - i}`} className="h-10 w-10 flex items-center justify-center">
          <span className="text-xs font-medium text-label-disabled">
            {daysInPrevMonth - i}
          </span>
        </div>
      );
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const isToday = isCurrentMonth && day === today.getDate();
      const isPast = date < today && !isToday;
      const isSelected = targetDate &&
        targetDate.getDate() === day &&
        targetDate.getMonth() === currentMonth &&
        targetDate.getFullYear() === currentYear;

      days.push(
        <button
          key={day}
          onClick={() => !isPast && onTargetDateChange(new Date(currentYear, currentMonth, day))}
          disabled={isPast}
          className={`h-10 w-10 rounded flex items-center justify-center text-xs font-medium ${isSelected
            ? "bg-label-primary text-background-alternative"
            : isPast
              ? "text-label-disabled cursor-not-allowed"
              : "text-label-normal hover:bg-background-assistive"
            }`}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    } else {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    }
  };

  const isNextEnabled = periodType === "months" || targetDate !== null;

  return (
    <div className="min-h-screen bg-background-alternative flex flex-col">
      <AppBar
        type="progress"
        progress={100}
        onBackClick={onBack}
      />
      <div className="py-[8px]" />
      {/* Content */}
      <div className="flex-1 px-6">
        {/* Title and Description */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-label-strong mb-2">
            목표 기간을 정해주세요.
          </h1>
          <p className="text-base font-normal text-label-alternative leading-[1.4]">
            목표의 성격에 따라 '개월 수'나 '완료 날짜' 중에서{"\n"}자유롭게 선택해보세요.
          </p>
        </div>

        {/* Segmented Control */}
        <div className="bg-background-normal rounded-full p-1 mb-8">
          <div className="flex">
            <button
              onClick={() => onPeriodTypeChange("months")}
              className={`flex-1 py-2 px-4 rounded-full font-bold text-sm ${periodType === "months"
                ? "bg-label-primary text-background-alternative"
                : "text-label-alternative"
                }`}
            >
              개월 수로 설정
            </button>
            <button
              onClick={() => onPeriodTypeChange("date")}
              className={`flex-1 py-2 px-4 rounded-full font-bold text-sm ${periodType === "date"
                ? "bg-label-primary text-background-alternative"
                : "text-label-alternative"
                }`}
            >
              완료 날짜로 설정
            </button>
          </div>
        </div>

        {/* Month Selector */}
        {periodType === "months" && (
          <div className="mb-8">
            <CupertinoPicker
              items={monthNumbers}
              selectedValue={monthCount}
              onValueChange={onMonthCountChange}
              renderItem={(num) => `${num}개월`}
              height={200}
              itemHeight={40}
            />
          </div>
        )}

        {/* Calendar */}
        {periodType === "date" && (
          <div className="mb-8">
            {/* Calendar Header */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-bold text-label-strong">
                {currentYear}년 {months[currentMonth]}
              </h3>
              <div className="flex gap-1">
                <button
                  onClick={() => navigateMonth('prev')}
                  className="w-8 h-8 flex items-center justify-center"
                  disabled={currentMonth === new Date().getMonth() && currentYear === new Date().getFullYear()}
                >
                  <ChevronLeftIcon className="w-4 h-4 text-label-normal" />
                </button>
                <button
                  onClick={() => navigateMonth('next')}
                  className="w-8 h-8 flex items-center justify-center"
                >
                  <ChevronLeftIcon className="w-4 h-4 text-label-normal rotate-180" />
                </button>
              </div>
            </div>

            {/* Week Days */}
            <div className="grid grid-cols-7 gap-1.5 mb-2">
              {["월", "화", "수", "목", "금", "토", "일"].map((day) => (
                <div key={day} className="h-10 flex items-center justify-center">
                  <span className="text-xs font-medium text-label-normal">{day}</span>
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1.5">
              {renderCalendar()}
            </div>
          </div>
        )}
      </div>

      {/* Next Button */}
      <div className="px-4 pb-14">
        <ButtonRound
          onClick={onNext}
          disabled={!isNextEnabled}
        >
          다음
        </ButtonRound>
      </div>
    </div>
  );
} 