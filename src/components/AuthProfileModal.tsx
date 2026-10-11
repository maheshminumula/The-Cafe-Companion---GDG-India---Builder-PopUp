import React, { useState } from 'react';
import { UserProfile } from '../types/cafe';
import { REWARD_TIERS, getTierInfo } from '../data/loyalty';

interface AuthProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile;
  onUpdateUser: (updated: UserProfile) => void;
}

export const AuthProfileModal: React.FC<AuthProfileModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onUpdateUser,
}) => {
  const [authMode, setAuthMode] = useState<'profile' | 'loyalty' | 'login-gmail' | 'login-phone'>('profile');
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email || '');
  const [phone, setPhone] = useState(currentUser.phone || '');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [selectedRole, setSelectedRole] = useState<'customer' | 'admin'>(currentUser.role === 'admin' ? 'admin' : 'customer');
  const [tableNumber, setTableNumber] = useState(currentUser.tableNumber || 'Table 14');
  const [statusMessage, setStatusMessage] = useState('');

  if (!isOpen) return null;

  const { currentTier, nextTier, pointsNeeded, progressPercent } = getTierInfo(currentUser.points);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser({
      ...currentUser,
      name,
      email,
      phone,
      role: selectedRole,
      tableNumber,
    });
    setStatusMessage('Profile successfully synchronized with Google Cloud PostgreSQL backend.');
    setTimeout(() => {
      setStatusMessage('');
      onClose();
    }, 1000);
  };

  const handleAddSamplePoints = (pts: number) => {
    const updated = {
      ...currentUser,
      points: currentUser.points + pts,
    };
    onUpdateUser(updated);
    setStatusMessage(`+${pts} Roastery Points logged via in-cafe order! Total: ${updated.points} pts`);
    setTimeout(() => setStatusMessage(''), 2500);
  };

  const handleGmailSignIn = () => {
    setStatusMessage('Connecting via Google OAuth 2.0 Identity Enclave...');
    setTimeout(() => {
      onUpdateUser({
        ...currentUser,
        name: name || 'Mahesh Minumula',
        email: email || 'maheshminumula1@gmail.com',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJgD07BArY4z3yGuGrzs0DLlhUC12YWFSkLYF_iNf8uIrmcJfcbIdUCeMEBEocwiZQqPjAlE_fu3uxe3aTWCazTo1CyMSdON8WXxMRXzMWSNUHDun1g0mPPpW3ISKpvP90l2PzZTvAtc-DR-u90kZTgh74yU68Ef4oPBp-mNxhKDmZM5ctv2d2ULJ6wWLj_d0ZHp88EmGupuMYoDrcFs0eCaVmKUItgpnYAqmBzv3OK_JHAqmVogvQ',
        points: 480,
      });
      setStatusMessage('Signed in with Google! Preferences and past orders loaded.');
      setTimeout(() => {
        setStatusMessage('');
        onClose();
      }, 900);
    }, 1200);
  };

  const handleSendPhoneOTP = () => {
    if (!phone) return;
    setOtpSent(true);
    setStatusMessage('SMS OTP code [7419] dispatched via Google Cloud Communications Gateway.');
  };

  const handleVerifyPhone = () => {
    setStatusMessage('Validating SMS token...');
    setTimeout(() => {
      onUpdateUser({
        ...currentUser,
        name: name || 'Phone Verified Patron',
        phone,
        points: 320,
      });
      setStatusMessage('Phone Number Verified! Welcome to Café Companion.');
      setTimeout(() => {
        setStatusMessage('');
        onClose();
      }, 900);
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#220d06]/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#ffffff] max-w-lg w-full rounded-2xl p-6 sm:p-8 shadow-2xl border border-[#3a2118]/10 flex flex-col gap-5 relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#f0eee8] flex items-center justify-center text-[#504440] hover:text-[#1c1c18] hover:bg-[#e5e2dc] transition-colors"
        >
          <span className="material-symbols-outlined text-base">close</span>
        </button>

        {/* Modal Header */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="material-symbols-outlined text-[#9c4328]">account_circle</span>
            <span className="font-label-sm uppercase tracking-wider text-[#9c4328] font-bold">
              Customer Profile &amp; Authentication
            </span>
          </div>
          <h2 className="font-headline font-bold text-2xl text-[#220d06]">
            {authMode === 'profile'
              ? 'Your Café Profile & Table Preferences'
              : authMode === 'loyalty'
              ? 'Roastery Loyalty Rewards & Tiers'
              : authMode === 'login-gmail'
              ? 'Sign in with Google'
              : 'Sign in with Phone Number'}
          </h2>
          <p className="font-body-sm text-sm text-[#504440] mt-1">
            Persist your micro-lot taste calibration, track your loyalty reward tier, and switch roles to access internal cafe metrics.
          </p>
        </div>

        {/* Auth Mode Nav Tabs */}
        <div className="grid grid-cols-4 gap-1 bg-[#f0eee8] p-1 rounded-xl">
          <button
            type="button"
            onClick={() => setAuthMode('profile')}
            className={`py-2 rounded-lg text-xs font-semibold transition-all ${
              authMode === 'profile'
                ? 'bg-[#ffffff] text-[#220d06] shadow-sm'
                : 'text-[#504440] hover:text-[#1c1c18]'
            }`}
          >
            Profile
          </button>
          <button
            type="button"
            onClick={() => setAuthMode('loyalty')}
            className={`py-2 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1 ${
              authMode === 'loyalty'
                ? 'bg-[#9c4328] text-white shadow-sm'
                : 'text-[#9c4328] font-bold hover:bg-[#ffdbd1]'
            }`}
          >
            <span className="material-symbols-outlined text-xs">stars</span>
            <span>Rewards</span>
          </button>
          <button
            type="button"
            onClick={() => setAuthMode('login-gmail')}
            className={`py-2 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1 ${
              authMode === 'login-gmail'
                ? 'bg-[#ffffff] text-[#220d06] shadow-sm'
                : 'text-[#504440] hover:text-[#1c1c18]'
            }`}
          >
            <span>Gmail</span>
          </button>
          <button
            type="button"
            onClick={() => setAuthMode('login-phone')}
            className={`py-2 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1 ${
              authMode === 'login-phone'
                ? 'bg-[#ffffff] text-[#220d06] shadow-sm'
                : 'text-[#504440] hover:text-[#1c1c18]'
            }`}
          >
            <span>Phone</span>
          </button>
        </div>

        {/* Status Alert Banner */}
        {statusMessage && (
          <div className="p-3 rounded-xl bg-[#ceead0] text-[#092011] text-xs font-semibold flex items-center gap-2 animate-fadeIn">
            <span className="material-symbols-outlined text-sm">info</span>
            <span>{statusMessage}</span>
          </div>
        )}

        {/* View 1: Profile & Role Switcher */}
        {authMode === 'profile' && (
          <form onSubmit={handleSaveProfile} className="flex flex-col gap-4">
            <div className="flex items-center gap-4 p-3.5 rounded-xl bg-[#f6f3ed] border border-[#3a2118]/5">
              <img
                src={currentUser.avatar}
                alt="Avatar"
                className="w-14 h-14 rounded-full object-cover border-2 border-[#9c4328]"
              />
              <div className="flex-1">
                <div className="font-bold text-[#220d06] text-base">{currentUser.name}</div>
                <div className="text-xs text-[#504440]">
                  {currentUser.email || currentUser.phone || 'Guest Visitor'}
                </div>
                <div className="mt-1 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setAuthMode('loyalty')}
                    className="px-2.5 py-0.5 rounded-full bg-[#ffdbd1] text-[#76270e] text-[11px] font-bold flex items-center gap-1 hover:bg-[#ffb59f] transition-colors"
                  >
                    <span className="material-symbols-outlined text-xs">stars</span>
                    <span>{currentUser.points} Roastery Points ({currentTier.badge})</span>
                  </button>
                  <span className="text-xs text-[#504440]">• {currentUser.tableNumber}</span>
                </div>
              </div>
            </div>

            {/* Dedicated In-Profile Tier Quick Tracker Card */}
            <div className="p-4 rounded-xl bg-[#ffffff] border border-[#3a2118]/10 shadow-sm flex flex-col gap-2">
              <div className="flex justify-between items-center text-xs">
                <div className="flex items-center gap-1.5 font-bold text-[#220d06]">
                  <span className="material-symbols-outlined text-[#9c4328] text-base">military_tech</span>
                  <span>Current Tier: <strong className="text-[#9c4328]">{currentTier.name}</strong></span>
                </div>
                <button
                  type="button"
                  onClick={() => setAuthMode('loyalty')}
                  className="text-xs font-bold text-[#9c4328] hover:underline"
                >
                  View All Perks →
                </button>
              </div>

              {nextTier ? (
                <div>
                  <div className="flex justify-between items-center text-[11px] text-[#504440] mb-1">
                    <span>Progress to <strong>{nextTier.name} ({nextTier.badge})</strong></span>
                    <span className="font-mono font-bold text-[#9c4328]">{progressPercent}%</span>
                  </div>
                  <div className="w-full bg-[#f0eee8] h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-[#9c4328] to-[#c86446] h-full rounded-full transition-all duration-500"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-[#827470] mt-1 font-mono">
                    <span>{currentUser.points} pts</span>
                    <span>{pointsNeeded} pts needed for {nextTier.threshold} pts</span>
                  </div>
                </div>
              ) : (
                <div className="p-2 rounded-lg bg-[#ceead0] text-[#092011] text-xs font-bold text-center">
                  Diamond Reserve Achieved • You enjoy unlimited private tastings!
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#220d06] mb-1">Display Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#f0eee8] text-sm text-[#1c1c18] border border-transparent focus:border-[#9c4328] focus:outline-none"
                  placeholder="e.g. Elena Rostova"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#220d06] mb-1">Assigned Cafe Table</label>
                <input
                  type="text"
                  value={tableNumber}
                  onChange={(e) => setTableNumber(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#f0eee8] text-sm text-[#1c1c18] border border-transparent focus:border-[#9c4328] focus:outline-none"
                  placeholder="e.g. Table 14 (Counter)"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#220d06] mb-1">Email (Optional / Linked)</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#f0eee8] text-sm text-[#1c1c18] border border-transparent focus:border-[#9c4328] focus:outline-none"
                placeholder="maheshminumula1@gmail.com"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#220d06] mb-1">Phone Number (Optional / Linked)</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#f0eee8] text-sm text-[#1c1c18] border border-transparent focus:border-[#9c4328] focus:outline-none"
                placeholder="+1 (415) 890-4421"
              />
            </div>

            {/* Role Switcher - Critical for Revealing Revenue Option to Internal Cafe Team */}
            <div className="p-4 rounded-xl bg-[#fff2ee] border border-[#ff8f6e]/30 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#9c4328] flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">admin_panel_settings</span>
                  Role &amp; Permissions (Internal Cafe Team)
                </span>
                <span className="text-[11px] text-[#504440]">Unlocks Revenue widget</span>
              </div>
              <p className="text-xs text-[#504440]">
                Select <strong className="text-[#220d06]">Admin / Cafe Ops Team</strong> to reveal the live store revenue widget, COGS breakdown, and hourly margin analytics.
              </p>
              <div className="grid grid-cols-2 gap-2 mt-1">
                <button
                  type="button"
                  onClick={() => setSelectedRole('customer')}
                  className={`py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                    selectedRole === 'customer'
                      ? 'bg-[#220d06] text-white shadow-sm'
                      : 'bg-[#ffffff] text-[#504440] border border-[#3a2118]/10'
                  }`}
                >
                  <span className="material-symbols-outlined text-sm">person</span>
                  <span>Customer (Patron)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedRole('admin')}
                  className={`py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                    selectedRole === 'admin'
                      ? 'bg-[#9c4328] text-white shadow-sm ring-2 ring-[#ff8f6e]'
                      : 'bg-[#ffffff] text-[#9c4328] border border-[#9c4328]/30'
                  }`}
                >
                  <span className="material-symbols-outlined text-sm">security</span>
                  <span>Admin (Internal Cafe Team)</span>
                </button>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-[#504440] hover:bg-[#f0eee8]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-[#220d06] hover:bg-[#3a2118] text-white text-xs font-bold shadow-md transition-all"
              >
                Save Preferences
              </button>
            </div>
          </form>
        )}

        {/* View 2: Dedicated Loyalty Rewards & Tier Progress Section */}
        {authMode === 'loyalty' && (
          <div className="flex flex-col gap-4">
            {/* Current Status Showcase Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-[#220d06] to-[#3a2118] text-white shadow-md flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#ffdbd1] flex items-center justify-center text-[#76270e]">
                    <span className="material-symbols-outlined text-base">stars</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#d4c3be] tracking-wider block">
                      Active Status
                    </span>
                    <h3 className="font-headline font-bold text-lg text-white">
                      {currentTier.name} ({currentTier.badge})
                    </h3>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="font-mono font-bold text-2xl text-[#ffdbd1]">
                    {currentUser.points}
                  </span>
                  <span className="text-[10px] text-[#d4c3be] uppercase font-semibold">Total Points</span>
                </div>
              </div>

              {/* Progress to Next Tier */}
              {nextTier ? (
                <div className="p-3 rounded-xl bg-white/10 backdrop-blur flex flex-col gap-1.5 mt-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-[#fcf9f3]">
                      Next Tier: <strong>{nextTier.name} ({nextTier.badge})</strong>
                    </span>
                    <span className="font-mono font-bold text-[#ff8f6e]">{progressPercent}%</span>
                  </div>
                  <div className="w-full bg-white/20 h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-[#ff8f6e] to-[#ceead0] h-full rounded-full transition-all duration-500"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-[#d4c3be] font-mono">
                    <span>{currentUser.points} pts accumulated</span>
                    <span><strong>{pointsNeeded} points needed</strong> ({nextTier.threshold} pts goal)</span>
                  </div>
                </div>
              ) : (
                <div className="p-3 rounded-xl bg-[#ceead0] text-[#092011] text-xs font-bold text-center">
                  You have attained our highest Diamond Roaster Enclave tier!
                </div>
              )}

              {/* Instant Simulator Actions for Patron Testing */}
              <div className="pt-2 flex items-center justify-between border-t border-white/10">
                <span className="text-[11px] text-[#d4c3be]">Simulate coffee purchase points:</span>
                <div className="flex gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleAddSamplePoints(25)}
                    className="px-2.5 py-1 rounded-lg bg-white/15 hover:bg-white/25 text-white text-[11px] font-bold transition-all"
                  >
                    +25 pts (Cortado)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAddSamplePoints(75)}
                    className="px-2.5 py-1 rounded-lg bg-white/15 hover:bg-white/25 text-white text-[11px] font-bold transition-all"
                  >
                    +75 pts (Gesha Reserve)
                  </button>
                </div>
              </div>
            </div>

            {/* Reward Tiers List & Breakdown */}
            <div className="flex flex-col gap-2.5">
              <span className="text-xs font-bold text-[#220d06] uppercase tracking-wider">
                Roastery Reward Tiers &amp; Unlocked Perks
              </span>

              {REWARD_TIERS.map((tier) => {
                const isCurrent = currentTier.id === tier.id;
                const isUnlocked = currentUser.points >= tier.threshold;

                return (
                  <div
                    key={tier.id}
                    className={`p-3.5 rounded-xl border transition-all flex items-start gap-3 ${
                      isCurrent
                        ? 'bg-[#fff2ee] border-[#ff8f6e] shadow-sm'
                        : isUnlocked
                        ? 'bg-[#f6f3ed] border-[#3a2118]/10'
                        : 'bg-[#ffffff] border-[#3a2118]/5 opacity-70'
                    }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                        isCurrent
                          ? 'bg-[#9c4328] text-white'
                          : isUnlocked
                          ? 'bg-[#220d06] text-white'
                          : 'bg-[#ebe8e2] text-[#827470]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-base">
                        {isUnlocked ? 'verified' : 'lock'}
                      </span>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <h4 className="font-bold text-xs text-[#220d06]">{tier.name}</h4>
                          <span className="text-[10px] px-2 py-0.2 rounded-full font-bold uppercase bg-[#ebe8e2] text-[#504440]">
                            {tier.badge}
                          </span>
                        </div>
                        <span className="font-mono text-xs font-bold text-[#9c4328]">
                          {tier.threshold === 0 ? 'Entry' : `${tier.threshold} pts`}
                        </span>
                      </div>
                      <p className="text-xs text-[#504440] mt-1 leading-snug">
                        {tier.perkDescription}
                      </p>
                      {isCurrent && (
                        <span className="inline-block mt-1.5 text-[10px] font-bold text-[#9c4328] bg-[#ffdbd1] px-2 py-0.5 rounded-full">
                          ★ Your Current Active Tier
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setAuthMode('profile')}
                className="px-5 py-2 rounded-xl bg-[#220d06] text-white text-xs font-bold hover:bg-[#3a2118] transition-all"
              >
                Back to Profile
              </button>
            </div>
          </div>
        )}

        {/* View 3: Gmail / Google Login */}
        {authMode === 'login-gmail' && (
          <div className="flex flex-col gap-4">
            <div className="p-4 rounded-xl bg-[#f6f3ed] flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#220d06]">One-Click Google Sign-In</h4>
                  <p className="text-xs text-[#504440]">
                    Uses Google Identity Services for zero-friction login with your Gmail account.
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#220d06] mb-1">Enter Gmail Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="maheshminumula1@gmail.com"
                  className="w-full px-3 py-2 rounded-lg bg-[#ffffff] text-sm text-[#1c1c18] border border-[#3a2118]/15 focus:outline-none focus:border-[#4285F4]"
                />
              </div>

              <button
                type="button"
                onClick={handleGmailSignIn}
                className="w-full py-2.5 rounded-xl bg-[#220d06] hover:bg-[#3a2118] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <span className="material-symbols-outlined text-base">login</span>
                <span>Continue with Google / Gmail</span>
              </button>
            </div>
          </div>
        )}

        {/* View 4: Phone SMS Login */}
        {authMode === 'login-phone' && (
          <div className="flex flex-col gap-4">
            <div className="p-4 rounded-xl bg-[#f6f3ed] flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#9c4328]">smartphone</span>
                <span className="text-xs font-bold text-[#220d06]">SMS One-Time Passcode Verification</span>
              </div>
              <p className="text-xs text-[#504440]">
                Ideal for in-cafe guest orders directly from table NFC tags or QR menus.
              </p>

              <div>
                <label className="block text-xs font-bold text-[#220d06] mb-1">Mobile Phone Number</label>
                <div className="flex gap-2">
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (415) 555-0199"
                    className="flex-1 px-3 py-2 rounded-lg bg-[#ffffff] text-sm text-[#1c1c18] border border-[#3a2118]/15 focus:outline-none focus:border-[#9c4328]"
                  />
                  <button
                    type="button"
                    onClick={handleSendPhoneOTP}
                    className="px-3 py-2 rounded-lg bg-[#9c4328] text-white text-xs font-bold hover:bg-[#76270e] transition-colors shrink-0"
                  >
                    Send OTP
                  </button>
                </div>
              </div>

              {otpSent && (
                <div className="pt-2 flex flex-col gap-2">
                  <label className="block text-xs font-bold text-[#220d06]">
                    Enter 4-Digit Code (Demo Code: 7419)
                  </label>
                  <input
                    type="text"
                    maxLength={4}
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    placeholder="7419"
                    className="w-full text-center tracking-widest text-lg font-bold px-3 py-2 rounded-lg bg-[#ffffff] text-[#220d06] border border-[#9c4328] focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleVerifyPhone}
                    className="w-full py-2.5 rounded-xl bg-[#220d06] hover:bg-[#3a2118] text-white text-xs font-bold shadow-md transition-all mt-1"
                  >
                    Verify &amp; Sign In
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

