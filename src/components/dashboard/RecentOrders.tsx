'use client';
import { motion } from 'motion/react';
import { ShoppingBag } from 'lucide-react';
import { mockOrders } from '@/src/data/networks';
import { useState } from 'react';
import { useNavigation } from '@/src/context/NavigationContext';

export default function RecentOrders() {
  // Using empty mockOrders array for empty state as specified
  const [orders] = useState(mockOrders);
  const { navigateTo } = useNavigation();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.26, ease: 'easeOut', delay: 0.20 }}
      className="mt-[12px] rounded-[16px] bg-white border border-[var(--border)] shadow-[var(--shadow-card)] relative overflow-hidden"
    >
      <div 
        className="absolute top-0 left-0 w-full h-[3px]"
        style={{ background: 'linear-gradient(90deg, #0EA5E9, #38BDF8)' }}
      />
      
      <div className="flex justify-between items-center px-[16px] pt-[14px] pb-[12px]">
        <h2 className="font-h2 text-[13.5px] text-[var(--text-1)]">Recent Orders</h2>
        <button 
          onClick={() => navigateTo('orders')}
          className="font-label text-[11.5px] text-[var(--color-primary-600)] hover:text-[var(--color-primary-700)] transition-colors cursor-pointer"
        >
          View All ›
        </button>
      </div>

      {orders.length === 0 ? (
        <div className="flex flex-col items-center text-center px-[16px] pt-[24px] pb-[32px]">
          <div className="w-[48px] h-[48px] rounded-full bg-[var(--color-primary-50)] border border-[var(--color-primary-100)] flex items-center justify-center mb-[12px]">
            <ShoppingBag size={20} className="text-[var(--color-primary-500)]" />
          </div>
          <div className="font-h2 text-[14px] text-[var(--text-1)]">No orders yet</div>
          <div className="text-[11.5px] font-normal text-[var(--text-3)] mt-[4px] max-w-[240px] leading-snug">
            Your purchases and agent shop sales will appear here.
          </div>
          <button 
            onClick={() => navigateTo('buy-data', { network: 'mtn' })}
            className="h-[34px] px-[20px] rounded-[9px] bg-white border border-[var(--border-2)] shadow-sm text-[var(--text-1)] font-label text-[12px] font-semibold mt-[16px] hover:bg-gray-50 active:scale-[0.98] transition-all cursor-pointer"
          >
            Buy data
          </button>
        </div>
      ) : (
        <div className="flex flex-col">
          {orders.map((order, idx) => (
            <div key={order.id} className={`h-[52px] px-[16px] flex items-center justify-between ${idx !== orders.length - 1 ? 'border-b border-[var(--border)]' : ''}`}>
              <div className="flex items-center gap-[12px]">
                <div className="w-[30px] h-[30px] rounded-[8px] bg-[var(--surface-2)] border border-[var(--border)] flex-shrink-0" />
                <div className="flex flex-col">
                  <span className="font-label text-[12px] text-[var(--text-1)] leading-tight">{order.bundleName}</span>
                  <span className="font-caption text-[10.5px] text-[var(--text-3)] mt-[2px] leading-tight">{order.time}</span>
                </div>
              </div>
              <div className="flex items-center gap-[10px]">
                <span className="font-h2 text-[12.5px] text-[var(--text-1)]">GH₵{order.amount.toFixed(2)}</span>
                <span className={`h-[18px] px-[6px] rounded-[5px] font-badge text-[9.5px] flex items-center justify-center
                  ${order.status === 'Success' ? 'bg-[var(--color-green-50)] text-[var(--color-green-600)] border border-[var(--color-green-100)]' : 
                    order.status === 'Pending' ? 'bg-orange-50 text-orange-600 border border-orange-100' : 
                    'bg-red-50 text-red-600 border border-red-100'}`}
                >
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
