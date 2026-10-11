import React from 'react';
import { RecipeConfig } from '../types/cafe';

interface CustomRecipesShowcaseProps {
  recipes: RecipeConfig[];
  onOpenCreateRecipe: () => void;
  onVote: (recipeId: string) => void;
}

export const CustomRecipesShowcase: React.FC<CustomRecipesShowcaseProps> = ({
  recipes,
  onOpenCreateRecipe,
  onVote,
}) => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#220d06] via-[#3a2118] to-[#9c4328] text-white shadow-md">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#ff8f6e] text-[#76270e] text-[10px] font-bold uppercase tracking-wider">
              Patron Collaborative Lab
            </span>
            <span className="text-xs text-[#d4c3be]">• Google Gemini Sensory Model</span>
          </div>
          <h1 className="font-headline font-bold text-3xl sm:text-4xl tracking-tight text-white">
            Guest Brew Showcase &amp; Custom Recipes
          </h1>
          <p className="text-xs sm:text-sm text-[#d4c3be] mt-1 max-w-2xl">
            Custom micro-lot extractions, immersion parameters, and brew curves submitted by coffee enthusiasts and calibrated via Gemini.
          </p>
        </div>

        <button
          onClick={onOpenCreateRecipe}
          className="px-6 py-3 rounded-xl bg-white text-[#220d06] font-bold text-xs hover:bg-[#ffdbd1] transition-all flex items-center gap-2 shadow-md shrink-0"
        >
          <span className="material-symbols-outlined text-sm text-[#9c4328]">science</span>
          <span>Try Your Own Recipe</span>
        </button>
      </div>

      {/* Recipe Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {recipes.map((rec) => (
          <div
            key={rec.id}
            className="p-6 rounded-2xl bg-[#ffffff] shadow-sm border border-[#3a2118]/8 flex flex-col justify-between gap-4 hover:shadow-md transition-all"
          >
            <div>
              <div className="flex justify-between items-start gap-3 mb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full bg-[#220d06] text-white text-[10px] font-bold">
                      {rec.brewMethod}
                    </span>
                    <span className="text-xs font-bold text-[#9c4328]">
                      {rec.synergyScore}% Sensory Synergy
                    </span>
                  </div>
                  <h3 className="font-headline font-bold text-xl text-[#220d06] mt-1">
                    {rec.name}
                  </h3>
                  <span className="text-xs text-[#504440]">
                    Crafted by <strong className="text-[#220d06]">{rec.creatorName}</strong>
                  </span>
                </div>

                <button
                  onClick={() => onVote(rec.id)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#f6f3ed] hover:bg-[#ffdbd1] text-[#220d06] transition-colors text-xs font-bold shrink-0"
                  title="Endorse this recipe"
                >
                  <span className="material-symbols-outlined text-sm text-[#9c4328]">thumb_up</span>
                  <span>{rec.votes}</span>
                </button>
              </div>

              {/* Extraction Parameters Badge Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 my-3 p-3 bg-[#f6f3ed] rounded-xl text-xs">
                <div>
                  <span className="text-[10px] text-[#504440] uppercase block">Dose</span>
                  <strong className="text-[#220d06]">{rec.coffeeGrams}g</strong>
                </div>
                <div>
                  <span className="text-[10px] text-[#504440] uppercase block">Water</span>
                  <strong className="text-[#220d06]">{rec.waterGrams}g ({rec.ratio})</strong>
                </div>
                <div>
                  <span className="text-[10px] text-[#504440] uppercase block">Temp</span>
                  <strong className="text-[#9c4328]">{rec.tempCelsius}°C</strong>
                </div>
                <div>
                  <span className="text-[10px] text-[#504440] uppercase block">Roast</span>
                  <strong className="text-[#220d06]">{rec.roastLevel}</strong>
                </div>
              </div>

              <p className="text-xs text-[#504440] italic mb-3">
                “{rec.notes}”
              </p>

              {/* Gemini Sensory Radar Scores */}
              {rec.geminiTastingProfile && (
                <div className="flex flex-col gap-2 pt-2 border-t border-[#3a2118]/8">
                  <div className="grid grid-cols-4 gap-2 text-center">
                    <div className="p-1.5 rounded-lg bg-[#f0eee8]">
                      <span className="text-[9px] text-[#504440] uppercase block font-bold">Acidity</span>
                      <strong className="text-xs text-[#220d06]">{rec.geminiTastingProfile.acidity}/10</strong>
                    </div>
                    <div className="p-1.5 rounded-lg bg-[#f0eee8]">
                      <span className="text-[9px] text-[#504440] uppercase block font-bold">Sweetness</span>
                      <strong className="text-xs text-[#220d06]">{rec.geminiTastingProfile.sweetness}/10</strong>
                    </div>
                    <div className="p-1.5 rounded-lg bg-[#f0eee8]">
                      <span className="text-[9px] text-[#504440] uppercase block font-bold">Body</span>
                      <strong className="text-xs text-[#220d06]">{rec.geminiTastingProfile.body}/10</strong>
                    </div>
                    <div className="p-1.5 rounded-lg bg-[#f0eee8]">
                      <span className="text-[9px] text-[#504440] uppercase block font-bold">Clarity</span>
                      <strong className="text-xs text-[#9c4328]">{rec.geminiTastingProfile.clarity}/10</strong>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mt-1">
                    {rec.geminiTastingProfile.tastingNotes.map((note, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-full bg-[#ffdbd1] text-[#76270e] text-[10px] font-bold"
                      >
                        {note}
                      </span>
                    ))}
                  </div>

                  <div className="p-2.5 rounded-lg bg-[#f6f3ed] text-[11px] text-[#504440] flex items-start gap-1.5 mt-1">
                    <span className="material-symbols-outlined text-[#9c4328] text-sm shrink-0">
                      lightbulb
                    </span>
                    <span>
                      <strong className="text-[#220d06]">Barista Tip: </strong>
                      {rec.geminiTastingProfile.baristaTip}
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-between items-center text-xs text-[#504440] pt-2 border-t border-[#3a2118]/5">
              <span>Grind: {rec.grindSetting}</span>
              <button
                onClick={onOpenCreateRecipe}
                className="text-[#9c4328] font-bold hover:underline"
              >
                Fork this Recipe →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
