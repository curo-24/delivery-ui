import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Home, 
  Package, 
  Navigation as NavigationIcon, 
  DollarSign, 
  User,
  History
} from 'lucide-react';

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/orders', icon: Package, label: 'Orders' },
    { path: '/navigation', icon: NavigationIcon, label: 'Navigate' },
    { path: '/earnings', icon: DollarSign, label: 'Earnings' },
    { path: '/history', icon: History, label: 'History' },
    { path: '/profile', icon: User, label: 'Profile' }
  ];

  return (
    <motion.div 
      className="fixed bottom-0 left-0 right-0 glass-effect border-t border-white/20 px-2 py-2 z-50"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          return (
            <motion.button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center p-2 rounded-lg transition-all duration-200 ${
                isActive 
                  ? 'text-blue-400 bg-blue-500/20' 
                  : 'text-white/60 hover:text-white/80'
              }`}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
            >
              <Icon size={20} />
              <span className="text-xs mt-1 font-medium">{item.label}</span>
              {isActive && (
                <motion.div
                  className="absolute -bottom-1 w-1 h-1 bg-blue-400 rounded-full"
                  layoutId="activeIndicator"
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
};

export default BottomNavigation;