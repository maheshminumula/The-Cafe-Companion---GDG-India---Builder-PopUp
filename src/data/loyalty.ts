export interface RewardTier {
  id: string;
  name: string;
  threshold: number;
  badge: string;
  perkDescription: string;
  color: string;
  bgLight: string;
  borderColor: string;
}

export const REWARD_TIERS: RewardTier[] = [
  {
    id: 'bronze',
    name: 'Artisan Seeker',
    threshold: 0,
    badge: 'Bronze',
    perkDescription: 'Complimentary oat & almond milk upgrade on all handcrafted drinks.',
    color: '#9c4328',
    bgLight: '#f6f3ed',
    borderColor: '#d4c3be',
  },
  {
    id: 'silver',
    name: 'Micro-Lot Connoisseur',
    threshold: 250,
    badge: 'Silver',
    perkDescription: 'Free seasonal single-origin batch pour & guaranteed quiet booth hold.',
    color: '#77574c',
    bgLight: '#ebe8e2',
    borderColor: '#827470',
  },
  {
    id: 'gold',
    name: 'Sensory Master',
    threshold: 500,
    badge: 'Gold',
    perkDescription: 'Invitations to Panama Gesha cupping flights & free pastry on every 3rd visit.',
    color: '#c86446',
    bgLight: '#ffdbd1',
    borderColor: '#ff8f6e',
  },
  {
    id: 'diamond',
    name: 'Roaster Hearth Enclave',
    threshold: 1000,
    badge: 'Diamond Reserve',
    perkDescription: 'Custom calibrated private bean blend roasted by Head Roaster + VIP seating.',
    color: '#220d06',
    bgLight: '#ceead0',
    borderColor: '#021708',
  },
];

export function getTierInfo(points: number) {
  let currentTierIndex = 0;
  for (let i = REWARD_TIERS.length - 1; i >= 0; i--) {
    if (points >= REWARD_TIERS[i].threshold) {
      currentTierIndex = i;
      break;
    }
  }

  const currentTier = REWARD_TIERS[currentTierIndex];
  const nextTier =
    currentTierIndex < REWARD_TIERS.length - 1
      ? REWARD_TIERS[currentTierIndex + 1]
      : null;

  let pointsNeeded = 0;
  let progressPercent = 100;

  if (nextTier) {
    const range = nextTier.threshold - currentTier.threshold;
    const currentProgress = points - currentTier.threshold;
    progressPercent = Math.min(100, Math.max(0, Math.round((currentProgress / range) * 100)));
    pointsNeeded = nextTier.threshold - points;
  }

  return {
    currentTier,
    nextTier,
    pointsNeeded,
    progressPercent,
  };
}
