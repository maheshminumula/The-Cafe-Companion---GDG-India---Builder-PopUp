/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { SmartConciergeMenu } from './components/SmartConciergeMenu';
import { PredictiveVisitsLiveVibe } from './components/PredictiveVisitsLiveVibe';
import { CommunityTable } from './components/CommunityTable';
import { BaristaRoomRadar } from './components/BaristaRoomRadar';
import { CustomRecipesShowcase } from './components/CustomRecipesShowcase';
import { RevenueDashboard } from './components/RevenueDashboard';
import { RecipeModal } from './components/RecipeModal';
import { AuthProfileModal } from './components/AuthProfileModal';
import { DeploymentGuideModal } from './components/DeploymentGuideModal';
import { Footer } from './components/Footer';
import { MenuItem, OrderItem, UserProfile, RecipeConfig } from './types/cafe';
import { INITIAL_MENU_ITEMS } from './data/menu';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('smart-concierge-menu');
  const [menuItems] = useState<MenuItem[]>(INITIAL_MENU_ITEMS);

  // Default User: Can be modified or switched to Admin
  const [currentUser, setCurrentUser] = useState<UserProfile>({
    id: 'user-001',
    name: 'Mahesh M.',
    email: 'maheshminumula1@gmail.com',
    phone: '+1 (415) 890-4421',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJgD07BArY4z3yGuGrzs0DLlhUC12YWFSkLYF_iNf8uIrmcJfcbIdUCeMEBEocwiZQqPjAlE_fu3uxe3aTWCazTo1CyMSdON8WXxMRXzMWSNUHDun1g0mPPpW3ISKpvP90l2PzZTvAtc-DR-u90kZTgh74yU68Ef4oPBp-mNxhKDmZM5ctv2d2ULJ6wWLj_d0ZHp88EmGupuMYoDrcFs0eCaVmKUItgpnYAqmBzv3OK_JHAqmVogvQ',
    caffeineTolerance: 3,
    dietaryTags: ['Oat Milk (Minor Figures)', 'Gluten-Conscious'],
    tasteNotes: ['Cardamom', 'Hazelnut', 'Honeycomb'],
    role: 'customer', // Can switch to 'admin' to unlock Revenue dashboard
    points: 480,
    tableNumber: 'Table 14',
  });

  // Adaptive Tray Orders
  const [orderItems, setOrderItems] = useState<OrderItem[]>([
    {
      id: 'tray-1',
      menuItemId: 'item-1',
      title: 'Cardamom Oat Cortado',
      price: 5.75,
      customization: 'Minor Figures Oat • 145°F Steamed',
      quantity: 1,
    },
    {
      id: 'tray-2',
      menuItemId: 'item-3',
      title: 'Warm Tahini Banana Bread',
      price: 4.95,
      customization: 'Warmed 135°F • Flaky Sea Salt',
      quantity: 1,
    },
  ]);

  // Custom Recipes State
  const [customRecipes, setCustomRecipes] = useState<RecipeConfig[]>([]);

  // Modals state
  const [isRecipeModalOpen, setIsRecipeModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isDeployDocsOpen, setIsDeployDocsOpen] = useState(false);

  // Fetch initial recipes from backend
  useEffect(() => {
    fetch('/api/recipes')
      .then((res) => res.json())
      .then((data) => {
        if (data.recipes) setCustomRecipes(data.recipes);
      })
      .catch((err) => console.warn('Recipe API fetch:', err));
  }, []);

  const handleAddItem = (item: MenuItem) => {
    setOrderItems((prev) => [
      ...prev,
      {
        id: `tray-${Date.now()}`,
        menuItemId: item.id,
        title: item.title,
        price: item.price,
        customization: item.customization,
        quantity: 1,
      },
    ]);
  };

  const handleRemoveItem = (index: number) => {
    setOrderItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCheckout = () => {
    // Notify server of completed order
    const totalAmount = orderItems.reduce((acc, it) => acc + it.price * it.quantity, 0);
    fetch('/api/admin/revenue/simulate-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: totalAmount }),
    }).catch(console.warn);

    // Clear tray after simulated checkout
    setTimeout(() => {
      setOrderItems([]);
    }, 2000);
  };

  const handleRecipeCreated = (newRecipe: RecipeConfig) => {
    setCustomRecipes((prev) => [newRecipe, ...prev]);
  };

  const handleVoteRecipe = async (recipeId: string) => {
    try {
      const res = await fetch(`/api/recipes/${recipeId}/vote`, { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        setCustomRecipes((prev) =>
          prev.map((r) => (r.id === recipeId ? { ...r, votes: data.votes } : r))
        );
      }
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#fcf9f3] text-[#1c1c18] flex flex-col selection:bg-[#ffdbd1] selection:text-[#3a0a00]">
      {/* Universal Fixed Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onOpenRecipeModal={() => setIsRecipeModalOpen(true)}
        onOpenDeployDocs={() => setIsDeployDocsOpen(true)}
        trayItemCount={orderItems.length}
        onToggleTray={() => setActiveTab('smart-concierge-menu')}
      />

      {/* Main Body View Router */}
      <main className="flex-1 w-full pt-20">
        {activeTab === 'smart-concierge-menu' && (
          <SmartConciergeMenu
            orderItems={orderItems}
            onAddItem={handleAddItem}
            onRemoveItem={handleRemoveItem}
            onCheckout={handleCheckout}
            onOpenRecipeModal={() => setIsRecipeModalOpen(true)}
            menuItems={menuItems}
          />
        )}

        {activeTab === 'predictive-visits-live-vibe' && <PredictiveVisitsLiveVibe />}

        {activeTab === 'community-table' && <CommunityTable />}

        {activeTab === 'barista-room-radar' && <BaristaRoomRadar />}

        {activeTab === 'custom-recipes-showcase' && (
          <CustomRecipesShowcase
            recipes={customRecipes}
            onOpenCreateRecipe={() => setIsRecipeModalOpen(true)}
            onVote={handleVoteRecipe}
          />
        )}

        {activeTab === 'internal-cafe-revenue' && (
          <RevenueDashboard
            isAdmin={currentUser.role === 'admin'}
            onOpenAuth={() => setIsAuthModalOpen(true)}
          />
        )}
      </main>

      {/* Modals */}
      <RecipeModal
        isOpen={isRecipeModalOpen}
        onClose={() => setIsRecipeModalOpen(false)}
        onRecipeCreated={handleRecipeCreated}
        creatorName={`${currentUser.name} (${currentUser.tableNumber || 'Table 14'})`}
      />

      <AuthProfileModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        currentUser={currentUser}
        onUpdateUser={(updated) => setCurrentUser(updated)}
      />

      <DeploymentGuideModal
        isOpen={isDeployDocsOpen}
        onClose={() => setIsDeployDocsOpen(false)}
      />

      {/* Universal Footer */}
      <Footer />
    </div>
  );
}
