"use client"
import React, { useEffect } from "react";

interface ComponentCardProps {
  title: string;
  children: React.ReactNode;
  className?: string; // Additional custom classes for styling
  desc?: any; // Description text
  headerButton?: any;
  checkbox?: any;
  onCheboxSelected?: (isSelected: boolean) => void;
}

const ComponentCard: React.FC<ComponentCardProps> = ({
  title,
  children,
  className = "",
  desc = "",
  headerButton,
  checkbox = false,
  onCheboxSelected
}) => {

  useEffect(() => {
    if (checkbox) onCheboxSelected ? onCheboxSelected(true) : null
  }, [checkbox])

  return (
    <div
      className={`rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] ${className}`}
    >
      {/* Card Header */}
      <div className="flex flex-row px-6 py-5" style={{justifyContent: 'space-between'}}>
        <div>
          <div className="flex flex-row gap-3">
            {checkbox && (
              <div className="flex items-center h-5">
                <input
                  id="hs-list-group-item-checkbox-1"
                  name="hs-list-group-item-checkbox-1"
                  type="checkbox"
                  className="border-gray-200 rounded disabled:opacity-50 dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                  defaultChecked={true}
                  onChange={(value) => onCheboxSelected ? onCheboxSelected(value.target.checked) : null}
                />
              </div>
            )}
            <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
              {title}
            </h3>
          </div>
          {desc}
        </div>
        {headerButton}
      </div>

      {/* Card Body */}
      <div className="p-4 border-t border-gray-100 dark:border-gray-800 sm:p-6">
        <div className="space-y-6">{children}</div>
      </div>
    </div>
  );
};

export default ComponentCard;
