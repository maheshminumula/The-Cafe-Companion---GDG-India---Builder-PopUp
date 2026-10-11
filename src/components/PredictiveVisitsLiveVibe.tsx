import React, { useState, useEffect } from 'react';

export const PredictiveVisitsLiveVibe: React.FC = () => {
  const [liveDb, setLiveDb] = useState(52);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stationType, setStationType] = useState('Quiet Booth #04 (Library)');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const delta = Math.floor(Math.random() * 3) - 1;
      setLiveDb((prev) => Math.min(Math.max(prev + delta, 50), 55));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleConfirmReservation = () => {
    setBookingConfirmed(true);
    setTimeout(() => {
      setBookingConfirmed(false);
      setIsModalOpen(false);
    }, 1500);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-10">
      {/* Top Editorial Header & Telemetry Badge */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#9c4328] animate-ping"></span>
            <span className="text-xs uppercase tracking-widest text-[#9c4328] font-bold">
              Real-time Telemetry • Vertex AI Predictive Engine
            </span>
          </div>
          <h1 className="font-headline font-bold text-3xl sm:text-4xl lg:text-5xl text-[#220d06] tracking-tight leading-tight">
            Live Vibe &amp; Predictive Visits
          </h1>
          <p className="font-body-md text-sm sm:text-base text-[#504440] mt-2 max-w-2xl">
            Continuous multimodal acoustics, crowd density radar, and machine-learning wait forecasting for mindful work, deep conversation, and seamless arrivals.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-[#ebe8e2] px-5 py-2.5 rounded-full shadow-sm self-start md:self-auto border border-[#3a2118]/5">
          <span className="material-symbols-outlined text-[#9c4328] text-xl">sensors</span>
          <div className="flex flex-col">
            <span className="text-[10px] text-[#504440] uppercase tracking-wider font-bold">Telemetry State</span>
            <span className="text-xs text-[#220d06] font-bold">14 Sensors Streaming • 99.8% Confidence</span>
          </div>
        </div>
      </div>

      {/* Bento Section 1: Noise Spectrum & Seating Visuals */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Acoustic Resonance Meter (7 Cols) */}
        <div className="lg:col-span-7 bg-[#ffffff] p-6 sm:p-8 rounded-2xl shadow-sm border border-[#3a2118]/8 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute -right-16 -top-16 w-64 h-64 bg-[#ffdbd1]/30 rounded-full blur-3xl pointer-events-none"></div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#9c4328] text-2xl">graphic_eq</span>
                <span className="text-sm font-bold text-[#220d06]">Acoustic Resonance Meter</span>
              </div>
              <span className="px-3 py-1 bg-[#ceead0] text-[#092011] text-xs font-bold rounded-full">
                Co-working Sweet Spot
              </span>
            </div>

            <div className="flex items-baseline gap-2 my-4">
              <span className="font-headline font-bold text-5xl sm:text-6xl text-[#220d06] leading-none">
                {liveDb}
              </span>
              <span className="text-lg text-[#504440] font-semibold">dB</span>
              <span className="text-xs text-[#504440] ml-2">• Soft Lo-Fi Beats &amp; Espresso Steam Hiss</span>
            </div>

            {/* Audio Wave Spectrum Graphic */}
            <div className="w-full bg-[#f6f3ed] p-4 rounded-xl mb-4 border border-[#3a2118]/5">
              <div className="flex items-end justify-between h-20 gap-1.5 px-2">
                {[45, 60, 38, 52, 70, 55, 48, 64, 51, 42, 35, 58, 49, 30].map((h, i) => (
                  <div
                    key={i}
                    className="w-full bg-[#9c4328]/85 hover:bg-[#220d06] rounded-full transition-all duration-300"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
              <div className="flex justify-between items-center mt-2 text-[#504440] text-[11px] px-1 font-medium">
                <span>35 dB (Library Whispers)</span>
                <span className="text-[#9c4328] font-bold">52 dB (Optimal Focus)</span>
                <span>75 dB (Chatter Burst)</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
            <div className="bg-[#f6f3ed] p-3 rounded-xl border border-[#3a2118]/5">
              <span className="text-[10px] text-[#504440] uppercase font-bold block">Spatial Reverberation</span>
              <span className="font-headline font-bold text-lg text-[#220d06]">0.42 s</span>
            </div>
            <div className="bg-[#f6f3ed] p-3 rounded-xl border border-[#3a2118]/5">
              <span className="text-[10px] text-[#504440] uppercase font-bold block">Speech Intelligibility</span>
              <span className="font-headline font-bold text-lg text-[#220d06]">Low (Discreet)</span>
            </div>
            <div className="bg-[#f6f3ed] p-3 rounded-xl border border-[#3a2118]/5 col-span-2 sm:col-span-1">
              <span className="text-[10px] text-[#504440] uppercase font-bold block">Current Playlist</span>
              <span className="text-xs text-[#220d06] font-bold truncate block">Warm Analog Vinyl 04</span>
            </div>
          </div>
        </div>

        {/* Live Capacity Radar & Atmospheric Visual (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="relative rounded-2xl overflow-hidden shadow-sm h-48 group border border-[#3a2118]/8">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAj2bJ8cIo5bGXDs_KIuTRkmmmpXV5g3x8FSTnQ6I8lgf1mTaL5Msi4-w4Sd7UopLKsxhTh5e4yHUDBWccWlX7K2UC8IDoj350PNIaBMYJ9QwY7eFpZcOpKbH2C6Xki6LTzVCLuEWDLWMjO4pVOHh4ITZdKGstwyAnIbAVpXqYTYUAnarlDwt4f8MJfFpkEZGHjBKmfWWvxWxvUDFG-Iu-CwGbHH6Pv13gLvgu0ESAXFwyeTL2XgdeU"
              alt="Artisanal Cafe Interior"
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#220d06]/80 via-[#220d06]/30 to-transparent flex flex-col justify-end p-5 text-white">
              <span className="text-[10px] text-[#ffdbd1] uppercase tracking-widest font-bold">
                Main Hall • Downtown SF Hub
              </span>
              <span className="font-headline font-bold text-base sm:text-lg">
                Sunlight Influx: High Contrast Working Corner
              </span>
            </div>
          </div>

          <div className="bg-[#ffffff] p-6 rounded-2xl shadow-sm border border-[#3a2118]/8 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#9c4328] text-lg">chair</span>
                <span className="text-xs font-bold text-[#220d06]">Crowd Density &amp; Seating</span>
              </div>
              <span className="text-xs text-[#504440] font-semibold">38 / 55 Seats Taken</span>
            </div>

            <div className="w-full bg-[#ebe8e2] h-3 rounded-full overflow-hidden mb-2">
              <div className="bg-[#9c4328] h-full rounded-full transition-all duration-500" style={{ width: '72%' }}></div>
            </div>

            <div className="flex items-center justify-between text-xs text-[#504440] mb-4">
              <span>72% Live Occupancy</span>
              <span className="text-[#9c4328] font-bold">17 Seats Ready</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="bg-[#f6f3ed] p-2.5 rounded-xl flex items-center gap-2 border border-[#3a2118]/5">
                <span className="material-symbols-outlined text-[#9c4328] text-base">deck</span>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[#220d06]">Outdoor Patio</span>
                  <span className="text-[11px] text-[#504440]">4 tables free (Heaters On)</span>
                </div>
              </div>
              <div className="bg-[#f6f3ed] p-2.5 rounded-xl flex items-center gap-2 border border-[#3a2118]/5">
                <span className="material-symbols-outlined text-[#9c4328] text-base">window</span>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[#220d06]">Window Bench</span>
                  <span className="text-[11px] text-[#504440]">2 seats vacant</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cloud IoT Sensors 4-Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#ffffff] p-5 rounded-2xl shadow-sm border border-[#3a2118]/8 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="material-symbols-outlined text-[#9c4328] text-2xl">electrical_services</span>
            <span className="px-2 py-0.5 bg-[#ffdbd1] text-[#76270e] text-[10px] rounded-full font-bold">
              North Wall
            </span>
          </div>
          <div>
            <span className="font-headline font-bold text-lg text-[#220d06]">8 Outlets Free</span>
            <p className="text-xs text-[#504440] mt-1">
              High-speed 100W USB-C &amp; grounded AC ports unreserved near oak bar.
            </p>
          </div>
          <div className="mt-4 pt-2 border-t border-[#3a2118]/5 flex items-center gap-1.5 text-[11px] text-[#504440]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#9c4328]"></span>
            <span>Verified 3m ago via floor sensors</span>
          </div>
        </div>

        <div className="bg-[#ffffff] p-5 rounded-2xl shadow-sm border border-[#3a2118]/8 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="material-symbols-outlined text-[#9c4328] text-2xl">wifi</span>
            <span className="px-2 py-0.5 bg-[#ceead0] text-[#092011] text-[10px] rounded-full font-bold">
              Google Fiber
            </span>
          </div>
          <div>
            <span className="font-headline font-bold text-lg text-[#220d06]">850 Mbps</span>
            <p className="text-xs text-[#504440] mt-1">
              Ultra-low latency (4ms ping) dedicated guest mesh with Wi-Fi 6E protocol.
            </p>
          </div>
          <div className="mt-4 pt-2 border-t border-[#3a2118]/5 flex items-center gap-1.5 text-[11px] text-[#504440]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#092011]"></span>
            <span>Zero packet loss detected</span>
          </div>
        </div>

        <div className="bg-[#ffffff] p-5 rounded-2xl shadow-sm border border-[#3a2118]/8 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="material-symbols-outlined text-[#9c4328] text-2xl">thermostat</span>
            <span className="px-2 py-0.5 bg-[#ebe8e2] text-[#504440] text-[10px] rounded-full font-bold">
              Cloud IoT
            </span>
          </div>
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-headline font-bold text-lg text-[#220d06]">68°F</span>
              <span className="text-xs text-[#504440]">• 44% Humidity</span>
            </div>
            <p className="text-xs text-[#504440] mt-1">
              Natural Daylight Index: <strong className="text-[#220d06]">84%</strong> (Indirect solar angle optimal).
            </p>
          </div>
          <div className="mt-4 pt-2 border-t border-[#3a2118]/5 flex items-center gap-1.5 text-[11px] text-[#504440]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#9c4328]"></span>
            <span>Smart HVAC active airflow</span>
          </div>
        </div>

        <div className="bg-[#ffffff] p-5 rounded-2xl shadow-sm border border-[#3a2118]/8 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="material-symbols-outlined text-[#9c4328] text-2xl">air</span>
            <span className="px-2 py-0.5 bg-[#ceead0] text-[#092011] text-[10px] rounded-full font-bold">
              HEPA H13
            </span>
          </div>
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-headline font-bold text-lg text-[#220d06]">AQI 18</span>
              <span className="text-xs text-[#092011] font-bold">Excellent</span>
            </div>
            <p className="text-xs text-[#504440] mt-1">
              CO2 concentration 490 ppm. Ultra-pure air filtration supporting cognitive clarity.
            </p>
          </div>
          <div className="mt-4 pt-2 border-t border-[#3a2118]/5 flex items-center gap-1.5 text-[11px] text-[#504440]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#092011]"></span>
            <span>Sensor ID: IOT-AQ-09</span>
          </div>
        </div>
      </div>

      {/* Hourly Forecast Chart & Reservation Bar */}
      <div className="bg-[#ffffff] p-6 sm:p-8 rounded-2xl shadow-sm border border-[#3a2118]/8 flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-1.5 mb-1">
              <span className="material-symbols-outlined text-[#9c4328] text-base">timeline</span>
              <span className="text-xs font-bold text-[#9c4328] uppercase tracking-wider">
                Predictive Visits Horizon
              </span>
            </div>
            <h2 className="font-headline font-bold text-2xl text-[#220d06]">
              Live Telemetry &amp; Vertex AI Wait-Time Forecast
            </h2>
            <p className="text-xs text-[#504440] mt-1">
              Aggregating historical mobile footfall data, weather variables, transit arrivals, and espresso bar throughput.
            </p>
          </div>

          <div className="bg-[#f6f3ed] p-4 rounded-xl flex items-center gap-3 border border-[#3a2118]/5">
            <div className="w-10 h-10 rounded-full bg-[#220d06] flex items-center justify-center text-white shrink-0">
              <span className="material-symbols-outlined text-xl">star_rate</span>
            </div>
            <div>
              <span className="text-[10px] text-[#504440] uppercase tracking-wider block font-bold">
                Recommended Focus Slot
              </span>
              <span className="text-xs font-bold text-[#220d06]">Optimal Arrival: 10:45 AM</span>
              <span className="text-[11px] text-[#9c4328] font-bold block">Wait time &lt; 2 mins • 9 Quiet Booths</span>
            </div>
          </div>
        </div>

        {/* Timeline SVG Chart */}
        <div className="w-full bg-[#f6f3ed] p-6 rounded-xl border border-[#3a2118]/5 relative">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2 text-xs">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-[#220d06]"></span>
                <span className="font-bold text-[#220d06]">Live Real-time Density</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-[#d4c3be]"></span>
                <span className="text-[#504440]">Historical 4-Week Median</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-[#9c4328]"></span>
                <span className="text-[#9c4328] font-bold">Vertex AI Machine Projection</span>
              </div>
            </div>
            <span className="text-[#504440] text-[11px]">Last model fine-tune: 2 mins ago</span>
          </div>

          <div className="relative w-full h-48 sm:h-56">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 900 200" preserveAspectRatio="none">
              <defs>
                <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#9c4328" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#9c4328" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <line x1="0" y1="40" x2="900" y2="40" stroke="#e5e2dc" strokeDasharray="4 4" />
              <line x1="0" y1="90" x2="900" y2="90" stroke="#e5e2dc" strokeDasharray="4 4" />
              <line x1="0" y1="140" x2="900" y2="140" stroke="#e5e2dc" strokeDasharray="4 4" />
              <path d="M 0,140 Q 90,80 180,60 T 360,110 T 540,65 T 720,130 T 900,160" fill="none" stroke="#d4c3be" strokeDasharray="5 5" strokeWidth="2.5" />
              <path d="M 270,95 Q 360,135 450,140 T 630,70 T 810,120 T 900,155 L 900,190 L 270,190 Z" fill="url(#chartGradient)" />
              <path d="M 270,95 Q 360,135 450,140 T 630,70 T 810,120 T 900,155" fill="none" stroke="#9c4328" strokeWidth="3" />
              <path d="M 0,140 Q 90,75 180,65 T 270,95" fill="none" stroke="#220d06" strokeLinecap="round" strokeWidth="4" />
              <circle cx="270" cy="95" r="7" fill="#220d06" />
              <circle cx="270" cy="95" r="14" fill="#9c4328" fillOpacity="0.2" className="animate-ping" />
              <circle cx="360" cy="135" r="6" fill="#9c4328" />
            </svg>

            {/* Pins */}
            <div className="absolute left-[30%] top-[25%] -translate-x-1/2 -translate-y-full bg-[#ebe8e2] px-2 py-0.5 rounded shadow text-center">
              <span className="text-[11px] font-bold text-[#220d06]">Now (10:15)</span>
            </div>
            <div className="absolute left-[40%] top-[50%] -translate-x-1/2 -translate-y-full bg-[#220d06] text-white px-2 py-1 rounded shadow-md text-center">
              <span className="text-xs font-bold block">10:45 AM</span>
              <span className="text-[10px] text-[#ffdbd1] block">&lt; 2m wait</span>
            </div>
          </div>

          <div className="grid grid-cols-11 text-center text-xs text-[#504440] pt-4 font-mono">
            <span>8 AM</span>
            <span>9 AM</span>
            <span className="font-bold text-[#220d06]">10 AM</span>
            <span className="font-bold text-[#9c4328]">11 AM</span>
            <span>12 PM</span>
            <span>1 PM</span>
            <span>2 PM</span>
            <span>3 PM</span>
            <span>4 PM</span>
            <span>5 PM</span>
            <span>6 PM</span>
          </div>
        </div>

        {/* Live Barista Counter & Reserve Station Button */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
          <div className="lg:col-span-7 bg-[#f6f3ed] p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 border border-[#3a2118]/5">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-[#ebe8e2] flex items-center justify-center text-[#9c4328]">
                <span className="material-symbols-outlined text-2xl">coffee_maker</span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] text-[#504440] uppercase tracking-wider font-bold">Live Barista Counter</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#092011]"></span>
                </div>
                <span className="font-headline font-bold text-base text-[#220d06] block">
                  Current Queue: 4 orders
                </span>
                <span className="text-xs text-[#504440]">Estimated extraction &amp; pour delay: ~4.5 mins</span>
              </div>
            </div>

            <div className="flex sm:flex-col items-end justify-between sm:justify-center w-full sm:w-auto">
              <span className="text-[11px] text-[#504440]">Steam Wand Load</span>
              <div className="flex items-center gap-1 mt-1">
                <span className="w-2 h-5 rounded bg-[#9c4328]"></span>
                <span className="w-2 h-5 rounded bg-[#9c4328]"></span>
                <span className="w-2 h-5 rounded bg-[#dcdad4]"></span>
                <span className="w-2 h-5 rounded bg-[#dcdad4]"></span>
                <span className="text-xs font-bold text-[#220d06] ml-1">50%</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full bg-[#220d06] hover:bg-[#3a2118] text-white py-3.5 px-6 rounded-xl font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-lg">event_available</span>
              <span>Reserve Quiet Booth or Window Bench</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3 Zones Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#ffffff] p-6 rounded-2xl shadow-sm border border-[#3a2118]/8 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-headline font-bold text-lg text-[#220d06]">The Library Nook</span>
              <span className="px-2 py-0.5 bg-[#ceead0] text-[#092011] text-[10px] rounded-full font-bold">Deep Work</span>
            </div>
            <p className="text-xs text-[#504440] mb-4">Acoustically damp walnut baffles, personal power terminals, zero background espresso grinders.</p>
            <div className="space-y-2 mb-4 text-xs">
              <div className="flex justify-between">
                <span className="text-[#504440]">Sound Level</span>
                <strong className="text-[#220d06]">44 dB • Whispers</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#504440]">Seat Availability</span>
                <strong className="text-[#9c4328]">3 Booths Vacant</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#504440]">Charging Ports</span>
                <strong className="text-[#220d06]">100% Outlets Free</strong>
              </div>
            </div>
          </div>
          <button
            onClick={() => { setStationType('Quiet Booth #04 (Library)'); setIsModalOpen(true); }}
            className="w-full bg-[#f6f3ed] hover:bg-[#ebe8e2] text-[#220d06] py-2 rounded-xl text-xs font-bold transition-colors"
          >
            Claim Spot in Nook
          </button>
        </div>

        <div className="bg-[#ffffff] p-6 rounded-2xl shadow-sm border border-[#3a2118]/8 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-headline font-bold text-lg text-[#220d06]">Espresso Social Bar</span>
              <span className="px-2 py-0.5 bg-[#ffdbd1] text-[#76270e] text-[10px] rounded-full font-bold">Lively</span>
            </div>
            <p className="text-xs text-[#504440] mb-4">Barista interactions, single-origin tastings, upbeat conversation, and sensory brew stations.</p>
            <div className="space-y-2 mb-4 text-xs">
              <div className="flex justify-between">
                <span className="text-[#504440]">Sound Level</span>
                <strong className="text-[#220d06]">61 dB • Vibrant Lo-Fi</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#504440]">Seat Availability</span>
                <strong className="text-[#220d06]">5 Bar Stools Vacant</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#504440]">Charging Ports</span>
                <span className="text-[#504440]">Limited USB-A</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => { setStationType('Espresso Social Bar #02'); setIsModalOpen(true); }}
            className="w-full bg-[#f6f3ed] hover:bg-[#ebe8e2] text-[#220d06] py-2 rounded-xl text-xs font-bold transition-colors"
          >
            View Tasting Schedule
          </button>
        </div>

        <div className="bg-[#ffffff] p-6 rounded-2xl shadow-sm border border-[#3a2118]/8 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-headline font-bold text-lg text-[#220d06]">Heated Sun Patio</span>
              <span className="px-2 py-0.5 bg-[#ceead0] text-[#092011] text-[10px] rounded-full font-bold">Fresh Air</span>
            </div>
            <p className="text-xs text-[#504440] mb-4">Natural daylight, radiant overhead gas heaters, pet friendly, breezy city acoustics.</p>
            <div className="space-y-2 mb-4 text-xs">
              <div className="flex justify-between">
                <span className="text-[#504440]">Sound Level</span>
                <strong className="text-[#220d06]">54 dB • Ambient Breeze</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#504440]">Seat Availability</span>
                <strong className="text-[#9c4328]">4 Tables Ready</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#504440]">Weather Shield</span>
                <strong className="text-[#220d06]">Heaters Active (72°F)</strong>
              </div>
            </div>
          </div>
          <button
            onClick={() => { setStationType('Heated Patio Table #21'); setIsModalOpen(true); }}
            className="w-full bg-[#f6f3ed] hover:bg-[#ebe8e2] text-[#220d06] py-2 rounded-xl text-xs font-bold transition-colors"
          >
            Hold Outdoor Table
          </button>
        </div>
      </div>

      {/* Reservation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#220d06]/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#ffffff] max-w-lg w-full rounded-2xl p-6 sm:p-8 shadow-2xl border border-[#3a2118]/10 flex flex-col gap-4 relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#9c4328]">chair</span>
                <h3 className="font-headline font-bold text-xl text-[#220d06]">Reserve Focus Station</h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-[#f0eee8] flex items-center justify-center text-[#504440]"
              >
                <span className="material-symbols-outlined text-base">close</span>
              </button>
            </div>

            <p className="text-xs text-[#504440]">
              Sync your arrival with the Vertex AI predicted lull at <strong className="text-[#220d06]">10:45 AM</strong>. Your table will be held with a dedicated status light for 15 minutes.
            </p>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-[#220d06]">Select Station Type</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setStationType('Quiet Booth #04 (Library)')}
                  className={`p-3 rounded-xl text-xs font-bold text-left transition-all ${
                    stationType === 'Quiet Booth #04 (Library)'
                      ? 'bg-[#220d06] text-white shadow-sm'
                      : 'bg-[#f0eee8] text-[#1c1c18]'
                  }`}
                >
                  Quiet Booth #04 (Library)
                </button>
                <button
                  type="button"
                  onClick={() => setStationType('Window Bench #12 (Main)')}
                  className={`p-3 rounded-xl text-xs font-bold text-left transition-all ${
                    stationType === 'Window Bench #12 (Main)'
                      ? 'bg-[#220d06] text-white shadow-sm'
                      : 'bg-[#f0eee8] text-[#1c1c18]'
                  }`}
                >
                  Window Bench #12 (Main)
                </button>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#f6f3ed] flex items-center gap-3">
              <span className="material-symbols-outlined text-[#9c4328]">calendar_today</span>
              <div className="flex flex-col text-xs">
                <span className="font-bold text-[#220d06]">Google Calendar Auto-Hold</span>
                <span className="text-[#504440]">Arrival block: 10:45 AM – 12:15 PM today</span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-[#504440]"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmReservation}
                className="px-5 py-2 rounded-xl bg-[#9c4328] hover:bg-[#76270e] text-white text-xs font-bold shadow transition-all"
              >
                {bookingConfirmed ? 'Station Confirmed!' : 'Confirm & Sync Calendar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
