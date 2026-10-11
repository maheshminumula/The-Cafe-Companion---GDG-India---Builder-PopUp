import React, { useState } from 'react';
import { MenuItem, OrderItem } from '../types/cafe';

interface SmartConciergeMenuProps {
  orderItems: OrderItem[];
  onAddItem: (item: MenuItem) => void;
  onRemoveItem: (index: number) => void;
  onCheckout: () => void;
  onOpenRecipeModal: () => void;
  menuItems: MenuItem[];
}

export const SmartConciergeMenu: React.FC<SmartConciergeMenuProps> = ({
  orderItems,
  onAddItem,
  onRemoveItem,
  onCheckout,
  onOpenRecipeModal,
  menuItems,
}) => {
  const [caffeineLevel, setCaffeineLevel] = useState(3); // 1-4
  const [activeTasteNotes, setActiveTasteNotes] = useState<string[]>(['Cardamom', 'Hazelnut', 'Honeycomb']);
  const [activeDietary, setActiveDietary] = useState<string[]>(['Oat Milk (Minor Figures)', 'Gluten-Conscious']);
  const [promptQuery, setPromptQuery] = useState('Need deep focus fuel for 2 hours, dairy-free, pairing with an oat pastry');
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [milkTemp, setMilkTemp] = useState('145°F (Optimal)');
  const [geofenceEnabled, setGeofenceEnabled] = useState(true);
  const [checkoutStatus, setCheckoutStatus] = useState<'idle' | 'processing' | 'confirmed'>('idle');

  const caffeineLabels = [
    'Micro-Dose (40mg)',
    'Balanced (90mg)',
    'Medium-High (140mg)',
    'Ultra Concentration (210mg)',
  ];

  const availableTasteNotes = ['Cardamom', 'Hazelnut', 'Honeycomb', 'Meyer Lemon', 'Candied Peach', 'Bergamot'];
  const availableDietary = ['Oat Milk (Minor Figures)', 'Gluten-Conscious', 'Refined Sugar-Free', 'Keto/MCT'];

  const handleToggleTaste = (note: string) => {
    setActiveTasteNotes((prev) =>
      prev.includes(note) ? prev.filter((n) => n !== note) : [...prev, note]
    );
  };

  const handleToggleDietary = (diet: string) => {
    setActiveDietary((prev) =>
      prev.includes(diet) ? prev.filter((d) => d !== diet) : [...prev, diet]
    );
  };

  const handleSynthesize = async () => {
    setIsSynthesizing(true);
    try {
      await fetch('/api/sensory/synthesize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: promptQuery,
          tolerance: caffeineLabels[caffeineLevel - 1],
          tasteNotes: activeTasteNotes.join(', '),
          dietary: activeDietary.join(', '),
        }),
      });
    } catch (err) {
      console.warn(err);
    } finally {
      setTimeout(() => setIsSynthesizing(false), 600);
    }
  };

  const handleVoiceNote = () => {
    setPromptQuery("Listening: 'Steamed oat pour with earthy spice notes and toasted hazelnut finish...'");
  };

  const handleVisionMatch = () => {
    setPromptQuery("Vision Match: Cardamom Kouign-Amann detected. Recommending Yirgacheffe Cortado +15% cognitive synergy.");
  };

  const subtotal = orderItems.reduce((acc, it) => acc + it.price * it.quantity, 0);
  const tax = subtotal * 0.095;
  const total = subtotal + tax;

  const handlePay = () => {
    if (orderItems.length === 0) return;
    setCheckoutStatus('processing');
    setTimeout(() => {
      setCheckoutStatus('confirmed');
      onCheckout();
      setTimeout(() => setCheckoutStatus('idle'), 3500);
    }, 1200);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-10">
      {/* Top Hero Banner: Gemini Multimodal Sensory Concierge */}
      <section className="relative overflow-hidden rounded-2xl bg-[#f0eee8] p-6 sm:p-8 md:p-10 shadow-md border border-[#3a2118]/8">
        <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-[#ffdbd1]/30 blur-3xl pointer-events-none"></div>
        <div className="absolute right-1/3 -bottom-20 w-80 h-80 rounded-full bg-[#ceead0]/40 blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex flex-col gap-1.5 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#ffffff] shadow-sm text-[#9c4328] font-label-sm text-xs font-semibold">
                <span className="material-symbols-outlined text-xs">auto_awesome</span>
                Gemini Multimodal Taste Match
              </span>
              <span className="font-label-sm text-xs text-[#504440]">• Vertex AI Sensory Engine</span>
            </div>
            <h1 className="font-headline font-bold text-3xl sm:text-4xl text-[#220d06] tracking-tight">
              Sensory Brew Concierge
            </h1>
            <p className="font-body-md text-sm sm:text-base text-[#504440]">
              Describe your current biological state, ambient atmosphere, or snap your morning pastry to discover your micro-lot harmony.
            </p>
          </div>

          {/* Weather Adaptation Badge */}
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#ffffff]/85 backdrop-blur-md shadow-sm self-start lg:self-auto border border-[#3a2118]/5">
            <div className="w-11 h-11 rounded-full bg-[#ff8f6e]/30 flex items-center justify-center text-[#76270e]">
              <span className="material-symbols-outlined text-2xl">rainy</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 font-label-md text-xs font-bold text-[#220d06]">
                <span>Fog &amp; Rain • 54°F Downtown SF</span>
                <span className="w-2 h-2 rounded-full bg-[#9c4328] animate-ping"></span>
              </div>
              <p className="font-label-sm text-[11px] text-[#504440]">
                Gemini suggested warm textured cascara notes
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Multimodal Query Prompt Bar */}
        <div className="mt-6 relative z-10 bg-[#ffffff] rounded-2xl p-2 shadow-sm border border-[#3a2118]/8 flex flex-col md:flex-row items-stretch md:items-center gap-2">
          <div className="flex items-center pl-3 text-[#9c4328]">
            <span className="material-symbols-outlined text-2xl">auto_awesome</span>
          </div>
          <input
            className="flex-1 bg-transparent px-2 py-2 font-body-md text-sm sm:text-base text-[#1c1c18] placeholder:text-[#827470] focus:outline-none"
            placeholder="Ask Gemini: 'Craving silky, high clarity, low acid espresso with honeycomb notes'..."
            type="text"
            value={promptQuery}
            onChange={(e) => setPromptQuery(e.target.value)}
          />
          <div className="flex items-center gap-1.5 justify-end flex-wrap sm:flex-nowrap">
            <button
              onClick={handleVoiceNote}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#f0eee8] hover:bg-[#e5e2dc] text-[#1c1c18] transition-all text-xs font-semibold"
              type="button"
              title="Audio Concierge Whisper"
            >
              <span className="material-symbols-outlined text-base">mic</span>
              <span className="hidden sm:inline">Voice Note</span>
            </button>
            <button
              onClick={handleVisionMatch}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#f0eee8] hover:bg-[#e5e2dc] text-[#1c1c18] transition-all text-xs font-semibold"
              type="button"
              title="Gemini Vision Taste Match"
            >
              <span className="material-symbols-outlined text-base">photo_camera</span>
              <span className="hidden sm:inline">Vision Match</span>
            </button>
            <button
              onClick={handleSynthesize}
              disabled={isSynthesizing}
              className="flex items-center gap-1.5 px-5 py-2 rounded-full bg-[#220d06] text-white shadow-sm hover:opacity-90 transition-opacity text-xs font-bold"
              type="button"
            >
              {isSynthesizing ? (
                <>
                  <span className="material-symbols-outlined text-sm animate-spin">refresh</span>
                  <span>Synthesizing...</span>
                </>
              ) : (
                <>
                  <span>Synthesize</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Quick Context Presets */}
        <div className="mt-3 flex flex-wrap items-center gap-2 relative z-10 text-[#504440] text-xs font-medium">
          <span className="font-bold text-[#220d06]">Context Presets:</span>
          {[
            '90-min Coding Sprint',
            'Afternoon Slump Recovery',
            'Delicate Floral Filter',
            'Low Cortisol Decaf',
          ].map((preset, idx) => (
            <button
              key={idx}
              onClick={() => setPromptQuery(preset)}
              className="px-3 py-1 rounded-full bg-[#f6f3ed] hover:bg-[#e5e2dc] text-[#220d06] transition-colors border border-[#3a2118]/5 text-xs"
            >
              {preset}
            </button>
          ))}
        </div>
      </section>

      {/* Gemini Live Taste Profile Engine & Tonal Sliders */}
      <section className="rounded-2xl bg-[#f6f3ed] p-6 sm:p-8 shadow-sm border border-[#3a2118]/8 flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#9c4328] text-xl">tune</span>
            <h2 className="font-headline font-bold text-lg sm:text-xl text-[#220d06]">
              Live Bio-Sensory Taste Calibration
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#504440]">Gemini Weighting:</span>
            <span className="px-2.5 py-0.5 rounded-full bg-[#ceead0] text-[#092011] text-xs font-bold">
              Adaptive Precision 99.4%
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Caffeine Tolerance Slider Panel */}
          <div className="bg-[#ffffff] p-4 rounded-xl flex flex-col justify-between shadow-sm border border-[#3a2118]/5">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-bold text-[#220d06] flex items-center gap-1">
                <span className="material-symbols-outlined text-sm text-[#9c4328]">bolt</span>
                Caffeine Tolerance
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#ffdbd1] text-[#76270e] font-bold">
                {caffeineLabels[caffeineLevel - 1]}
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="4"
              value={caffeineLevel}
              onChange={(e) => setCaffeineLevel(Number(e.target.value))}
              className="w-full accent-[#9c4328] cursor-pointer h-2 bg-[#f0eee8] rounded-lg"
            />
            <div className="flex justify-between text-[#504440] text-[11px] mt-2 font-medium">
              <span>Micro</span>
              <span>Balanced</span>
              <span className="font-bold text-[#9c4328]">Elevated</span>
              <span>Intense</span>
            </div>
          </div>

          {/* Flavor Resonance Tags */}
          <div className="bg-[#ffffff] p-4 rounded-xl flex flex-col justify-between shadow-sm border border-[#3a2118]/5">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-[#220d06] flex items-center gap-1">
                <span className="material-symbols-outlined text-sm text-[#9c4328]">coffee_maker</span>
                Active Taste Notes
              </span>
              <span className="text-xs text-[#504440]">{activeTasteNotes.length} Selected</span>
            </div>
            <div className="flex flex-wrap gap-1.5 my-2">
              {availableTasteNotes.map((note) => {
                const isSelected = activeTasteNotes.includes(note);
                return (
                  <button
                    key={note}
                    type="button"
                    onClick={() => handleToggleTaste(note)}
                    className={`px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1 transition-all ${
                      isSelected
                        ? 'bg-[#220d06] text-white'
                        : 'bg-[#f0eee8] text-[#504440] hover:bg-[#e5e2dc]'
                    }`}
                  >
                    <span>{isSelected ? note : `+ ${note}`}</span>
                    {isSelected && <span className="material-symbols-outlined text-xs">check</span>}
                  </button>
                );
              })}
            </div>
            <span className="text-[11px] text-[#504440]">Targeting spicy warmth &amp; roasted nutty body</span>
          </div>

          {/* Dietary Calibration */}
          <div className="bg-[#ffffff] p-4 rounded-xl flex flex-col justify-between shadow-sm border border-[#3a2118]/5">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-[#220d06] flex items-center gap-1">
                <span className="material-symbols-outlined text-sm text-[#9c4328]">spa</span>
                Dietary Profile
              </span>
              <span className="w-2 h-2 rounded-full bg-[#9c4328]"></span>
            </div>
            <div className="flex flex-wrap gap-1.5 my-2">
              {availableDietary.map((diet) => {
                const isSelected = activeDietary.includes(diet);
                return (
                  <button
                    key={diet}
                    type="button"
                    onClick={() => handleToggleDietary(diet)}
                    className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
                      isSelected
                        ? 'bg-[#ffdbd1] text-[#76270e] font-bold'
                        : 'bg-[#f0eee8] text-[#504440] hover:bg-[#e5e2dc]'
                    }`}
                  >
                    {diet}
                  </button>
                );
              })}
            </div>
            <span className="text-[11px] text-[#504440]">Validated with current table bake inventory</span>
          </div>
        </div>
      </section>

      {/* Main Workspace: Contextual Menu Mosaic + Smart Tray Order Builder */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Menu Cards Mosaic (8 Cols) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-headline font-bold text-xl text-[#220d06]">
                Contextual AI Selections
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#f0eee8] text-[#504440] text-xs font-bold">
                {menuItems.length} Curations
              </span>
            </div>
            <button
              onClick={onOpenRecipeModal}
              className="text-xs font-bold text-[#9c4328] hover:underline flex items-center gap-1"
            >
              <span>+ Try Your Own Recipe</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {menuItems.map((item) => (
              <div
                key={item.id}
                className="group bg-[#ffffff] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col border border-[#3a2118]/8"
              >
                {/* Image Area or Live Extraction Graph for Gesha */}
                {item.hasBrewCurve ? (
                  <div className="p-4 bg-[#ebe8e2] flex flex-col justify-between gap-1.5">
                    <div className="flex justify-between items-start">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1.5">
                          <span className="px-2 py-0.5 rounded-full bg-[#220d06] text-white text-[10px] font-bold">
                            Rare Reserve
                          </span>
                          <span className="text-xs text-[#9c4328] font-bold">{item.synergyMatch}% Match</span>
                        </div>
                        <h3 className="font-headline font-bold text-lg text-[#220d06] mt-1">
                          {item.title}
                        </h3>
                      </div>
                      <span className="text-base text-[#9c4328] font-bold">${item.price.toFixed(2)}</span>
                    </div>
                    <p className="text-xs text-[#504440]">{item.subTitle}</p>

                    {/* SVG Extraction Curve */}
                    <div className="mt-2 p-3 bg-[#ffffff] rounded-xl border border-[#3a2118]/5">
                      <div className="flex justify-between items-center mb-1 text-[#504440] text-[10px] font-bold">
                        <span className="flex items-center gap-1 text-[#9c4328]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#9c4328] animate-pulse"></span>
                          Live Orea V3 Extraction Curve
                        </span>
                        <span>Target TDS 1.38%</span>
                      </div>
                      <svg className="w-full h-14 text-[#9c4328] overflow-visible" viewBox="0 0 300 70" preserveAspectRatio="none">
                        <line x1="0" y1="15" x2="300" y2="15" stroke="currentColor" strokeDasharray="2 2" strokeOpacity="0.1" />
                        <line x1="0" y1="40" x2="300" y2="40" stroke="currentColor" strokeDasharray="2 2" strokeOpacity="0.1" />
                        <line x1="0" y1="65" x2="300" y2="65" stroke="currentColor" strokeDasharray="2 2" strokeOpacity="0.1" />
                        <path d="M0,65 Q50,45 100,28 T200,18 T300,12 L300,70 L0,70 Z" fill="currentColor" fillOpacity="0.1" />
                        <path d="M0,65 Q50,45 100,28 T200,18 T300,12" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2.5" />
                        <circle cx="185" cy="20" r="4.5" fill="currentColor" className="animate-ping opacity-75" />
                        <circle cx="185" cy="20" r="3.5" fill="currentColor" />
                      </svg>
                      <div className="flex justify-between text-[#504440] text-[10px] mt-1 font-mono">
                        <span>0:00 (Bloom 60g)</span>
                        <span>1:45 (Pour II)</span>
                        <span>3:10 (Drawdown)</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="relative h-48 w-full overflow-hidden bg-[#f0eee8]">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 flex gap-1.5">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#220d06] text-white text-xs font-bold flex items-center gap-1 shadow-sm">
                        <span className="material-symbols-outlined text-[10px] text-[#ffdbd1]">auto_awesome</span>
                        {item.synergyMatch}% Match
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-sm text-[#220d06] text-xs font-semibold">
                        {item.matchTag}
                      </span>
                    </div>
                    <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded-full bg-white/90 backdrop-blur text-[#220d06] text-[11px] font-bold">
                      {item.prepTime}
                    </div>
                  </div>
                )}

                {/* Card Content */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between gap-3">
                  <div>
                    {!item.hasBrewCurve && (
                      <>
                        <div className="flex justify-between items-start gap-2">
                          <h3 className="font-headline font-bold text-lg text-[#220d06] leading-snug">
                            {item.title}
                          </h3>
                          <span className="text-base text-[#9c4328] font-bold">
                            ${item.price.toFixed(2)}
                          </span>
                        </div>
                        <p className="text-xs text-[#504440] mt-0.5">{item.subTitle}</p>
                      </>
                    )}
                    <p className="text-xs text-[#504440] mt-2 line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2 pt-2 border-t border-[#3a2118]/5">
                    <div className="flex items-center gap-1.5 text-xs text-[#504440]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#9c4328]"></span>
                      <span>{item.pairingNote}</span>
                    </div>
                    <button
                      onClick={() => onAddItem(item)}
                      className="w-full py-2.5 rounded-xl bg-[#f0eee8] text-[#220d06] hover:bg-[#220d06] hover:text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <span className="material-symbols-outlined text-base">add_shopping_cart</span>
                      <span>Add to Adaptive Tray</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar: Real-Time Smart Order Builder & Tray (4 Cols) */}
        <aside className="lg:col-span-4 flex flex-col gap-5 sticky top-24">
          <div className="bg-[#ffffff] rounded-2xl p-6 shadow-md border border-[#3a2118]/8 flex flex-col gap-4">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#3a2118]/8">
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#9c4328] text-xl">shopping_bag</span>
                  <span className="font-headline font-bold text-xl text-[#220d06]">Smart Tray</span>
                </div>
                <span className="text-xs text-[#504440]">Auto-sync with Downtown SF Barista</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-[#ffdbd1] text-[#76270e] text-xs font-bold">
                {orderItems.reduce((acc, it) => acc + it.quantity, 0)} Items
              </span>
            </div>

            {/* Tray Items List */}
            <div className="flex flex-col gap-2 max-h-60 overflow-y-auto pr-1">
              {orderItems.length === 0 ? (
                <div className="py-8 text-center text-xs text-[#827470]">
                  Your adaptive tray is empty. Tap any card to add micro-lot items.
                </div>
              ) : (
                orderItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-[#f6f3ed] flex flex-col gap-1 border border-[#3a2118]/5"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-xs font-bold text-[#220d06]">{item.title}</h4>
                        <p className="text-[11px] text-[#504440]">{item.customization}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-[#9c4328] font-bold">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                        <button
                          onClick={() => onRemoveItem(idx)}
                          className="text-[#827470] hover:text-[#ba1a1a] transition-colors"
                          title="Remove item"
                        >
                          <span className="material-symbols-outlined text-sm">close</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Gemini Barista Note & Milk Calibration */}
            <div className="p-4 rounded-xl bg-[#f0eee8] flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#220d06] flex items-center gap-1">
                  <span className="material-symbols-outlined text-[#9c4328] text-sm">record_voice_over</span>
                  Gemini Barista Note
                </span>
                <span className="text-[10px] text-[#092011] bg-[#ceead0] px-2 py-0.5 rounded-full font-bold">
                  Live Whisper
                </span>
              </div>
              <p className="text-xs text-[#504440] italic">
                “We dialed in the 145°F oat steaming to accentuate the sweet cardamom finish without curdling the micro-foam.”
              </p>

              {/* Steam Temp Buttons */}
              <div className="mt-2 pt-2 border-t border-[#3a2118]/8">
                <div className="flex justify-between items-center text-xs text-[#504440] mb-1.5 font-medium">
                  <span>Steam Temperature</span>
                  <span className="font-bold text-[#9c4328]">{milkTemp}</span>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  {['135°F Drink-Now', '145°F (Optimal)', '160°F Extra-Hot'].map((temp) => (
                    <button
                      key={temp}
                      type="button"
                      onClick={() => setMilkTemp(temp)}
                      className={`py-1 rounded-lg text-xs font-semibold transition-all ${
                        milkTemp === temp
                          ? 'bg-[#220d06] text-white shadow-sm'
                          : 'bg-[#ffffff] text-[#504440] hover:bg-[#ebe8e2]'
                      }`}
                    >
                      {temp.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Google Maps Geofence Auto-Fire Toggle */}
            <div className="p-4 rounded-xl bg-[#f6f3ed] flex items-center justify-between gap-3 border border-[#3a2118]/5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#ffdbd1] flex items-center justify-center text-[#76270e]">
                  <span className="material-symbols-outlined text-base">near_me</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[#220d06]">Arrival Auto-Fire</span>
                  <span className="text-[11px] text-[#504440]">Maps Geofence • Pull shots 300m out</span>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={geofenceEnabled}
                  onChange={(e) => setGeofenceEnabled(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-[#dcdad4] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#9c4328]"></div>
              </label>
            </div>

            {/* Pricing & Google Pay Checkout */}
            <div className="pt-2 flex flex-col gap-2">
              <div className="flex justify-between text-xs text-[#504440]">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xs text-[#504440]">
                <span>SF Local Roaster Surcharge &amp; Tax (9.5%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-[#220d06] pt-1 border-t border-[#3a2118]/8">
                <span>Total</span>
                <span className="text-[#9c4328]">${total.toFixed(2)}</span>
              </div>

              <button
                type="button"
                onClick={handlePay}
                disabled={orderItems.length === 0 || checkoutStatus !== 'idle'}
                className="w-full mt-2 py-3 rounded-xl bg-[#220d06] hover:bg-[#3a2118] text-white text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-40"
              >
                {checkoutStatus === 'processing' ? (
                  <>
                    <span className="material-symbols-outlined text-lg animate-spin">refresh</span>
                    <span>Broadcasting to Barista via Cloud Run...</span>
                  </>
                ) : checkoutStatus === 'confirmed' ? (
                  <>
                    <span className="material-symbols-outlined text-lg text-[#ceead0]">check_circle</span>
                    <span>Order Fired • Table 14 Reserved!</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-lg">contactless</span>
                    <span>Google Pay • Fast Checkout</span>
                  </>
                )}
              </button>

              <span className="text-center text-[10px] text-[#504440]">
                Protected by Vertex AI Safe Transaction • 0 sec queue wait
              </span>
            </div>
          </div>

          {/* Atmosphere Pulse Micro-Card */}
          <div className="bg-[#f0eee8] rounded-2xl p-4 shadow-sm border border-[#3a2118]/8 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#9c4328] shadow-sm shrink-0">
              <span className="material-symbols-outlined text-xl">radar</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-[#220d06]">Atmosphere Pulse</span>
              <span className="text-xs text-[#504440]">
                Downtown Barista radar reports: 3 open window tables, quiet jazz, zero queue.
              </span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
