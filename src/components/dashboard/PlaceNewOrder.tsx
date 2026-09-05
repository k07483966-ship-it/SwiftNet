'use client';
import { motion } from 'motion/react';
import { networks } from '@/src/data/networks';
import NetworkTile from './NetworkTile';

export default function PlaceNewOrder() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.26, ease: 'easeOut', delay: 0.12 }}
      className="mt-[12px] rounded-[14px] light-card relative overflow-hidden"
    >
      <div 
        className="absolute top-0 left-0 w-full h-[3px]"
        style={{ background: 'linear-gradient(90deg, #0EA5E9, #38BDF8)' }}
      />
      <h2 className="font-h2 text-[13px] text-[var(--text-1)] pt-[10px] px-[12px] pb-[8px]">Place new order</h2>
      
      <div className="grid grid-cols-2 min-[400px]:grid-cols-4 gap-[8px] px-[12px] pb-[12px]">
        {networks.map(net => (
          <NetworkTile key={net.id} network={net} />
        ))}
      </div>
    </motion.div>
  );
}
