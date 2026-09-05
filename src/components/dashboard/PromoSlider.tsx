'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Gift, Zap, ArrowRight } from 'lucide-react';

const slides = [
  {
    id: 'support',
    title: '24/7 Support',
    desc: 'We are always here to help you succeed',
    action: 'Chat with us',
    bg: 'bg-[#EBF8FF] dark:bg-[#0EA5E9]/10',
    textTitle: 'text-[#0369A1]',
    textDesc: 'text-[#0284C7]',
    icon: <MessageSquare size={32} className="text-[#38BDF8]" fill="#BAE6FD" />,
  },
  {
    id: 'refer',
    title: 'Refer & Earn',
    desc: 'Earn 250 points when friends order',
    action: 'Get your link',
    bg: 'bg-[#FFFBEB] dark:bg-[#F59E0B]/10',
    textTitle: 'text-[#92400E]',
    textDesc: 'text-[#B45309]',
    icon: <Gift size={32} className="text-[#F59E0B]" fill="#FDE68A" />,
  },
  {
    id: 'data',
    title: 'Buy Data',
    desc: 'Buy your data bundles here',
    action: 'Buy now',
    bg: 'bg-[#F3E8FF] dark:bg-[#A855F7]/10',
    textTitle: 'text-[#6B21A8]',
    textDesc: 'text-[#7E22CE]',
    icon: <Zap size={32} className="text-[#A855F7]" fill="#E9D5FF" />,
  }
];

export default function PromoSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative rounded-[14px] overflow-hidden h-[90px] shadow-[var(--shadow-card)] border border-[var(--border)] dark:border-white/5 bg-white dark:bg-[var(--surface-2)]">
      <AnimatePresence initial={false}>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className={`absolute inset-0 flex items-center justify-between px-[16px] ${slides[currentIndex].bg}`}
        >
          <div className="flex flex-col">
            <h3 className={`font-display text-[15px] font-bold ${slides[currentIndex].textTitle} dark:text-white mb-[2px]`}>
              {slides[currentIndex].title}
            </h3>
            <p className={`font-body text-[12px] ${slides[currentIndex].textDesc} dark:text-[var(--text-2)] mb-[6px]`}>
              {slides[currentIndex].desc}
            </p>
            <div className={`flex items-center gap-[4px] font-label text-[12px] font-bold ${slides[currentIndex].textTitle} dark:text-white cursor-pointer`}>
              {slides[currentIndex].action} <ArrowRight size={12} strokeWidth={3} />
            </div>
          </div>
          <div className="flex-shrink-0 drop-shadow-sm">
            {slides[currentIndex].icon}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-[8px] left-1/2 -translate-x-1/2 flex gap-[6px] z-10">
        {slides.map((_, idx) => (
          <div
            key={idx}
            className={`w-[6px] h-[6px] rounded-full transition-all duration-300 ${
              idx === currentIndex 
                ? 'bg-[#475569] w-[12px] dark:bg-white/60' 
                : 'bg-[#94A3B8] dark:bg-white/20'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
