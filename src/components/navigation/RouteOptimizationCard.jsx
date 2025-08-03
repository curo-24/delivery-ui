import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Route, Zap, MapPin } from 'lucide-react';
import ActiveOrderCard from '@/components/navigation/ActiveOrderCard';

const RouteOptimizationCard = ({
  activeOrders,
  routeOptimized,
  selectedRoute,
  onOptimizeRoute,
  onStartNavigation,
  onQuickAction
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <Card className="glass-effect border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Route className="h-5 w-5" />
              <span>Multi-Order Routing</span>
            </div>
            {activeOrders.length > 1 && (
              <Button
                size="sm"
                onClick={onOptimizeRoute}
                className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
              >
                <Zap className="h-4 w-4 mr-1" />
                Optimize
              </Button>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {activeOrders.length === 0 ? (
            <div className="text-center py-6">
              <MapPin className="h-12 w-12 mx-auto text-white/30 mb-4" />
              <p className="text-white/70">No active deliveries</p>
              <p className="text-sm text-white/50">Routes will appear here when you have orders</p>
            </div>
          ) : (
            <div className="space-y-3">
              {activeOrders.map((order, index) => (
                <ActiveOrderCard
                  key={order.id}
                  order={order}
                  index={index}
                  selectedRoute={selectedRoute}
                  onStartNavigation={onStartNavigation}
                  onQuickAction={onQuickAction}
                />
              ))}
            </div>
          )}

          {routeOptimized && activeOrders.length > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-3 bg-green-500/10 rounded-lg border border-green-500/20"
            >
              <div className="flex items-center space-x-2">
                <Zap className="h-4 w-4 text-green-400" />
                <p className="text-sm font-medium text-green-400">Route Optimized!</p>
              </div>
              <p className="text-xs text-white/70 mt-1">
                Saved 15 minutes and 3.2 km by optimizing delivery sequence
              </p>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default RouteOptimizationCard;