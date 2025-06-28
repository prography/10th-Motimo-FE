"use client";

import { useState, useRef, useEffect } from "react";

interface CupertinoPickerProps<T> {
    items: T[];
    selectedValue: T;
    onValueChange: (value: T) => void;
    renderItem?: (item: T) => string;
    height?: number;
    itemHeight?: number;
    className?: string;
    showIndicator?: boolean;
    disabled?: boolean;
}

export function CupertinoPicker<T>({
    items,
    selectedValue,
    onValueChange,
    renderItem = (item) => String(item),
    height = 200,
    itemHeight = 40,
    className = "",
    showIndicator = true,
    disabled = false,
}: CupertinoPickerProps<T>) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isScrolling, setIsScrolling] = useState(false);
    const [visibleValue, setVisibleValue] = useState(selectedValue);
    const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ y: 0, scrollTop: 0 });

    const selectedIndex = items.findIndex(item => item === selectedValue);
    const visibleIndex = items.findIndex(item => item === visibleValue);

    // Set initial scroll position when component mounts or selected value changes
    useEffect(() => {
        if (scrollRef.current && selectedIndex !== -1) {
            setTimeout(() => {
                if (scrollRef.current) {
                    const scrollTop = selectedIndex * itemHeight;
                    scrollRef.current.scrollTo({
                        top: scrollTop,
                        behavior: 'auto'
                    });
                    setVisibleValue(selectedValue);
                }
            }, 50);
        }
    }, [selectedValue, selectedIndex, itemHeight]);

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        if (disabled) return;

        setIsScrolling(true);

        const container = e.currentTarget;
        const scrollTop = container.scrollTop;
        const selectedIndex = Math.round(scrollTop / itemHeight);
        const selectedItem = items[selectedIndex];

        // Update visible value in real-time for visual feedback
        if (selectedItem !== undefined) {
            setVisibleValue(selectedItem);
        }

        // Clear existing timeout
        if (scrollTimeoutRef.current) {
            clearTimeout(scrollTimeoutRef.current);
        }

        // Set new timeout to handle scroll end
        scrollTimeoutRef.current = setTimeout(() => {
            setIsScrolling(false);

            if (selectedItem !== undefined) {
                onValueChange(selectedItem);
                setVisibleValue(selectedItem);
                // Smooth scroll to exact position
                container.scrollTo({
                    top: selectedIndex * itemHeight,
                    behavior: 'smooth'
                });
            }
        }, 150);
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        if (disabled) return;

        setIsDragging(true);
        setIsScrolling(true);
        setDragStart({
            y: e.clientY,
            scrollTop: scrollRef.current?.scrollTop || 0
        });
        e.preventDefault();
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !scrollRef.current || disabled) return;

        e.preventDefault();
        const deltaY = e.clientY - dragStart.y;
        const newScrollTop = dragStart.scrollTop - deltaY;

        scrollRef.current.scrollTop = Math.max(0, Math.min(
            scrollRef.current.scrollHeight - scrollRef.current.clientHeight,
            newScrollTop
        ));
    };

    const handleMouseUp = () => {
        if (disabled) return;

        setIsDragging(false);
        setTimeout(() => {
            setIsScrolling(false);
            setVisibleValue(selectedValue);
        }, 300);
    };

    const handleMouseLeave = () => {
        if (isDragging && !disabled) {
            setIsDragging(false);
            setTimeout(() => {
                setIsScrolling(false);
                setVisibleValue(selectedValue);
            }, 300);
        }
    };

    const handleTouchStart = () => {
        if (disabled) return;
        setIsScrolling(true);
    };

    const handleTouchEnd = () => {
        if (disabled) return;
        setTimeout(() => {
            setIsScrolling(false);
            setVisibleValue(selectedValue);
        }, 300);
    };

    const handleItemClick = (item: T, index: number) => {
        if (disabled) return;

        onValueChange(item);
        setVisibleValue(item);
        if (scrollRef.current) {
            scrollRef.current.scrollTo({
                top: index * itemHeight,
                behavior: 'smooth'
            });
        }
    };

    const paddingHeight = Math.floor((height - itemHeight) / 2);

    return (
        <div className={`relative overflow-hidden ${className}`} style={{ height }}>
            {/* Selection indicator */}
            {showIndicator && (
                <div
                    className="absolute inset-x-4 bg-white/50 rounded-lg z-0 pointer-events-none border border-gray-200 shadow-sm backdrop-blur-sm"
                    style={{
                        top: '50%',
                        transform: 'translateY(-50%)',
                        height: itemHeight
                    }}
                />
            )}

            {/* Gradient overlays for fade effect */}
            <div
                className="absolute inset-x-0 top-0 bg-gradient-to-b from-background-alternative via-background-alternative/80 to-transparent z-20 pointer-events-none"
                style={{ height: paddingHeight + 24 }}
            />
            <div
                className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background-alternative via-background-alternative/80 to-transparent z-20 pointer-events-none"
                style={{ height: paddingHeight + 24 }}
            />

            {/* Scrollable content */}
            <div
                ref={scrollRef}
                className={`h-full overflow-y-auto scrollbar-hide touch-pan-y select-none ${disabled
                        ? 'cursor-not-allowed opacity-50'
                        : isDragging
                            ? 'cursor-grabbing'
                            : 'cursor-grab'
                    }`}
                onScroll={handleScroll}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
                style={{
                    scrollSnapType: 'y mandatory',
                    WebkitOverflowScrolling: 'touch',
                    touchAction: 'pan-y'
                }}
            >
                {/* Top padding */}
                <div style={{ height: paddingHeight }} />

                {/* Items */}
                {items.map((item, index) => {
                    const isSelected = (isScrolling ? visibleIndex : selectedIndex) === index;
                    return (
                        <div
                            key={index}
                            className={`flex items-center justify-center cursor-pointer select-none transition-transform duration-150 ${disabled ? 'pointer-events-none' : ''
                                }`}
                            style={{
                                height: itemHeight,
                                scrollSnapAlign: 'center'
                            }}
                            onClick={() => handleItemClick(item, index)}
                        >
                            <span
                                className={`font-medium transition-all duration-200 z-10 relative ${isSelected
                                        ? "text-2xl font-extrabold text-gray-900"
                                        : "text-lg text-gray-400/60"
                                    }`}
                                style={{
                                    textShadow: isSelected
                                        ? '0 2px 4px rgba(0, 0, 0, 0.15)'
                                        : 'none',
                                    filter: isSelected
                                        ? 'contrast(1.1)'
                                        : 'none'
                                }}
                            >
                                {renderItem(item)}
                            </span>
                        </div>
                    );
                })}

                {/* Bottom padding */}
                <div style={{ height: paddingHeight }} />
            </div>
        </div>
    );
} 