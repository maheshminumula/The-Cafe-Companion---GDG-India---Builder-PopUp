import React from 'react';
import { UserProfile } from '../types/cafe';
import { LoyaltyPointTracker } from './LoyaltyPointTracker';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentUser: UserProfile;
  onOpenAuth: () => void;
  onOpenRecipeModal: () => void;
  onOpenDeployDocs: () => void;
  trayItemCount: number;
  onToggleTray: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  currentUser,
  onOpenAuth,
  onOpenRecipeModal,
  onOpenDeployDocs,
  trayItemCount,
  onToggleTray,
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#fcf9f3]/90 backdrop-blur-xl border-b border-[#3a2118]/8 shadow-[0_1px_8px_rgba(58,33,24,0.06)]">
      <div className="h-20 w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand Logo & Tag */}
        <div className="flex items-center gap-6 shrink-0">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('smart-concierge-menu')}>
            <img
              alt="Café Companion Logo"
              className="h-8 w-auto object-contain"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZwIIGabzfGuCD5ImCMuDNyGgC2ly0CzKQ-nEpBGKa3MwY9iHl69fTI8Ux_aqL4AytbOACvlWDFiGINLrL7WjBz3URKv-rQgYiB373MJfueIALXI0bqdaoU8obd7xF64XmEhzDXr3O8XjCeCoqLAh5xuYtLOZGWw01wcz-ajE8TdGQSSelY70hulMtXn-ItEQX3a6U_czSjfifwV2C6YPq4aqLQf6YqIs_Sf3VPVlzmB2IRhYkD7f5"
            />
            <div className="flex flex-col">
              <span className="font-headline font-bold text-lg text-[#220d06] tracking-tight leading-none">
                Café Companion
              </span>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#9c4328]"></span>
                <span className="font-label-sm text-[11px] text-[#504440] font-medium tracking-wide uppercase">
                  Powered by Google Gemini &amp; Cloud Platform
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Pill Menu */}
          <nav className="hidden xl:flex items-center gap-1 bg-[#f6f3ed] p-1 rounded-full shadow-[0_1px_4px_rgba(58,33,24,0.04)] border border-[#3a2118]/5">
            <button
              onClick={() => setActiveTab('smart-concierge-menu')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                activeTab === 'smart-concierge-menu'
                  ? 'bg-[#220d06] text-white shadow-sm'
                  : 'text-[#504440] hover:text-[#1c1c18] hover:bg-[#ebe8e2]'
              }`}
            >
              Smart Concierge &amp; Menu
            </button>
            <button
              onClick={() => setActiveTab('predictive-visits-live-vibe')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                activeTab === 'predictive-visits-live-vibe'
                  ? 'bg-[#220d06] text-white shadow-sm'
                  : 'text-[#504440] hover:text-[#1c1c18] hover:bg-[#ebe8e2]'
              }`}
            >
              Predictive Visits &amp; Live Vibe
            </button>
            <button
              onClick={() => setActiveTab('community-table')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                activeTab === 'community-table'
                  ? 'bg-[#220d06] text-white shadow-sm'
                  : 'text-[#504440] hover:text-[#1c1c18] hover:bg-[#ebe8e2]'
              }`}
            >
              Community Table
            </button>
            <button
              onClick={() => setActiveTab('barista-room-radar')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                activeTab === 'barista-room-radar'
                  ? 'bg-[#220d06] text-white shadow-sm'
                  : 'text-[#504440] hover:text-[#1c1c18] hover:bg-[#ebe8e2]'
              }`}
            >
              Barista Room Radar
            </button>
            <button
              onClick={() => setActiveTab('custom-recipes-showcase')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                activeTab === 'custom-recipes-showcase'
                  ? 'bg-[#220d06] text-white shadow-sm'
                  : 'text-[#504440] hover:text-[#1c1c18] hover:bg-[#ebe8e2]'
              }`}
            >
              Guest Recipes
            </button>

            {/* Internal Cafe Team Revenue - Visible ONLY with Admin Access */}
            {currentUser.role === 'admin' && (
              <button
                onClick={() => setActiveTab('internal-cafe-revenue')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 ${
                  activeTab === 'internal-cafe-revenue'
                    ? 'bg-[#9c4328] text-white shadow-sm ring-2 ring-[#ffdbd1]'
                    : 'text-[#9c4328] hover:text-[#220d06] bg-[#ffdbd1]/50 hover:bg-[#ffdbd1]'
                }`}
              >
                <span className="material-symbols-outlined text-sm">finance</span>
                <span>Cafe Team Revenue</span>
                <span className="px-1 py-0.2 bg-[#220d06] text-white text-[9px] rounded uppercase font-bold">Admin</span>
              </button>
            )}
          </nav>
        </div>

        {/* Right Actions & Utilities */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Dedicated Loyalty Point Tracker Component in Header */}
          <LoyaltyPointTracker
            points={currentUser.points}
            onClick={onOpenAuth}
          />

          {/* Try Your Own Recipe CTA Button */}
          <button
            onClick={onOpenRecipeModal}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#9c4328] to-[#220d06] text-white text-xs font-semibold shadow-sm hover:opacity-95 transition-all"
            title="Create and evaluate your custom brew ratio"
          >
            <span className="material-symbols-outlined text-sm">science</span>
            <span>Try Your Own Recipe</span>
          </button>

          {/* Table Location Tag */}
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 bg-[#f6f3ed] rounded-full text-xs text-[#1c1c18] border border-[#3a2118]/5">
            <span className="material-symbols-outlined text-[#9c4328] text-sm">storefront</span>
            <span className="font-medium">Roast &amp; Origin • Downtown SF • {currentUser.tableNumber || 'Table 14'}</span>
          </div>

          {/* Ambient Intelligence Badge */}
          <div className="hidden xl:flex items-center gap-1 px-2.5 py-1 bg-[#ceead0] text-[#092011] rounded-full text-xs font-bold">
            <span className="material-symbols-outlined text-sm animate-pulse text-[#092011]">auto_awesome</span>
            <span>Gemini Ambient Active</span>
          </div>

          {/* Architecture & Deploy Docs Modal Trigger */}
          <button
            onClick={onOpenDeployDocs}
            className="flex items-center justify-center p-2 rounded-full bg-[#f6f3ed] hover:bg-[#ebe8e2] text-[#504440] hover:text-[#220d06] transition-colors"
            title="Cloud Run, Google SQL & Gemini Deployment Architecture Guide"
          >
            <span className="material-symbols-outlined text-lg">terminal</span>
          </button>

          {/* Tray Quick Icon (Mobile / Tablet drawer toggle) */}
          <button
            onClick={onToggleTray}
            className="relative lg:hidden flex items-center justify-center p-2 rounded-full bg-[#f6f3ed] hover:bg-[#ebe8e2] text-[#504440]"
            title="Smart Tray"
          >
            <span className="material-symbols-outlined text-lg">shopping_bag</span>
            {trayItemCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#9c4328] text-white text-[10px] font-bold flex items-center justify-center">
                {trayItemCount}
              </span>
            )}
          </button>

          {/* Customer / Admin Profile Header Pill */}
          <div
            onClick={onOpenAuth}
            className="flex items-center gap-2 pl-1.5 pr-2 py-1 rounded-full bg-[#f6f3ed] hover:bg-[#ebe8e2] cursor-pointer transition-all border border-[#3a2118]/8 shadow-sm"
            title="Click to view Customer Profile, Rewards & Login"
          >
            <img
              alt={currentUser.name}
              className="w-7 h-7 rounded-full object-cover border border-[#9c4328]/30"
              src={currentUser.avatar}
            />
            <div className="hidden sm:flex flex-col text-left leading-tight">
              <span className="text-xs font-bold text-[#220d06] truncate max-w-[90px]">{currentUser.name}</span>
              <span className="text-[10px] text-[#9c4328] font-semibold uppercase">{currentUser.role}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Tab Scroller */}
      <div className="xl:hidden flex items-center gap-1 px-4 py-2 bg-[#f0eee8] overflow-x-auto no-scrollbar border-t border-[#3a2118]/5">
        <button
          onClick={() => setActiveTab('smart-concierge-menu')}
          className={`px-3 py-1 rounded-full text-xs whitespace-nowrap font-medium ${
            activeTab === 'smart-concierge-menu' ? 'bg-[#220d06] text-white' : 'text-[#504440]'
          }`}
        >
          Menu &amp; Concierge
        </button>
        <button
          onClick={() => setActiveTab('predictive-visits-live-vibe')}
          className={`px-3 py-1 rounded-full text-xs whitespace-nowrap font-medium ${
            activeTab === 'predictive-visits-live-vibe' ? 'bg-[#220d06] text-white' : 'text-[#504440]'
          }`}
        >
          Live Vibe &amp; Visits
        </button>
        <button
          onClick={() => setActiveTab('community-table')}
          className={`px-3 py-1 rounded-full text-xs whitespace-nowrap font-medium ${
            activeTab === 'community-table' ? 'bg-[#220d06] text-white' : 'text-[#504440]'
          }`}
        >
          Community Table
        </button>
        <button
          onClick={() => setActiveTab('barista-room-radar')}
          className={`px-3 py-1 rounded-full text-xs whitespace-nowrap font-medium ${
            activeTab === 'barista-room-radar' ? 'bg-[#220d06] text-white' : 'text-[#504440]'
          }`}
        >
          Barista Radar
        </button>
        <button
          onClick={() => setActiveTab('custom-recipes-showcase')}
          className={`px-3 py-1 rounded-full text-xs whitespace-nowrap font-medium ${
            activeTab === 'custom-recipes-showcase' ? 'bg-[#220d06] text-white' : 'text-[#504440]'
          }`}
        >
          Recipes
        </button>
        {currentUser.role === 'admin' && (
          <button
            onClick={() => setActiveTab('internal-cafe-revenue')}
            className={`px-3 py-1 rounded-full text-xs whitespace-nowrap font-semibold flex items-center gap-1 ${
              activeTab === 'internal-cafe-revenue' ? 'bg-[#9c4328] text-white' : 'text-[#9c4328] bg-[#ffdbd1]'
            }`}
          >
            <span>Revenue</span>
            <span className="text-[9px] uppercase font-bold">Admin</span>
          </button>
        )}
      </div>
    </header>
  );
};
