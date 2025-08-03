import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Target, Compass, Timer } from 'lucide-react';

const LocationStatusCard = ({ currentLocation, selectedRoute }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.1 }}
    >
      <Card className="glass-effect border-white/20">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full pulse-glow" />
              <div>
                <p className="font-semibold text-white">GPS Active</p>
                <p className="text-sm text-white/70">
                  {currentLocation ? `Accuracy: ${currentLocation.accuracy}m` : 'Acquiring location...'}
                </p>
              </div>
            </div>
            <Badge variant="outline" className="text-green-400 border-green-400">
              <Target className="w-3 h-3 mr-1" />
              Online
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
              <Compass className="h-6 w-6 mx-auto text-blue-400 mb-1" />
              <p className="text-sm font-medium text-white">Current Speed</p>
              <p className="text-lg font-bold text-blue-400">25 km/h</p>
            </div>
            <div className="text-center p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
              <Timer className="h-6 w-6 mx-auto text-purple-400 mb-1" />
              <p className="text-sm font-medium text-white">ETA</p>
              <p className="text-lg font-bold text-purple-400">
                {selectedRoute ? selectedRoute.estimatedTime : '--'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default LocationStatusCard;