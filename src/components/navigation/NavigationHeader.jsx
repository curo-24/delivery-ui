import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

const NavigationHeader = ({ onQuickAction }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-between"
    >
      <div>
        <h1 className="text-2xl font-bold text-white">Navigation</h1>
        <p className="text-white/70">Real-time GPS tracking & route optimization</p>
      </div>
      <Button
        onClick={() => onQuickAction('refresh')}
        variant="outline"
        size="icon"
        className="glass-effect border-white/20 text-white hover:bg-white/10"
      >
        <RefreshCw className="h-4 w-4" />
      </Button>
    </motion.div>
  );
};

export default NavigationHeader;