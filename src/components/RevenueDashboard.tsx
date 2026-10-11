import React, { useState, useEffect } from 'react';
import { RevenueMetric } from '../types/cafe';

interface RevenueDashboardProps {
  isAdmin: boolean;
  onOpenAuth: () => void;
}

export const RevenueDashboard: React.FC<RevenueDashboardProps> = ({
  isAdmin,
  onOpenAuth,
}) => {
  const [metrics, setMetrics] = useState<RevenueMetric | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);

  const fetchRevenue = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await fetch('/api/admin/revenue', {
        headers: {
          'x-admin-role': isAdmin ? 'admin' : 'customer',
        },
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Access Denied');
      }

      const data = await res.json();
      setMetrics(data.metrics);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      fetchRevenue();
    } else {
      setIsLoading(false);
      setError('Access Denied: Internal Cafe Team & Admin Access required.');
    }
  }, [isAdmin]);

  const handleSimulateOrder = async () => {
    setIsSimulating(true);
    try {
      const res = await fetch('/api/admin/revenue/simulate-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: 11.72 }),
      });
      const data = await res.json();
      if (data.metrics) {
        setMetrics(data.metrics);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSimulating(false);
    }
  };

  if (!isAdmin) {
    return (
      <div className="w-full max-w-4xl mx-auto p-6 sm:p-12 my-8 rounded-2xl bg-[#ffffff] shadow-sm border border-[#3a2118]/10 text-center flex flex-col items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center">
          <span className="material-symbols-outlined text-3xl">lock</span>
        </div>
        <div className="max-w-md">
          <h2 className="font-headline font-bold text-2xl text-[#220d06]">
            Internal Cafe Team Access Only
          </h2>
          <p className="text-sm text-[#504440] mt-2">
            This module streams real-time financial telemetry, gross margins, COGS breakdown, and labor efficiency gains. Customers must authenticate with an internal admin badge or switch role to Admin.
          </p>
        </div>
        <button
          onClick={onOpenAuth}
          className="mt-2 px-6 py-2.5 rounded-xl bg-[#220d06] text-white text-xs font-bold hover:bg-[#3a2118] transition-all flex items-center gap-2 shadow-sm"
        >
          <span className="material-symbols-outlined text-sm">admin_panel_settings</span>
          <span>Switch Profile Role to Admin</span>
        </button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="w-full max-w-7xl mx-auto p-12 text-center flex flex-col items-center gap-3">
        <span className="material-symbols-outlined text-3xl animate-spin text-[#9c4328]">refresh</span>
        <span className="text-sm font-semibold text-[#504440]">Streaming Cloud SQL financial telemetry...</span>
      </div>
    );
  }

  if (error || !metrics) {
    return (
      <div className="w-full max-w-7xl mx-auto p-6 rounded-xl bg-[#ffdad6] text-[#93000a] text-sm">
        {error}
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col gap-6 py-6 px-4 sm:px-6 lg:px-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-[#220d06] text-white shadow-md">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded-full bg-[#ff8f6e] text-[#76270e] text-[10px] font-bold uppercase tracking-wider">
              Internal Cafe Team • Confidential
            </span>
            <span className="text-xs text-[#d4c3be]">• Google Cloud SQL Stream</span>
          </div>
          <h1 className="font-headline font-bold text-2xl sm:text-3xl tracking-tight text-white">
            Downtown SF Hub • Store Revenue &amp; Financial Velocity
          </h1>
          <p className="text-xs sm:text-sm text-[#d4c3be] mt-1 max-w-2xl">
            Live register takings, average ticket, machine extraction cost of goods, and Vertex AI waste reduction ROI.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleSimulateOrder}
            disabled={isSimulating}
            className="px-4 py-2 rounded-xl bg-[#9c4328] hover:bg-[#ff8f6e] hover:text-[#76270e] text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
          >
            <span className="material-symbols-outlined text-sm">add_card</span>
            <span>Simulate $11.72 Checkout</span>
          </button>
          <button
            onClick={fetchRevenue}
            className="p-2 rounded-xl bg-[#3a2118] hover:bg-[#504440] text-white transition-all"
            title="Refresh Ledger"
          >
            <span className="material-symbols-outlined text-base">refresh</span>
          </button>
        </div>
      </div>

      {/* Top 4 KPI Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Today Gross */}
        <div className="p-5 rounded-2xl bg-[#ffffff] shadow-sm border border-[#3a2118]/8 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#504440] text-xs font-bold uppercase tracking-wider">
            <span>Today's Gross Sales</span>
            <span className="material-symbols-outlined text-[#9c4328]">payments</span>
          </div>
          <div className="my-2">
            <span className="font-headline font-bold text-3xl text-[#220d06]">
              ${metrics.todayGross.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
          <div className="flex items-center gap-1 text-xs text-[#092011] font-semibold">
            <span className="material-symbols-outlined text-sm text-[#092011]">trending_up</span>
            <span>+{metrics.dailyGrowth}% vs Yesterday (${metrics.yesterdayGross})</span>
          </div>
        </div>

        {/* Metric 2: Total Orders & Avg Ticket */}
        <div className="p-5 rounded-2xl bg-[#ffffff] shadow-sm border border-[#3a2118]/8 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#504440] text-xs font-bold uppercase tracking-wider">
            <span>Orders &amp; Avg Ticket</span>
            <span className="material-symbols-outlined text-[#9c4328]">receipt_long</span>
          </div>
          <div className="my-2 flex items-baseline gap-2">
            <span className="font-headline font-bold text-3xl text-[#220d06]">{metrics.ordersCount}</span>
            <span className="text-xs text-[#504440]">drinks/pastries</span>
          </div>
          <div className="text-xs text-[#504440]">
            Average ticket size: <strong className="text-[#220d06]">${metrics.avgTicket}</strong>
          </div>
        </div>

        {/* Metric 3: Table Dwell & Turn Time */}
        <div className="p-5 rounded-2xl bg-[#ffffff] shadow-sm border border-[#3a2118]/8 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#504440] text-xs font-bold uppercase tracking-wider">
            <span>Table Turn Velocity</span>
            <span className="material-symbols-outlined text-[#9c4328]">table_bar</span>
          </div>
          <div className="my-2 flex items-baseline gap-2">
            <span className="font-headline font-bold text-3xl text-[#220d06]">{metrics.tableTurnTimeMin}</span>
            <span className="text-xs text-[#504440]">mins / table</span>
          </div>
          <div className="text-xs text-[#504440]">
            Optimized via Community Table pairing
          </div>
        </div>

        {/* Metric 4: AI Roastery Efficiency Gain */}
        <div className="p-5 rounded-2xl bg-[#ffffff] shadow-sm border border-[#3a2118]/8 flex flex-col justify-between bg-gradient-to-br from-[#ffffff] to-[#ceead0]/30">
          <div className="flex items-center justify-between text-[#504440] text-xs font-bold uppercase tracking-wider">
            <span>Vertex AI ROI Impact</span>
            <span className="material-symbols-outlined text-[#092011]">auto_awesome</span>
          </div>
          <div className="my-2 flex items-baseline gap-2">
            <span className="font-headline font-bold text-3xl text-[#092011]">
              +{metrics.aiEfficiencyGain.upsellLiftPct}%
            </span>
            <span className="text-xs text-[#092011] font-semibold">upsell margin</span>
          </div>
          <div className="text-xs text-[#504440]">
            {metrics.aiEfficiencyGain.wasteReducedPct}% milk waste eliminated
          </div>
        </div>
      </div>

      {/* Hourly Sales Chart & COGS Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Hourly Revenue Stream Bar Chart (7 Cols) */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-[#ffffff] shadow-sm border border-[#3a2118]/8 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-headline font-bold text-lg text-[#220d06]">
                Hourly Revenue Trajectory
              </h3>
              <p className="text-xs text-[#504440]">
                Aggregated register timestamps synced with peak arrival forecast
              </p>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-[#f0eee8] text-xs font-semibold text-[#504440]">
              Peak: 09:00 AM ($640)
            </span>
          </div>

          {/* Simple Clean Bar Graph */}
          <div className="flex items-end justify-between gap-2 h-44 pt-4 px-2 border-b border-[#3a2118]/10">
            {metrics.hourlySales.map((slot, idx) => {
              const maxSales = 700;
              const heightPercent = Math.min(100, Math.round((slot.sales / maxSales) * 100));
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-1 group relative">
                  {/* Tooltip on hover */}
                  <div className="absolute -top-8 bg-[#220d06] text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    ${slot.sales} • {slot.guests} guests
                  </div>
                  <div
                    className="w-full bg-[#9c4328] hover:bg-[#220d06] rounded-t transition-all duration-300"
                    style={{ height: `${heightPercent}%` }}
                  />
                  <span className="text-[10px] text-[#504440] font-medium mt-1">
                    {slot.hour.split(':')[0]}h
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-xs text-[#504440] pt-3">
            <span>07:00 Open</span>
            <span>10:45 Keynote Peak Rush (+35 guests)</span>
            <span>15:00 Shift Handover</span>
          </div>
        </div>

        {/* Cost of Goods & Supplies (5 Cols) */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-[#ffffff] shadow-sm border border-[#3a2118]/8 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="font-headline font-bold text-lg text-[#220d06]">
                COGS &amp; Supply Ledger
              </h3>
              <p className="text-xs text-[#504440]">
                Breakdown of physical raw inputs &amp; craft labor
              </p>
            </div>
            <span className="material-symbols-outlined text-[#9c4328]">pie_chart</span>
          </div>

          <div className="flex flex-col gap-3 my-2">
            {metrics.cogsBreakdown.map((item, idx) => (
              <div key={idx} className="flex flex-col gap-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-[#220d06] truncate max-w-[200px]">{item.category}</span>
                  <span className="text-[#504440]">${item.cost} ({item.percentage}%)</span>
                </div>
                <div className="w-full bg-[#f0eee8] h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-[#9c4328] h-full rounded-full"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-xl bg-[#f6f3ed] text-xs text-[#504440] flex items-center justify-between">
            <span>Beans Depleted Today:</span>
            <strong className="text-[#220d06]">{metrics.beansDepletedKg} kg roasted</strong>
          </div>
        </div>
      </div>

      {/* Top Velocity Items */}
      <div className="p-6 rounded-2xl bg-[#ffffff] shadow-sm border border-[#3a2118]/8">
        <h3 className="font-headline font-bold text-lg text-[#220d06] mb-3">
          Product Contribution &amp; Synergy Leaders
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#3a2118]/10 text-[#504440] uppercase">
                <th className="py-2 font-bold">Item Name</th>
                <th className="py-2 font-bold">Units Sold</th>
                <th className="py-2 font-bold">Gross Revenue</th>
                <th className="py-2 font-bold">Category Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#3a2118]/5">
              {metrics.topItems.map((item, idx) => (
                <tr key={idx} className="hover:bg-[#f6f3ed] transition-colors">
                  <td className="py-2.5 font-bold text-[#220d06]">{item.name}</td>
                  <td className="py-2.5 text-[#504440]">{item.sold} units</td>
                  <td className="py-2.5 font-bold text-[#9c4328]">
                    ${item.revenue.toFixed(2)}
                  </td>
                  <td className="py-2.5">
                    <span className="px-2 py-0.5 rounded-full bg-[#ceead0] text-[#092011] font-bold text-[10px]">
                      High Margin
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
