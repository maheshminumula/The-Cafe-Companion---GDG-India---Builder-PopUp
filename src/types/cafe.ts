export interface MenuItem {
  id: string;
  title: string;
  subTitle: string;
  price: number;
  description: string;
  pairingNote: string;
  category: 'coffee' | 'bakery' | 'reserve';
  prepTime: string;
  synergyMatch: number;
  matchTag: string;
  image: string;
  customization: string;
  hasBrewCurve?: boolean;
}

export interface OrderItem {
  id: string;
  menuItemId?: string;
  title: string;
  price: number;
  customization: string;
  quantity: number;
}

export interface UserProfile {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  avatar: string;
  caffeineTolerance: number; // 1 to 4
  dietaryTags: string[];
  tasteNotes: string[];
  role: 'customer' | 'admin' | 'barista';
  points: number;
  tableNumber: string;
}

export interface RecipeConfig {
  id: string;
  name: string;
  creatorName: string;
  brewMethod: 'V60' | 'AeroPress' | 'Espresso' | 'Cold Drip' | 'Orea V3' | 'Chemex';
  beanOrigin: string;
  roastLevel: 'Light' | 'Medium-Light' | 'Medium' | 'Nordic Light';
  coffeeGrams: number;
  waterGrams: number;
  tempCelsius: number;
  grindSetting: string;
  ratio: string;
  notes: string;
  synergyScore: number;
  geminiTastingProfile?: {
    acidity: number;
    sweetness: number;
    body: number;
    clarity: number;
    tastingNotes: string[];
    pairingRecommendation: string;
    baristaTip: string;
  };
  votes: number;
  createdAt: string;
}

export interface RevenueMetric {
  todayGross: number;
  yesterdayGross: number;
  dailyGrowth: number;
  ordersCount: number;
  avgTicket: number;
  tableTurnTimeMin: number;
  beansDepletedKg: number;
  topItems: { name: string; sold: number; revenue: number }[];
  hourlySales: { hour: string; sales: number; guests: number }[];
  cogsBreakdown: { category: string; cost: number; percentage: number }[];
  aiEfficiencyGain: {
    hoursSavedDaily: number;
    wasteReducedPct: number;
    upsellLiftPct: number;
  };
}
