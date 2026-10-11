import React, { useState } from 'react';

export const CommunityTable: React.FC = () => {
  const [vibeMode, setVibeMode] = useState<'chat' | 'collab' | 'focus'>('chat');
  const [thoughtInput, setThoughtInput] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (title: string, msg: string) => {
    setToastMessage(`${title}: ${msg}`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handlePostThought = (e: React.FormEvent) => {
    e.preventDefault();
    if (!thoughtInput.trim()) return;
    showToast('Thought Posted', `"${thoughtInput.substring(0, 30)}..." added to Table 4.`);
    setThoughtInput('');
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-10">
      {/* Privacy & Context Utility Bar */}
      <section className="w-full p-3 rounded-2xl bg-[#f6f3ed] border border-[#3a2118]/8 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#9c4328] animate-ping"></span>
          <span className="uppercase tracking-wider text-[#504440] font-bold">Spatial Cluster Active</span>
          <span className="text-[#827470]">•</span>
          <span className="font-bold text-[#220d06]">14 Opt-in Guests Seated</span>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ebe8e2] text-[#504440] font-medium">
          <span className="material-symbols-outlined text-[#9c4328] text-sm">verified_user</span>
          <span>Google Privacy-Preserving Enclave Active • Zero Data Retained Past Departure</span>
        </div>
      </section>

      {/* Editorial Hero & Presence State Controller */}
      <section className="relative overflow-hidden flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <div className="flex flex-col max-w-2xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-0.5 rounded-full bg-[#ffdbd1] text-[#76270e] text-xs font-bold uppercase tracking-wider">
              Gemini Semantic Sparks
            </span>
            <span className="text-xs text-[#504440]">Low-frequency ambient matchmaking</span>
          </div>
          <h1 className="font-headline font-bold text-3xl sm:text-4xl lg:text-5xl text-[#220d06] tracking-tight leading-tight mb-3">
            The Digital Community Table.
          </h1>
          <p className="font-body-md text-sm sm:text-base text-[#504440] max-w-xl">
            Sparking serendipitous ideas over slow-drip coffee. An opt-in, ephemeral social layer turning solitary workstations into collaborative cafe ecosystems.
          </p>
        </div>

        {/* Presence Segmented Hub */}
        <div className="bg-[#f0eee8] rounded-2xl p-3 shadow-md border border-[#3a2118]/8 shrink-0">
          <div className="flex items-center justify-between px-2 pb-2">
            <span className="text-[10px] text-[#504440] font-bold uppercase tracking-wider">Your Presence Vibe</span>
            <span className="text-xs text-[#9c4328] font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#9c4328]"></span> Table 14 (Counter)
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5">
            <button
              onClick={() => { setVibeMode('chat'); showToast('Presence Updated', 'Open to Chat mode active.'); }}
              className={`p-3 rounded-xl flex flex-col items-start transition-all ${
                vibeMode === 'chat'
                  ? 'bg-[#220d06] text-white shadow-sm'
                  : 'bg-[#ffffff] text-[#1c1c18] hover:bg-[#ebe8e2]'
              }`}
            >
              <div className="flex items-center gap-1.5 w-full">
                <span className="material-symbols-outlined text-base">forum</span>
                <span className="text-xs font-bold">Open to Chat</span>
              </div>
              <span className="text-[10px] mt-1 opacity-80">Free for casual banter</span>
            </button>

            <button
              onClick={() => { setVibeMode('collab'); showToast('Presence Updated', 'Collaborate mode active.'); }}
              className={`p-3 rounded-xl flex flex-col items-start transition-all ${
                vibeMode === 'collab'
                  ? 'bg-[#220d06] text-white shadow-sm'
                  : 'bg-[#ffffff] text-[#1c1c18] hover:bg-[#ebe8e2]'
              }`}
            >
              <div className="flex items-center gap-1.5 w-full">
                <span className="material-symbols-outlined text-base text-[#9c4328]">handshake</span>
                <span className="text-xs font-bold">Collaborate</span>
              </div>
              <span className="text-[10px] mt-1 opacity-80">Brainstorm &amp; critique</span>
            </button>

            <button
              onClick={() => { setVibeMode('focus'); showToast('Presence Updated', 'Deep Focus mode active.'); }}
              className={`p-3 rounded-xl flex flex-col items-start transition-all ${
                vibeMode === 'focus'
                  ? 'bg-[#220d06] text-white shadow-sm'
                  : 'bg-[#ffffff] text-[#1c1c18] hover:bg-[#ebe8e2]'
              }`}
            >
              <div className="flex items-center gap-1.5 w-full">
                <span className="material-symbols-outlined text-base text-[#827470]">do_not_disturb_on</span>
                <span className="text-xs font-bold">Deep Focus</span>
              </div>
              <span className="text-[10px] mt-1 opacity-80">Do not disturb</span>
            </button>
          </div>
        </div>
      </section>

      {/* Active In-Café Sparks Section */}
      <section className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <div className="flex items-center gap-1.5 mb-1">
              <span className="material-symbols-outlined text-[#9c4328] text-base">psychology</span>
              <span className="text-xs font-bold text-[#9c4328] uppercase tracking-wider">
                Gemini 1.5 Semantic Cross-Match
              </span>
            </div>
            <h2 className="font-headline font-bold text-2xl text-[#220d06]">
              Active In-Café Sparks
            </h2>
          </div>
          <span className="text-xs text-[#504440]">Refreshes dynamically with micro-seating</span>
        </div>

        {/* 3 Profile Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Elena */}
          <div className="bg-[#ffffff] rounded-2xl p-6 shadow-sm border border-[#3a2118]/8 flex flex-col justify-between hover:shadow-md transition-all">
            <div>
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAknsv1Q9MT6w98E5Ifr7HzAN1wo-TM3hlh9QtpzLEXj5afZ5Bx9r7MGUf-zxOZ4KscfWgazUEbjb84mpQaLREHOToNJl-1IhZLNp3cq440mYX6VelE7_14XGOcl2m6t-BUNBc_hoZsR3c2vEryn9ssHH9Ci3ozXDwhbH3mgzPSMu-jD9R_i9WXAfKa9MrP5q7W27CyqrWlNiQDs_3M8tEPdnrdrkEA_sU_rJxjEkzolhYag7FlGPFA"
                      alt="Elena R."
                      className="w-14 h-14 rounded-full object-cover shadow-sm"
                    />
                    <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-[#9c4328] ring-2 ring-white"></span>
                  </div>
                  <div>
                    <h3 className="font-headline font-bold text-base text-[#220d06]">Elena R.</h3>
                    <p className="text-xs text-[#504440]">Product Designer</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-[#f0eee8] text-xs font-semibold text-[#1c1c18] flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs text-[#9c4328]">table_restaurant</span> Table 08
                </span>
              </div>

              <div className="bg-[#f6f3ed] rounded-xl p-3 mb-3">
                <span className="text-[10px] text-[#504440] uppercase font-bold tracking-wider block mb-1">Currently Crafting</span>
                <p className="text-xs font-medium text-[#1c1c18]">
                  Accessibility paradigms in generative generative UI &amp; multimodal canvas tools.
                </p>
              </div>

              <div className="bg-[#ffdbd1]/30 rounded-xl p-3 mb-3 text-xs">
                <span className="text-[#76270e] font-bold flex items-center gap-1 mb-1">
                  <span className="material-symbols-outlined text-xs">auto_awesome</span> Gemini Spark Prompt
                </span>
                <p className="text-[#76270e]">
                  “Ask about: Local SF typographic history or Figma token plugins.”
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 mb-4">
                <span className="px-2 py-0.5 rounded-full bg-[#f0eee8] text-[11px] text-[#504440]">Design Systems</span>
                <span className="px-2 py-0.5 rounded-full bg-[#f0eee8] text-[11px] text-[#504440]">Letterpress</span>
                <span className="px-2 py-0.5 rounded-full bg-[#f0eee8] text-[11px] text-[#504440]">Pour-over Gesha</span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-[#3a2118]/5">
              <button
                onClick={() => showToast('Digital Wave Sent', 'Elena received your digital wave on Table 08.')}
                className="flex-1 py-2 rounded-xl bg-[#220d06] hover:bg-[#3a2118] text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-sm">waving_hand</span>
                <span>Send Digital Wave</span>
              </button>
              <button
                onClick={() => showToast('Drink Dispatched', 'Sent a Gesha pour-over voucher to Elena.')}
                className="p-2 rounded-xl bg-[#ffdbd1] text-[#76270e] hover:bg-[#ffb59f] transition-colors"
                title="Offer a coffee"
              >
                <span className="material-symbols-outlined text-base">local_cafe</span>
              </button>
            </div>
          </div>

          {/* Card 2: Marcus */}
          <div className="bg-[#ffffff] rounded-2xl p-6 shadow-sm border border-[#3a2118]/8 flex flex-col justify-between hover:shadow-md transition-all">
            <div>
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3CO1aRM9Pguxj2uDCIHoEhZHrgpS6m3D54C6lOsfgc5iqGtVGJde5fgGJOwqUvvanZ-Tsz-02RKb-ASsqChw_oi78WxhvSIsMBfPKnglJE3mEsrj-VxQ7T-MII16S-FwygeKFrR4luuWPOnYkKJvaHTYS2Zz-wfXdywqVlgdFaAQJZWDIbkM68Xgg_WON3TrdK1FwlYtaLjVErtyVawYUR56mcDuvHgtIIoUUuTp43kqUDMU6AHRN"
                      alt="Marcus T."
                      className="w-14 h-14 rounded-full object-cover shadow-sm"
                    />
                    <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-[#9c4328] ring-2 ring-white"></span>
                  </div>
                  <div>
                    <h3 className="font-headline font-bold text-base text-[#220d06]">Marcus T.</h3>
                    <p className="text-xs text-[#504440]">Indie Founder</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-[#f0eee8] text-xs font-semibold text-[#1c1c18] flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs text-[#9c4328]">table_restaurant</span> Table 12
                </span>
              </div>

              <div className="bg-[#f6f3ed] rounded-xl p-3 mb-3">
                <span className="text-[10px] text-[#504440] uppercase font-bold tracking-wider block mb-1">Currently Crafting</span>
                <p className="text-xs font-medium text-[#1c1c18]">
                  Clean energy micro-grid monitoring SaaS &amp; battery-swapping logistics.
                </p>
              </div>

              <div className="bg-[#ceead0]/40 rounded-xl p-3 mb-3 text-xs">
                <span className="text-[#092011] font-bold flex items-center gap-1 mb-1">
                  <span className="material-symbols-outlined text-xs">auto_awesome</span> Gemini Spark Prompt
                </span>
                <p className="text-[#092011]">
                  “Passionate about: Inverted AeroPress recipes &amp; Seed fundraising dynamics.”
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 mb-4">
                <span className="px-2 py-0.5 rounded-full bg-[#f0eee8] text-[11px] text-[#504440]">Hardware IoT</span>
                <span className="px-2 py-0.5 rounded-full bg-[#f0eee8] text-[11px] text-[#504440]">Bootstrapping</span>
                <span className="px-2 py-0.5 rounded-full bg-[#f0eee8] text-[11px] text-[#504440]">Ethiopia Natural</span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-[#3a2118]/5">
              <button
                onClick={() => showToast('Digital Wave Sent', 'Marcus received your digital wave on Table 12.')}
                className="flex-1 py-2 rounded-xl bg-[#220d06] hover:bg-[#3a2118] text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-sm">waving_hand</span>
                <span>Send Digital Wave</span>
              </button>
              <button
                onClick={() => showToast('Drink Dispatched', 'Sent an AeroPress voucher to Marcus.')}
                className="p-2 rounded-xl bg-[#ffdbd1] text-[#76270e] hover:bg-[#ffb59f] transition-colors"
                title="Offer a coffee"
              >
                <span className="material-symbols-outlined text-base">local_cafe</span>
              </button>
            </div>
          </div>

          {/* Card 3: Dr. Priya */}
          <div className="bg-[#ffffff] rounded-2xl p-6 shadow-sm border border-[#3a2118]/8 flex flex-col justify-between hover:shadow-md transition-all">
            <div>
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBDtV2e3o8K0PYu45eU-DSgqmMuiu9fYLLJ5iEeQdpunBouHl6lfXatIGxh1DJQIy3_MUuba2BYpTmjS_TIzioR-EPr9j-InC5oyjYsL2g4Rc-ys5wZem6P8vgJG7t99LMmFzUIzqL8wo91GfaOt3Ew8miB4km8NCKk6r3Q-mDn-bf5BgYlvzCv8lwWQOS1yeoQUeDJnr1ZeLTg6lkiUF7GARLbr8zSheW6DHqwMpWTOqCT6sYwbGyj"
                      alt="Dr. Priya S."
                      className="w-14 h-14 rounded-full object-cover shadow-sm"
                    />
                    <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-[#9c4328] ring-2 ring-white"></span>
                  </div>
                  <div>
                    <h3 className="font-headline font-bold text-base text-[#220d06]">Dr. Priya S.</h3>
                    <p className="text-xs text-[#504440]">Neuroscience Researcher</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-[#f0eee8] text-xs font-semibold text-[#1c1c18] flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs text-[#9c4328]">table_restaurant</span> Table 03
                </span>
              </div>

              <div className="bg-[#f6f3ed] rounded-xl p-3 mb-3">
                <span className="text-[10px] text-[#504440] uppercase font-bold tracking-wider block mb-1">Currently Reading &amp; Logging</span>
                <p className="text-xs font-medium text-[#1c1c18]">
                  Auditory cognitive flow states &amp; binaural resonance in unstructured spaces.
                </p>
              </div>

              <div className="bg-[#ffdbd1]/30 rounded-xl p-3 mb-3 text-xs">
                <span className="text-[#76270e] font-bold flex items-center gap-1 mb-1">
                  <span className="material-symbols-outlined text-xs">auto_awesome</span> Gemini Spark Prompt
                </span>
                <p className="text-[#76270e]">
                  “Discussion: Why coffee shop ambient noise (55-65 dB) measurably unlocks ADHD focus.”
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 mb-4">
                <span className="px-2 py-0.5 rounded-full bg-[#f0eee8] text-[11px] text-[#504440]">Cognitive Science</span>
                <span className="px-2 py-0.5 rounded-full bg-[#f0eee8] text-[11px] text-[#504440]">Acoustics</span>
                <span className="px-2 py-0.5 rounded-full bg-[#f0eee8] text-[11px] text-[#504440]">Cortisol &amp; Caffeine</span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-[#3a2118]/5">
              <button
                onClick={() => showToast('Digital Wave Sent', 'Dr. Priya received your digital wave on Table 03.')}
                className="flex-1 py-2 rounded-xl bg-[#220d06] hover:bg-[#3a2118] text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-sm">waving_hand</span>
                <span>Send Digital Wave</span>
              </button>
              <button
                onClick={() => showToast('Drink Dispatched', 'Sent a single origin pourover voucher to Dr. Priya.')}
                className="p-2 rounded-xl bg-[#ffdbd1] text-[#76270e] hover:bg-[#ffb59f] transition-colors"
                title="Offer a coffee"
              >
                <span className="material-symbols-outlined text-base">local_cafe</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Table 4: The Open Jam (Live Collaborative Whiteboard) */}
      <section className="bg-[#f6f3ed] p-6 sm:p-8 rounded-2xl border border-[#3a2118]/8 flex flex-col lg:flex-row gap-8">
        <div className="lg:w-5/12 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#9c4328] animate-pulse"></span>
              <span className="text-xs uppercase tracking-wider text-[#9c4328] font-bold">Physical Collective Hub</span>
            </div>
            <h2 className="font-headline font-bold text-2xl text-[#220d06] mb-2">
              Table 4: The Open Jam
            </h2>
            <p className="text-xs sm:text-sm text-[#504440] mb-4">
              A real-world large communal table equipped with low-latency multimodal screens. Sit down, tap your phone, or join the discussion stream asynchronously without awkward introductions.
            </p>

            <div className="bg-[#ffffff] rounded-xl p-4 mb-4 border border-[#3a2118]/5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] text-[#504440] uppercase font-bold">Currently Seated (3 of 6 seats)</span>
                <span className="px-2 py-0.5 rounded-full bg-[#ceead0] text-[#092011] text-[10px] font-bold">3 Seats Free</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  <img
                    className="inline-block h-9 w-9 rounded-full ring-2 ring-white object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCq8AsnFtAsKEtKJicsbyDA4TVjSyCq5sqabTluWNiAm26IVQhDlPqkVf2_cmSKXHUFAdCX0LS8m7tYW2_qcubU6LooQWr6cOnChrVUcsnyh9kyqP-jejPX-J9mOdeyZI4ZxtT-nzsttJlf4LjFMZG6na8iyuJXAZIHis4U1VOy7dnc9ls6Yt52KZ7lGwDbnpGOSrbOwgusszHwGUlsgxQeLDaulZq6NymTBq-DD4klN-exZwxyDrTP"
                    alt="Lucas"
                  />
                  <img
                    className="inline-block h-9 w-9 rounded-full ring-2 ring-white object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuB5dDldcN04t52Ak74xkMpkdjj76DhVzOdeTVreoPHMhMx7zyS8i4GXyWKr75kYYeEi2fGHJ0uktEs1ky8b5f_iZd2pKDCt_qn6MAKQuq_YiJ8hh-w2ntBB_94WdlHq8gHQ3dLRBixXu9jHyTvkCFM3qYEj-NPPUmns2Uw8yUiHmGX2IWs3IO34lSmoAh2SHF6Uw9pWl0xYiO1qiaKlIiGd8BB62uQOpxoU3mH-4nqxEZNQFPR84qpN"
                    alt="Maya"
                  />
                  <img
                    className="inline-block h-9 w-9 rounded-full ring-2 ring-white object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCDzsapMDgX3hsK656Y7sAnQVwBl1_Vc4H-OznA7EplqlgVQNI0tZNWn0FtXFnBelusYSvHfseYjiST4ZhrrHP7WJXZKLhQLjHB8HXioQ7NsdRf0AQ7qtyRuM0KFNhUDdaGTYkJ7XIwWrod9jxmgzlF0B9Q9vQDFhieR97DPsQx5rV8qt7pLBgJ-63Ztqh6e69QDECXPS21hQMlXPzXFYGpV43babD9iE271__3bPUeoPt9EhJX1tGi"
                    alt="Kenji"
                  />
                </div>
                <div className="flex flex-col text-xs">
                  <span className="font-bold text-[#220d06]">Lucas M., Maya K., Kenji O.</span>
                  <span className="text-[#504440]">Live audio whisper enabled</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => showToast('Seat Reserved', 'Table 4 Seat #4 reserved for you!')}
              className="px-5 py-2.5 rounded-xl bg-[#220d06] text-white text-xs font-bold hover:bg-[#3a2118] transition-colors shadow-sm flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-sm">near_me</span>
              <span>Reserve Seat &amp; Walk Over</span>
            </button>
            <button
              onClick={() => showToast('Audio Whisper', 'Listening to Table 4 stream...')}
              className="px-4 py-2.5 rounded-xl bg-[#ffffff] text-[#220d06] text-xs font-bold hover:bg-[#ebe8e2] transition-colors"
            >
              Listen Remotely
            </button>
          </div>
        </div>

        {/* Live Community Whiteboard Canvas */}
        <div className="lg:w-7/12 bg-[#ffffff] rounded-2xl p-6 shadow-md border border-[#3a2118]/8 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#3a2118]/8">
              <div>
                <span className="text-xs font-bold text-[#9c4328] uppercase tracking-wider flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">draw</span> Live Community Whiteboard
                </span>
                <h3 className="font-headline font-bold text-lg text-[#220d06] mt-0.5">
                  Best lightweight LLM fine-tuning techniques
                </h3>
              </div>
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#f6f3ed] text-xs font-semibold text-[#504440]">
                <span className="material-symbols-outlined text-xs animate-spin text-[#9c4328]">sync</span>
                <span>Gemini Scribe Live</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
              <div className="bg-[#f6f3ed] rounded-xl p-3 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between text-[11px] text-[#504440] mb-1">
                    <strong className="text-[#220d06]">Lucas M. • Table 4</strong>
                    <span>2m ago</span>
                  </div>
                  <p className="text-xs text-[#1c1c18]">
                    “QLoRA with 4-bit NormalFloat on single M3 Max handles 7B models surprisingly well for task-specific JSON extraction.”
                  </p>
                </div>
                <span className="text-[10px] text-[#504440] mt-2 flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs text-[#9c4328]">thumb_up</span> 4 patrons endorsed
                </span>
              </div>

              <div className="bg-[#f6f3ed] rounded-xl p-3 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between text-[11px] text-[#504440] mb-1">
                    <strong className="text-[#220d06]">Maya K. • Table 4</strong>
                    <span>Just now</span>
                  </div>
                  <p className="text-xs text-[#1c1c18]">
                    “Synthetic fine-tuning datasets generated via Gemini 1.5 Pro yield 80% higher eval accuracy on edge edge-cases.”
                  </p>
                </div>
                <span className="text-[10px] text-[#504440] mt-2 flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs text-[#9c4328]">thumb_up</span> 2 patrons endorsed
                </span>
              </div>

              <div className="sm:col-span-2 p-3 rounded-xl bg-gradient-to-r from-[#ffdbd1]/30 to-[#ceead0]/30 text-xs">
                <span className="font-bold text-[#76270e] flex items-center gap-1 mb-1">
                  <span className="material-symbols-outlined text-sm">auto_awesome</span> Gemini Audio Summary
                </span>
                <p className="text-[#504440]">
                  The conversation concluded that Direct Preference Optimization (DPO) outclasses standard RLHF for small-scale barista order recognition bots. Kenji is currently whiteboarding quantization trade-offs.
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handlePostThought} className="flex gap-2 pt-2">
            <input
              type="text"
              value={thoughtInput}
              onChange={(e) => setThoughtInput(e.target.value)}
              placeholder="Drop an anonymous thought or question to Table 4..."
              className="flex-1 px-3 py-2 rounded-xl bg-[#f0eee8] text-xs text-[#1c1c18] border border-transparent focus:border-[#9c4328] focus:outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-[#220d06] hover:bg-[#3a2118] text-white text-xs font-bold transition-colors"
            >
              Post
            </button>
          </form>
        </div>
      </section>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 max-w-sm bg-[#220d06] text-white p-4 rounded-2xl shadow-2xl flex items-center gap-3 z-50 animate-bounce">
          <span className="material-symbols-outlined text-[#ffdbd1]">notifications_active</span>
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
