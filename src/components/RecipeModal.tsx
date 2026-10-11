import React, { useState } from 'react';
import { RecipeConfig } from '../types/cafe';

interface RecipeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRecipeCreated: (recipe: RecipeConfig) => void;
  creatorName: string;
}

export const RecipeModal: React.FC<RecipeModalProps> = ({
  isOpen,
  onClose,
  onRecipeCreated,
  creatorName,
}) => {
  const [name, setName] = useState('My Micro-Lot Extraction');
  const [brewMethod, setBrewMethod] = useState<'V60' | 'AeroPress' | 'Espresso' | 'Cold Drip' | 'Orea V3' | 'Chemex'>('V60');
  const [beanOrigin, setBeanOrigin] = useState('Panama Boquete Washed');
  const [roastLevel, setRoastLevel] = useState<'Light' | 'Medium-Light' | 'Medium' | 'Nordic Light'>('Nordic Light');
  const [coffeeGrams, setCoffeeGrams] = useState(16);
  const [waterGrams, setWaterGrams] = useState(250);
  const [tempCelsius, setTempCelsius] = useState(93);
  const [grindSetting, setGrindSetting] = useState('Medium-Fine (22 clicks)');
  const [notes, setNotes] = useState('Seeking high floral jasmine clarity, stone fruit sweetness, and crisp finish.');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluatedRecipe, setEvaluatedRecipe] = useState<RecipeConfig | null>(null);

  if (!isOpen) return null;

  const currentRatio = `1:${(waterGrams / (coffeeGrams || 1)).toFixed(1)}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsEvaluating(true);

    try {
      const response = await fetch('/api/recipes/analyze-and-create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          creatorName,
          brewMethod,
          beanOrigin,
          roastLevel,
          coffeeGrams,
          waterGrams,
          tempCelsius,
          grindSetting,
          notes,
        }),
      });

      const data = await response.json();
      if (data.recipe) {
        setEvaluatedRecipe(data.recipe);
        onRecipeCreated(data.recipe);
      }
    } catch (err) {
      console.error('Error analyzing recipe:', err);
    } finally {
      setIsEvaluating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#220d06]/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#ffffff] max-w-2xl w-full rounded-2xl p-6 sm:p-8 shadow-2xl border border-[#3a2118]/10 flex flex-col gap-5 relative max-h-[92vh] overflow-y-auto">
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
            <span className="material-symbols-outlined text-[#9c4328]">coffee_maker</span>
            <span className="font-label-sm uppercase tracking-wider text-[#9c4328] font-bold">
              Artisanal Studio • Try Your Own Recipe
            </span>
          </div>
          <h2 className="font-headline font-bold text-2xl sm:text-3xl text-[#220d06]">
            Craft &amp; Calibrate Your Recipe
          </h2>
          <p className="font-body-sm text-sm text-[#504440] mt-1">
            Input your extraction parameters. Google Gemini Sensory Engine will compute live extraction balance, tasting notes, and barista tips.
          </p>
        </div>

        {!evaluatedRecipe ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#220d06] mb-1">Recipe Title</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#f0eee8] text-sm text-[#1c1c18] border border-transparent focus:border-[#9c4328] focus:outline-none"
                  placeholder="e.g. Kyoto Slow Bloom V60"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#220d06] mb-1">Brew Device</label>
                <select
                  value={brewMethod}
                  onChange={(e: any) => setBrewMethod(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#f0eee8] text-sm text-[#1c1c18] border border-transparent focus:border-[#9c4328] focus:outline-none"
                >
                  <option value="V60">Hario V60 (Cone Dripper)</option>
                  <option value="Orea V3">Orea V3 (Flat Bed Reserve)</option>
                  <option value="AeroPress">AeroPress (Inverted / Immersion)</option>
                  <option value="Espresso">Dual Boiler 9-Bar Espresso</option>
                  <option value="Cold Drip">20-Hour Slow Cold Drip</option>
                  <option value="Chemex">Chemex 6-Cup Thick Filter</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#220d06] mb-1">Bean Origin / Micro-Lot</label>
                <input
                  type="text"
                  value={beanOrigin}
                  onChange={(e) => setBeanOrigin(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#f0eee8] text-sm text-[#1c1c18] border border-transparent focus:border-[#9c4328] focus:outline-none"
                  placeholder="e.g. Colombia Huila Washed"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#220d06] mb-1">Roast Profile</label>
                <select
                  value={roastLevel}
                  onChange={(e: any) => setRoastLevel(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#f0eee8] text-sm text-[#1c1c18] border border-transparent focus:border-[#9c4328] focus:outline-none"
                >
                  <option value="Nordic Light">Nordic Ultra-Light (High Clarity)</option>
                  <option value="Light">Light Roast (Floral / Fruity)</option>
                  <option value="Medium-Light">Medium-Light (Balanced Body)</option>
                  <option value="Medium">Medium (Caramel &amp; Roasted Nut)</option>
                </select>
              </div>
            </div>

            {/* Slider Ratios */}
            <div className="p-4 rounded-xl bg-[#f6f3ed] border border-[#3a2118]/8 flex flex-col gap-3">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-[#220d06] flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm text-[#9c4328]">scale</span>
                  Dose &amp; Water Yield
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#ffdbd1] text-[#76270e] font-mono">
                  Ratio: {currentRatio}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <div className="flex justify-between text-xs text-[#504440] mb-1">
                    <span>Coffee Dose</span>
                    <span className="font-bold text-[#220d06]">{coffeeGrams}g</span>
                  </div>
                  <input
                    type="range"
                    min={12}
                    max={25}
                    value={coffeeGrams}
                    onChange={(e) => setCoffeeGrams(Number(e.target.value))}
                    className="w-full accent-[#9c4328]"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs text-[#504440] mb-1">
                    <span>Water Weight</span>
                    <span className="font-bold text-[#220d06]">{waterGrams}g</span>
                  </div>
                  <input
                    type="range"
                    min={150}
                    max={450}
                    step={10}
                    value={waterGrams}
                    onChange={(e) => setWaterGrams(Number(e.target.value))}
                    className="w-full accent-[#9c4328]"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs text-[#504440] mb-1">
                    <span>Water Temp</span>
                    <span className="font-bold text-[#220d06]">{tempCelsius}°C</span>
                  </div>
                  <input
                    type="range"
                    min={82}
                    max={98}
                    value={tempCelsius}
                    onChange={(e) => setTempCelsius(Number(e.target.value))}
                    className="w-full accent-[#9c4328]"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#220d06] mb-1">Grind Calibration</label>
                <input
                  type="text"
                  value={grindSetting}
                  onChange={(e) => setGrindSetting(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#f0eee8] text-sm text-[#1c1c18] border border-transparent focus:border-[#9c4328] focus:outline-none"
                  placeholder="e.g. EK43 3.8 / 22 clicks"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#220d06] mb-1">Sensory Goal / Notes</label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#f0eee8] text-sm text-[#1c1c18] border border-transparent focus:border-[#9c4328] focus:outline-none"
                  placeholder="e.g. Sweet bergamot finish, minimal bitterness"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-[#504440] hover:bg-[#f0eee8]"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isEvaluating}
                className="px-6 py-2.5 rounded-xl bg-[#220d06] hover:bg-[#3a2118] text-white text-xs font-bold flex items-center gap-2 shadow-md transition-all disabled:opacity-50"
              >
                {isEvaluating ? (
                  <>
                    <span className="material-symbols-outlined text-sm animate-spin">refresh</span>
                    <span>Gemini Sensory Evaluation...</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-sm">auto_awesome</span>
                    <span>Synthesize &amp; Save Recipe</span>
                  </>
                )}
              </button>
            </div>
          </form>
        ) : (
          /* Evaluated Recipe Result Showcase */
          <div className="flex flex-col gap-4">
            <div className="p-4 rounded-xl bg-[#ceead0] text-[#092011] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-xl">check_circle</span>
                <span className="font-bold text-sm">Recipe Calibrated &amp; Shared to Community Showcase!</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-[#092011] text-white text-xs font-bold">
                {evaluatedRecipe.synergyScore}% Sensory Synergy
              </span>
            </div>

            <div className="p-5 rounded-xl bg-[#f6f3ed] border border-[#3a2118]/10 flex flex-col gap-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-headline font-bold text-xl text-[#220d06]">
                    {evaluatedRecipe.name}
                  </h3>
                  <p className="text-xs text-[#504440] mt-0.5">
                    {evaluatedRecipe.brewMethod} • {evaluatedRecipe.beanOrigin} • {evaluatedRecipe.ratio} Ratio
                  </p>
                </div>
                <span className="font-bold text-xs text-[#9c4328] px-2.5 py-1 rounded-full bg-[#ffdbd1]">
                  {evaluatedRecipe.tempCelsius}°C Water
                </span>
              </div>

              {/* Spider-chart style metrics */}
              {evaluatedRecipe.geminiTastingProfile && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                  <div className="p-2.5 rounded-lg bg-white shadow-sm flex flex-col">
                    <span className="text-[10px] text-[#504440] uppercase font-bold">Acidity</span>
                    <span className="text-lg font-bold text-[#220d06]">
                      {evaluatedRecipe.geminiTastingProfile.acidity}/10
                    </span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white shadow-sm flex flex-col">
                    <span className="text-[10px] text-[#504440] uppercase font-bold">Sweetness</span>
                    <span className="text-lg font-bold text-[#220d06]">
                      {evaluatedRecipe.geminiTastingProfile.sweetness}/10
                    </span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white shadow-sm flex flex-col">
                    <span className="text-[10px] text-[#504440] uppercase font-bold">Body / Texture</span>
                    <span className="text-lg font-bold text-[#220d06]">
                      {evaluatedRecipe.geminiTastingProfile.body}/10
                    </span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white shadow-sm flex flex-col">
                    <span className="text-[10px] text-[#504440] uppercase font-bold">Clarity</span>
                    <span className="text-lg font-bold text-[#9c4328]">
                      {evaluatedRecipe.geminiTastingProfile.clarity}/10
                    </span>
                  </div>
                </div>
              )}

              {/* Flavor tags */}
              {evaluatedRecipe.geminiTastingProfile?.tastingNotes && (
                <div>
                  <span className="text-xs font-bold text-[#220d06] block mb-1">
                    Detected Tasting Notes:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {evaluatedRecipe.geminiTastingProfile.tastingNotes.map((note, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-full bg-[#220d06] text-white text-xs font-medium"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Barista Pro Tip */}
              <div className="p-3 rounded-lg bg-[#ffffff] border border-[#3a2118]/8 flex items-start gap-2">
                <span className="material-symbols-outlined text-[#9c4328] text-base shrink-0 mt-0.5">
                  tips_and_updates
                </span>
                <div className="text-xs text-[#1c1c18]">
                  <strong className="text-[#9c4328]">Gemini Barista Tip: </strong>
                  {evaluatedRecipe.geminiTastingProfile?.baristaTip}
                </div>
              </div>

              {/* Pastry Pairing */}
              <div className="text-xs text-[#504440]">
                <strong>Suggested Hearth Pairing: </strong>
                {evaluatedRecipe.geminiTastingProfile?.pairingRecommendation}
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setEvaluatedRecipe(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-[#504440] hover:bg-[#f0eee8]"
              >
                Brew Another
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2 rounded-xl bg-[#220d06] text-white text-xs font-bold shadow-md hover:bg-[#3a2118]"
              >
                Done &amp; View in Showcase
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
