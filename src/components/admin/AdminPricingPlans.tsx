'use client';
import { useState } from 'react';
import { Gem, Edit2, Save, Plus, Check } from 'lucide-react';

export default function AdminPricingPlans() {
  const [plans, setPlans] = useState([
    { id: 1, name: 'MTN 1GB Non-Expiry SME', agentPrice: 'GH₵4.80', publicPrice: 'GH₵6.00', margin: 'GH₵1.20', network: 'MTN' },
    { id: 2, name: 'MTN 5GB Non-Expiry SME', agentPrice: 'GH₵23.50', publicPrice: 'GH₵29.00', margin: 'GH₵5.50', network: 'MTN' },
    { id: 3, name: 'MTN 10GB Non-Expiry SME', agentPrice: 'GH₵46.00', publicPrice: 'GH₵57.00', margin: 'GH₵11.00', network: 'MTN' },
    { id: 4, name: 'Telecel 2GB Non-Expiry', agentPrice: 'GH₵9.50', publicPrice: 'GH₵12.00', margin: 'GH₵2.50', network: 'Telecel' },
    { id: 5, name: 'Telecel 10GB Non-Expiry', agentPrice: 'GH₵45.00', publicPrice: 'GH₵55.00', margin: 'GH₵10.00', network: 'Telecel' },
    { id: 6, name: 'AT 5GB Big Time Data', agentPrice: 'GH₵21.00', publicPrice: 'GH₵26.00', margin: 'GH₵5.00', network: 'AT' },
    { id: 7, name: 'WAEC WASSCE Checker PIN', agentPrice: 'GH₵18.00', publicPrice: 'GH₵25.00', margin: 'GH₵7.00', network: 'WAEC' },
    { id: 8, name: 'WAEC BECE Checker PIN', agentPrice: 'GH₵16.00', publicPrice: 'GH₵22.00', margin: 'GH₵6.00', network: 'WAEC' },
  ]);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editAgent, setEditAgent] = useState('');
  const [editPublic, setEditPublic] = useState('');

  const handleStartEdit = (plan: typeof plans[0]) => {
    setEditingId(plan.id);
    setEditAgent(plan.agentPrice);
    setEditPublic(plan.publicPrice);
  };

  const handleSave = (id: number) => {
    setPlans(plans.map(p => {
      if (p.id === id) {
        return {
          ...p,
          agentPrice: editAgent,
          publicPrice: editPublic
        };
      }
      return p;
    }));
    setEditingId(null);
  };

  return (
    <div className="space-y-5">
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-slate-800 font-display">Pricing Plans & Commission Margins</h2>
          <p className="text-xs text-slate-500 mt-0.5">Configure network bundle prices, wholesale rates, and storefront retail margins</p>
        </div>

        <button className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md cursor-pointer">
          <Plus size={15} />
          <span>Add New Package</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10.5px]">
              <tr>
                <th className="py-3 px-4">Network</th>
                <th className="py-3 px-4">Bundle Package Name</th>
                <th className="py-3 px-4">Agent Wholesale Price</th>
                <th className="py-3 px-4">Store Retail Price</th>
                <th className="py-3 px-4">Agent Profit Margin</th>
                <th className="py-3 px-4 text-right">Edit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {plans.map((plan) => (
                <tr key={plan.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-900">
                    <span className="px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-slate-800 font-black text-[11px]">
                      {plan.network}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-800">{plan.name}</td>
                  
                  <td className="py-3.5 px-4">
                    {editingId === plan.id ? (
                      <input
                        type="text"
                        value={editAgent}
                        onChange={(e) => setEditAgent(e.target.value)}
                        className="w-24 px-2 py-1 border rounded text-xs"
                      />
                    ) : (
                      <span className="font-bold text-blue-700">{plan.agentPrice}</span>
                    )}
                  </td>

                  <td className="py-3.5 px-4">
                    {editingId === plan.id ? (
                      <input
                        type="text"
                        value={editPublic}
                        onChange={(e) => setEditPublic(e.target.value)}
                        className="w-24 px-2 py-1 border rounded text-xs"
                      />
                    ) : (
                      <span className="font-bold text-emerald-700">{plan.publicPrice}</span>
                    )}
                  </td>

                  <td className="py-3.5 px-4 font-bold text-slate-600">{plan.margin}</td>

                  <td className="py-3.5 px-4 text-right">
                    {editingId === plan.id ? (
                      <button
                        onClick={() => handleSave(plan.id)}
                        className="px-3 py-1 bg-emerald-600 text-white rounded-lg font-bold text-xs flex items-center gap-1 justify-end ml-auto"
                      >
                        <Check size={12} /> Save
                      </button>
                    ) : (
                      <button
                        onClick={() => handleStartEdit(plan)}
                        className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-colors cursor-pointer"
                      >
                        <Edit2 size={13} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
