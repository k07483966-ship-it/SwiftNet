'use client';
import { motion } from 'motion/react';
import { ShoppingBag } from 'lucide-react';
import { useNavigation } from '@/src/context/NavigationContext';

export default function RecentOrders() {
  const { orders, navigateTo } = useNavigation();

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
        <a 
          href="/orders"
          onClick={(e) => {
            e.preventDefault();
            navigateTo('orders');
          }}
          className="font-label text-[11.5px] text-[var(--color-primary-600)] hover:text-[var(--color-primary-700)] transition-colors cursor-pointer"
        >
          View All ›
        </a>
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
          <a 
            href="/buy-data?network=mtn"
            onClick={(e) => {
              e.preventDefault();
              navigateTo('buy-data', { network: 'mtn' });
            }}
            className="h-[34px] px-[20px] rounded-[9px] bg-white border border-[var(--border-2)] shadow-sm text-[var(--text-1)] font-label text-[12px] font-semibold mt-[16px] hover:bg-gray-50 active:scale-[0.98] transition-all cursor-pointer inline-flex items-center justify-center"
          >
            Buy data
          </a>
        </div>
      ) : (
        <div className="flex flex-col divide-y divide-[var(--border)]">
          {orders.slice(0, 4).map((order) => (
            <div 
              key={order.id} 
              onClick={() => navigateTo('orders')}
              className="h-[52px] px-[16px] flex items-center justify-between hover:bg-slate-50/70 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-[10px]">
                <div className={`w-[30px] h-[30px] rounded-[8px] flex items-center justify-center font-bold text-[9px] flex-shrink-0 border ${
                  order.network === 'MTN' ? 'bg-amber-400 text-slate-900 border-amber-500' :
                  order.network === 'Telecel' ? 'bg-red-500 text-white border-red-600' :
                  order.network === 'AirtelTigo' ? 'bg-blue-600 text-white border-blue-700' :
                  'bg-emerald-600 text-white border-emerald-700'
                }`}>
                  {order.network.substring(0, 3).toUpperCase()}
                </div>
                <div className="flex flex-col">
                  <span className="font-label text-[12px] text-[var(--text-1)] leading-tight">{order.bundle}</span>
                  <span className="font-caption text-[10.5px] text-[var(--text-3)] mt-[2px] leading-tight">{order.phone} • {order.date}</span>
                </div>
              </div>
              <div className="flex items-center gap-[10px]">
                <span className="font-h2 text-[12.5px] text-[var(--text-1)] tabular-nums">GH₵{order.price.toFixed(2)}</span>
                <span className={`h-[18px] px-[6px] rounded-[5px] font-badge text-[9.5px] flex items-center justify-center font-bold
                  ${order.status === 'Completed' ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 
                    order.status === 'Processing' ? 'bg-amber-50 text-amber-600 border border-amber-200' : 
                    'bg-red-50 text-red-600 border border-red-200'}`}
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
