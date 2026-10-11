import React from 'react';
import { getTierInfo } from '../data/loyalty';

interface LoyaltyPointTrackerProps {
  points: number;
  onClick?: () => void;
  compact?: boolean;
}

export const LoyaltyPointTracker: React.FC<LoyaltyPointTrackerProps> = ({
  points,
  onClick,
  compact = false,
}) => {
  const { currentTier, nextTier, pointsNeeded, progressPercent } = getTierInfo(points);

  if (compact) {
    return (
      <button
        onClick={onClick}
        type="button"
        className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#f6f3ed] hover:bg-[#ebe8e2] border border-[#3a2118]/8 text-[#220d06] transition-all text-xs shadow-sm group"
        title={`${points} Roastery Points • ${currentTier.name} (Click to view tier progress)`}
      >
        <span className="material-symbols-outlined text-[#9c4328] text-sm animate-pulse">
          stars
        </span>
        <span className="font-bold font-mono text-[11px] text-[#9c4328]">{points}</span>
        <span className="text-[10px] text-[#504440] font-semibold uppercase hidden sm:inline">pts</span>
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      type="button"
      className="hidden md:flex items-center gap-2 pl-2 pr-3 py-1 rounded-full bg-[#f6f3ed] hover:bg-[#ebe8e2] border border-[#3a2118]/8 transition-all shadow-sm group cursor-pointer text-left"
      title="Click to view reward tier progress and perks"
    >
      <div className="w-6 h-6 rounded-full bg-[#ffdbd1] flex items-center justify-center text-[#76270e] shrink-0">
        <span className="material-symbols-outlined text-sm">stars</span>
      </div>
      <div className="flex flex-col leading-none">
        <div className="flex items-center gap-1">
          <span className="text-xs font-bold text-[#220d06] font-mono">{points}</span>
          <span className="text-[10px] text-[#504440] font-semibold uppercase">pts</span>
          <span className="w-1 h-1 rounded-full bg-[#9c4328]"></span>
          <span className="text-[10px] font-bold text-[#9c4328] uppercase">{currentTier.badge}</span>
        </div>
        {nextTier ? (
          <div className="flex items-center gap-1 mt-0.5">
            <div className="w-12 h-1 bg-[#dcdad4] rounded-full overflow-hidden">
              <div
                className="bg-[#9c4328] h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-[9px] text-[#827470] font-mono">
              +{pointsNeeded} to {nextTier.badge}
            </span>
          </div>
        ) : (
          <span className="text-[9px] text-[#092011] font-bold mt-0.5">Max Tier Achieved</span>
        )}
      </div>
    </button>
  );
};
