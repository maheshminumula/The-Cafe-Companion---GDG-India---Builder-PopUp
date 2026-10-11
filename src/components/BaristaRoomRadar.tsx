import React, { useState } from 'react';

export const BaristaRoomRadar: React.FC = () => {
  const [musicTrimmed, setMusicTrimmed] = useState(false);
  const [burrsCalibrated, setBurrsCalibrated] = useState(false);
  const [alert1Dispatched, setAlert1Dispatched] = useState(false);
  const [alert2Assigned, setAlert2Assigned] = useState(false);
  const [alert3Prepped, setAlert3Prepped] = useState(false);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">
      {/* Sub-header Operator HUD Bar */}
      <section className="w-full p-4 rounded-2xl bg-[#f6f3ed] border border-[#3a2118]/8 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-[#220d06] text-white shadow-sm shrink-0">
            <span className="material-symbols-outlined text-2xl">radar</span>
            <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#9c4328] animate-ping"></span>
            <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#9c4328]"></span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-headline font-bold text-xl text-[#220d06]">Barista Room Radar</span>
              <span className="px-2 py-0.5 rounded-full bg-[#ceead0] text-[#092011] text-[10px] uppercase font-bold tracking-wider">
                Live Telemetry
              </span>
            </div>
            <p className="text-xs text-[#504440]">
              Ambient Audio Intelligence • Privacy-Safe Decibel &amp; Tone Stream via Google Cloud Speech &amp; Gemini 1.5 Pro
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#ebe8e2] text-xs text-[#504440]">
            <span className="material-symbols-outlined text-sm text-[#9c4328]">mic_off</span>
            <span>Zero Raw Audio Stored • Pure Edge Synthetics</span>
          </div>
          <button
            onClick={() => setMusicTrimmed(!musicTrimmed)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all shadow-sm ${
              musicTrimmed
                ? 'bg-[#ceead0] text-[#092011]'
                : 'bg-[#220d06] text-white hover:bg-[#3a2118]'
            }`}
          >
            <span className="material-symbols-outlined text-sm">volume_down</span>
            <span>{musicTrimmed ? 'Applied: Music -3dB' : 'Apply -3dB Music Trim'}</span>
          </button>
        </div>
      </section>

      {/* Top 4 KPI Tiles */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="p-5 rounded-2xl bg-[#ffffff] shadow-sm border border-[#3a2118]/8 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#504440] text-xs font-bold uppercase tracking-wider">
            <span>Acoustic Sentiment</span>
            <span className="material-symbols-outlined text-[#092011] bg-[#ceead0] p-1 rounded-lg text-sm">sentiment_very_satisfied</span>
          </div>
          <div className="my-2 flex items-baseline gap-2">
            <span className="font-headline font-bold text-3xl text-[#220d06]">92%</span>
            <span className="text-xs text-[#092011] font-semibold">Positive / Relaxed</span>
          </div>
          <div className="w-full bg-[#f0eee8] h-1.5 rounded-full overflow-hidden">
            <div className="bg-[#220d06] h-full rounded-full" style={{ width: '92%' }}></div>
          </div>
          <span className="text-[11px] text-[#504440] mt-1">Laughter cadence: +18% vs avg weekday</span>
        </div>

        {/* Metric 2 */}
        <div className="p-5 rounded-2xl bg-[#ffffff] shadow-sm border border-[#3a2118]/8 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#504440] text-xs font-bold uppercase tracking-wider">
            <span>Barista Flow Pace</span>
            <span className="material-symbols-outlined text-[#76270e] bg-[#ffdbd1] p-1 rounded-lg text-sm">speed</span>
          </div>
          <div className="my-2 flex items-baseline gap-2">
            <span className="font-headline font-bold text-3xl text-[#9c4328]">42s</span>
            <span className="text-xs text-[#504440]">/ drink</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-[#9c4328] font-bold">
            <span className="w-2 h-2 rounded-full bg-[#9c4328]"></span>
            <span>Peak Efficiency Zone</span>
          </div>
          <span className="text-[11px] text-[#504440] mt-1">3-drink orders clearing under 2m 10s</span>
        </div>

        {/* Metric 3 */}
        <div className="p-5 rounded-2xl bg-[#ffffff] shadow-sm border border-[#3a2118]/8 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#504440] text-xs font-bold uppercase tracking-wider">
            <span>Steam Wand Telemetry</span>
            <span className="material-symbols-outlined text-[#220d06] bg-[#f0eee8] p-1 rounded-lg text-sm">air</span>
          </div>
          <div className="my-2 flex items-baseline gap-2">
            <span className="font-headline font-bold text-3xl text-[#220d06]">98%</span>
            <span className="text-xs text-[#092011] font-semibold">Optimal Pressure</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#504440]">
            <span>Group 1: 1.42 bar</span>
            <span>•</span>
            <span>Group 2: 1.40 bar</span>
          </div>
          <span className="text-[11px] text-[#504440] mt-1">Purge duty cycle: 100% adherence</span>
        </div>

        {/* Metric 4 */}
        <div className="p-5 rounded-2xl bg-[#ffffff] shadow-sm border border-[#3a2118]/8 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#504440] text-xs font-bold uppercase tracking-wider">
            <span>Acoustic Balance</span>
            <span className="material-symbols-outlined text-[#9c4328] bg-[#f0eee8] p-1 rounded-lg text-sm">equalizer</span>
          </div>
          <div className="my-2 flex items-baseline gap-2">
            <span className="font-headline font-bold text-3xl text-[#220d06]">-3 dB</span>
            <span className="text-xs text-[#9c4328] font-semibold">Adjustment Rec.</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-[#504440]">
            <span className="material-symbols-outlined text-xs text-[#9c4328]">tips_and_updates</span>
            <span>Speech intelligibility boost (+12%)</span>
          </div>
          <span className="text-[11px] text-[#504440] mt-1">Current room noise floor: 56.4 dB</span>
        </div>
      </section>

      {/* Main Radar Cockpit Split Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Spatial Floor Heatmap & Proactive Alerts (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="bg-[#ffffff] rounded-2xl p-6 shadow-sm border border-[#3a2118]/8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4">
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#9c4328]">spatial_audio_off</span>
                  <h3 className="font-headline font-bold text-lg text-[#220d06]">
                    Spatial Floor Acoustic Heatmap
                  </h3>
                </div>
                <p className="text-xs text-[#504440]">Real-time tone warmth, dwell duration, and occupancy zones</p>
              </div>
              <span className="text-xs font-bold text-[#220d06] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#9c4328] animate-pulse"></span> 14 Tables Active
              </span>
            </div>

            {/* Stylized Floor Radar */}
            <div className="relative w-full h-72 rounded-xl bg-[#f0eee8] overflow-hidden p-4 flex flex-col justify-between border border-[#3a2118]/8">
              <svg className="absolute inset-0 w-full h-full opacity-15 pointer-events-none">
                <circle cx="50%" cy="50%" r="80" stroke="#220d06" strokeDasharray="4 4" fill="none" />
                <circle cx="50%" cy="50%" r="130" stroke="#9c4328" fill="none" />
              </svg>

              <div className="relative z-10 flex items-center justify-between text-xs">
                <span className="px-2.5 py-1 rounded-md bg-white/90 backdrop-blur font-semibold text-[#1c1c18]">
                  Main Hall • Front Counter • Patio
                </span>
                <span className="px-2.5 py-1 rounded-md bg-white/90 backdrop-blur font-semibold text-[#1c1c18] flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#9c4328]"></span> 78 Total Guests
                </span>
              </div>

              {/* Spatial Nodes */}
              <div className="relative z-10 grid grid-cols-3 gap-3 my-auto">
                <div className="p-3 rounded-xl bg-white/95 shadow-sm border border-[#3a2118]/5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-[#220d06]">Counter &amp; Bar</span>
                    <span className="text-[#9c4328] font-bold">Fast</span>
                  </div>
                  <div className="text-[11px] text-[#504440] mt-1 flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">coffee_maker</span>
                    <span>4 queue • 42s</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#ffdbd1] text-[#76270e] shadow-sm border border-[#ff8f6e] animate-pulse">
                  <div className="flex justify-between items-center text-xs font-bold">
                    <span>Table 7</span>
                    <span>3h Dwell</span>
                  </div>
                  <div className="text-[11px] mt-1 font-medium">Empty cups lingering</div>
                </div>

                <div className="p-3 rounded-xl bg-white/95 shadow-sm border border-[#3a2118]/5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-[#220d06]">Table 14</span>
                    <span className="text-[#092011] font-bold">96% Vibe</span>
                  </div>
                  <div className="text-[11px] text-[#504440] mt-1 flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">groups</span>
                    <span>7 patrons</span>
                  </div>
                </div>
              </div>

              <div className="relative z-10 flex items-center justify-between text-[11px] text-[#504440]">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#9c4328]"></span> High Attention</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#ceead0]"></span> Harmonious Tone</span>
                </div>
                <span>Scan Rate: 500ms</span>
              </div>
            </div>

            {/* Ambient Audio Bar */}
            <div className="mt-4 p-4 rounded-xl bg-[#f6f3ed] flex flex-col gap-2">
              <div className="flex items-center justify-between text-xs">
                <span className="uppercase text-[#504440] font-bold">Synthesized Tone &amp; Laughter Analysis</span>
                <span className="text-[#9c4328] font-bold">Peak Social Frequency</span>
              </div>
              <div className="h-8 flex items-end gap-1 w-full pt-1">
                {[16, 28, 36, 24, 32, 40, 20, 36, 16, 28, 24, 32, 20, 12].map((val, i) => (
                  <div
                    key={i}
                    className={`flex-1 rounded-t ${i % 3 === 0 ? 'bg-[#9c4328]' : 'bg-[#220d06]'}`}
                    style={{ height: `${val}px` }}
                  />
                ))}
              </div>
              <div className="flex items-center justify-between text-[11px] text-[#504440]">
                <span>Warm Conversation • 240-480 Hz</span>
                <span>Laughter Bursts: 14 / min</span>
                <span>No Clatter / Low Echo</span>
              </div>
            </div>
          </div>

          {/* Proactive Service Alerts */}
          <div className="bg-[#ffffff] rounded-2xl p-6 shadow-sm border border-[#3a2118]/8 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#9c4328]">notification_important</span>
                <h3 className="font-headline font-bold text-lg text-[#220d06]">
                  Proactive Hospitality Alerts
                </h3>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-[#ffdbd1] text-[#76270e] text-xs font-bold">
                3 Live
              </span>
            </div>

            <div className="flex flex-col gap-3">
              {/* Alert 1 */}
              <div className="p-4 rounded-xl bg-[#fff2ee] border border-[#ffdbd1] flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-[#9c4328] text-white text-[10px] font-bold uppercase">
                      Priority Service
                    </span>
                    <span className="text-xs font-bold text-[#220d06]">Table 7: Prolonged Empty Cups</span>
                  </div>
                  <span className="text-[11px] text-[#504440]">2 mins ago</span>
                </div>
                <p className="text-xs text-[#1c1c18]">
                  Solo guest working for 3h 12m. Ambient sensor detected cup empty for &gt;45m without re-order.
                </p>
                <div className="p-2.5 rounded-lg bg-white flex items-center justify-between gap-2">
                  <span className="text-xs text-[#504440]">
                    Action: Offer chilled sparkling water refresh or complimentary seasonal batch sip.
                  </span>
                  <button
                    onClick={() => setAlert1Dispatched(true)}
                    className="px-3 py-1 rounded-full bg-[#220d06] text-white text-xs font-bold shrink-0"
                  >
                    {alert1Dispatched ? 'Dispatched' : 'Acknowledge • Dispatch'}
                  </button>
                </div>
              </div>

              {/* Alert 2 */}
              <div className="p-4 rounded-xl bg-[#f6f3ed] border border-[#3a2118]/5 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-[#ebe8e2] text-[#220d06] text-[10px] font-bold uppercase">
                      Facility Ops
                    </span>
                    <span className="text-xs font-bold text-[#220d06]">Patio Heating Lamp 2: Low Gas</span>
                  </div>
                  <span className="text-[11px] text-[#504440]">7 mins ago</span>
                </div>
                <p className="text-xs text-[#504440]">
                  Thermal sensor reports heat output dropped below 34°C threshold. Tank estimated at &lt;8% capacity.
                </p>
                <div className="p-2.5 rounded-lg bg-white flex items-center justify-between gap-2">
                  <span className="text-xs text-[#504440]">
                    Action: Swap reserve 20lb propane tank in rear garden storage.
                  </span>
                  <button
                    onClick={() => setAlert2Assigned(true)}
                    className="px-3 py-1 rounded-full bg-[#ebe8e2] hover:bg-[#dcdad4] text-[#220d06] text-xs font-bold shrink-0"
                  >
                    {alert2Assigned ? 'Assigned' : 'Assign Staff'}
                  </button>
                </div>
              </div>

              {/* Alert 3 */}
              <div className="p-4 rounded-xl bg-[#f6f3ed] border border-[#3a2118]/5 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-[#ceead0] text-[#092011] text-[10px] font-bold uppercase">
                      Google Predictive Forecast
                    </span>
                    <span className="text-xs font-bold text-[#220d06]">Incoming Peak Rush (+35 guests)</span>
                  </div>
                  <span className="text-[11px] text-[#9c4328] font-bold">T-14:20</span>
                </div>
                <p className="text-xs text-[#504440]">
                  Downtown Tech Keynote session finishes at 10:45 AM (0.2 mi away, Google Calendar / Public Event sync).
                </p>
                <div className="p-2.5 rounded-lg bg-white flex items-center justify-between gap-2">
                  <span className="text-xs text-[#504440]">
                    Action: Pre-grind 4L batch brew (Ethiopia Sidama) &amp; prep extra dairy carafes.
                  </span>
                  <button
                    onClick={() => setAlert3Prepped(true)}
                    className="px-3 py-1 rounded-full bg-[#220d06] text-white text-xs font-bold shrink-0"
                  >
                    {alert3Prepped ? 'Prepped' : 'Prepped • Ready'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Dark Barista Console & Live Inventory (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Dark Console */}
          <div className="rounded-2xl bg-[#220d06] text-white p-6 shadow-md flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#ff8f6e]">tune</span>
                <span className="font-headline font-bold text-base text-white">Grinder &amp; Extraction Terminal</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#3a2118] text-[#ffdbd1] text-[10px] font-bold">
                EK43 Dial Live
              </span>
            </div>

            <div className="p-4 rounded-xl bg-white/10 backdrop-blur flex flex-col gap-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#d4c3be] uppercase">Atmospheric Drift Engine</span>
                <span className="text-[#ff8f6e] font-bold">+14% Humidity Shift</span>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="font-headline font-bold text-3xl text-white">28.4s</span>
                <span className="text-xs text-[#d4c3be]">extraction drift (+1.2s since 08:00 AM)</span>
              </div>

              <div className="p-3 rounded-lg bg-white/10 text-xs">
                <strong className="text-[#ffdbd1]">Gemini Dial Guidance: </strong>
                Adjust Mahlkönig EK43 finer by <strong>0.5 notches</strong> (from 4.2 → 3.7) to lock target 28s / 36g espresso yield.
              </div>

              <div className="flex items-center justify-between pt-1">
                <div className="flex flex-col">
                  <span className="text-[10px] text-[#d4c3be]">Current Dial</span>
                  <span className="text-lg font-bold text-white">4.2</span>
                </div>
                <span className="material-symbols-outlined text-[#d4c3be]">arrow_forward</span>
                <div className="flex flex-col items-end">
                  <span className="text-[10px] text-[#ffdbd1]">Target Setting</span>
                  <span className="text-lg font-bold text-[#ffdbd1]">3.7 Fine</span>
                </div>
              </div>

              <button
                onClick={() => setBurrsCalibrated(true)}
                className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm ${
                  burrsCalibrated
                    ? 'bg-[#ceead0] text-[#092011]'
                    : 'bg-[#9c4328] text-white hover:bg-[#ff8f6e] hover:text-[#76270e]'
                }`}
              >
                {burrsCalibrated ? 'Calibrated • Burrs Locked' : 'Confirm Burrs Repositioned'}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-white/10 flex flex-col">
                <span className="text-[10px] text-[#d4c3be]">Wand Left (Oat)</span>
                <div className="my-1 flex items-baseline gap-1">
                  <span className="font-headline font-bold text-xl text-white">1.42</span>
                  <span className="text-xs text-[#d4c3be]">bar</span>
                </div>
                <span className="text-[10px] text-[#ceead0] font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ceead0]"></span> Microfoam Ideal
                </span>
              </div>

              <div className="p-3 rounded-xl bg-white/10 flex flex-col">
                <span className="text-[10px] text-[#d4c3be]">Wand Right (Whole)</span>
                <div className="my-1 flex items-baseline gap-1">
                  <span className="font-headline font-bold text-xl text-white">1.40</span>
                  <span className="text-xs text-[#d4c3be]">bar</span>
                </div>
                <span className="text-[10px] text-[#ceead0] font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ceead0]"></span> Heat Stable
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-1 text-center">
              <button className="py-2 rounded-lg bg-white/10 hover:bg-white/20 text-[11px] font-medium transition-colors">
                Portafilter Bath
              </button>
              <button className="py-2 rounded-lg bg-white/10 hover:bg-white/20 text-[11px] font-medium transition-colors">
                Pitcher Rinser OK
              </button>
              <button className="py-2 rounded-lg bg-white/10 hover:bg-white/20 text-[11px] font-medium transition-colors">
                Puck Bin Cleared
              </button>
            </div>
          </div>

          {/* Live Inventory Telemetry */}
          <div className="bg-[#ffffff] rounded-2xl p-6 shadow-sm border border-[#3a2118]/8 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#9c4328]">inventory_2</span>
                <h3 className="font-headline font-bold text-base text-[#220d06]">
                  Live Inventory Telemetry
                </h3>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#ceead0] text-[#092011] text-[10px] font-bold">
                Auto-Sync On
              </span>
            </div>

            <div className="p-4 rounded-xl bg-[#fff2ee] border border-[#ffdbd1] flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#9c4328] text-sm">warning</span>
                  <span className="text-xs font-bold text-[#220d06]">Barista Edition Oat Milk</span>
                </div>
                <span className="text-xs font-bold text-[#9c4328]">22% Stock</span>
              </div>
              <div className="w-full bg-[#f0eee8] h-2 rounded-full overflow-hidden">
                <div className="bg-[#9c4328] h-full rounded-full" style={{ width: '22%' }}></div>
              </div>
              <p className="text-xs text-[#504440]">
                Burn rate: 8.4 cartons/hour. Stock will breach safe reserve by 11:30 AM.
              </p>
              <div className="p-2 rounded-lg bg-white text-[11px] flex items-center justify-between text-[#504440]">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs text-[#9c4328]">cloud_done</span>
                  Google Cloud connector queued 4 cases
                </span>
                <strong className="text-[#9c4328]">ETA 12:15 PM</strong>
              </div>
            </div>

            <div className="flex flex-col gap-2.5 text-xs">
              <div className="flex items-center justify-between p-2 rounded-lg bg-[#f6f3ed]">
                <span className="font-medium text-[#220d06]">House Espresso (Colombia Huila)</span>
                <span className="font-bold text-[#092011]">14.8 kg Healthy</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-[#f6f3ed]">
                <span className="font-medium text-[#220d06]">Organic Whole Dairy</span>
                <span className="font-bold text-[#092011]">32 gal Healthy</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-[#fff2ee]">
                <span className="font-medium text-[#220d06]">Biodegradable Takeaway Lids (8oz)</span>
                <span className="font-bold text-[#9c4328]">110 left Restock</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Reality Strip */}
      <section className="bg-[#f6f3ed] p-6 rounded-2xl border border-[#3a2118]/8 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-headline font-bold text-lg text-[#220d06]">Physical Flow &amp; Sensory Harmony</h3>
            <p className="text-xs text-[#504440]">Visual audit of seating balance, extraction density, and natural room comfort</p>
          </div>
          <span className="text-xs text-[#504440]">Station Calibration: Continuous</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col gap-1.5">
            <div className="h-44 rounded-xl overflow-hidden shadow-sm relative">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwqhF-O9NzuqMKYYbrOOKEVrbofmInfOl0nC-KCQ-bBKXW8tEj23ToUiuktWMb9W-uRy22TGdMKtcfiLsPhXLLr5geVVNAgRP5uJFkn5WNm_s4o34zKQjcBS05tXGHOU86oamrtuBj9O6xuq2cHMxeBpUNG-QkL1QcixHQn-B7M_7U2o5JCQzgO6mJHRfBRRC6UQu1ubdomP77BI7wTB0R_PwVOa5lwzxPCqzxlR5acuOZzXFHynVt"
                alt="Espresso Hearth"
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-white/90 backdrop-blur text-[11px] font-bold text-[#220d06]">
                Espresso Hearth • Group 1 &amp; 2
              </span>
            </div>
            <span className="text-[11px] text-[#504440]">42s pace maintained across 18 flat whites</span>
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="h-44 rounded-xl overflow-hidden shadow-sm relative">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDPW23so0jVFjiurqE0_5mEu96rkqd01XtJM0J1DZtJV5Y0av-E8q6v7rYl3zal6_ZaqHszCrWr3yOS2RzC1_3a0UT0GgFGyM-aUDKtCwQqKJ_-iCVF8waI2Zv3vIhXjxGAuM-C87dycMTK-RKXP8Qo6auS2FtPQLq73k1CfeV6-Tzh1Vh-M-6ToZwrgykDT7wxNyxfRrjbNPiZGQYKK2LRDFkp-tcgLhOdFikk7blmTKqX-rf4KS1i"
                alt="Communal Hearth"
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-white/90 backdrop-blur text-[11px] font-bold text-[#220d06]">
                Communal Hearth • Section B
              </span>
            </div>
            <span className="text-[11px] text-[#504440]">Acoustic absorption: 54 dB stable</span>
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="h-44 rounded-xl overflow-hidden shadow-sm relative">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDPCTb2PT1gO2BrQ6rcK8y3PKlIh5BcP6GymW5Rq2GdMuIeTCT5yY3jp0hHOLFpYsBWQqNnk-yF1oagQuiRD5AQeJCDg-pmnenFkVKuNJdZ1Zuoedj8Mu74uKbadRB0mKxp75qI78wV99h4eRDO0UIugPAVslLMiKVtLB3nB3Asr50bSxMZCPYrRTzZqXO1sTg46qI76fITwrA935SFUddV0Hx_NtNyTLL8BTC5f2xLbR_0kVuADTDS"
                alt="Patio Garden"
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-white/90 backdrop-blur text-[11px] font-bold text-[#220d06]">
                Patio Garden • Table 18-24
              </span>
            </div>
            <span className="text-[11px] text-[#504440]">Heater 2 propane swap scheduled</span>
          </div>
        </div>
      </section>
    </div>
  );
};
