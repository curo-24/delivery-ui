import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, Navigation as NavigationIcon, Phone, MessageCircle } from 'lucide-react';

const ActiveOrderCard = ({ order, index, selectedRoute, onStartNavigation, onQuickAction }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`p-4 rounded-lg border ${
        selectedRoute?.id === order.id 
          ? 'bg-blue-500/20 border-blue-500/50' 
          : 'bg-white/5 border-white/20'
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
            {index + 1}
          </div>
          <Badge variant="outline" className="text-xs">
            {order.id}
          </Badge>
          <Badge className={`text-xs ${
            order.status === 'assigned' ? 'bg-yellow-500/20 text-yellow-400' :
            order.status === 'picked_up' ? 'bg-blue-500/20 text-blue-400' :
            'bg-purple-500/20 text-purple-400'
          }`}>
            {order.status.replace('_', ' ')}
          </Badge>
        </div>
        <span className="text-sm font-semibold text-white">{order.distance}</span>
      </div>

      <div className="space-y-1 mb-3">
        <div className="flex items-center space-x-2 text-sm">
          <MapPin className="h-4 w-4 text-green-400" />
          <span className="text-white/80">{order.pharmacy}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <MapPin className="h-4 w-4 text-red-400" />
          <span className="text-white/80">{order.customerName}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <Clock className="h-4 w-4 text-orange-400" />
          <span className="text-white/80">ETA: {order.estimatedTime}</span>
        </div>
      </div>

      <div className="flex space-x-2">
        <Button
          size="sm"
          onClick={() => onStartNavigation(order)}
          className={`flex-1 ${
            selectedRoute?.id === order.id 
              ? 'bg-green-500 hover:bg-green-600' 
              : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          <NavigationIcon className="h-4 w-4 mr-1" />
          {selectedRoute?.id === order.id ? 'Navigating' : 'Navigate'}
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => onQuickAction('call')}
          className="glass-effect border-white/20 text-white hover:bg-white/10"
        >
          <Phone className="h-4 w-4" />
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => onQuickAction('message')}
          className="glass-effect border-white/20 text-white hover:bg-white/10"
        >
          <MessageCircle className="h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
};

export default ActiveOrderCard;